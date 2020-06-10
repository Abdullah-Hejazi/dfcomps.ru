import { LanguageService } from './../../services/language/language.service';
import { DuelServerMessageType } from './services/types/duel-server-message.type';
import { UserInterface } from './../../interfaces/user.interface';
import { UserService } from './../../services/user-service/user.service';
import { Physics } from './../../enums/physics.enum';
import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { DuelService } from './services/duel.service';
import { take, filter, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { DuelWebsocketServerActions } from './services/enums/duel-websocket-server-actions.enum';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatchStates } from './services/enums/match-states.enum';
import { MatchInterface } from './services/interfaces/match.interface';
import { DuelPlayersInfoInterface } from './interfaces/duel-players-info.interface';

@Component({
    templateUrl: './1v1.page.html',
    styleUrls: ['./1v1.page.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OneVOnePageComponent implements OnInit, OnDestroy {
    public matchState: MatchStates;
    public matchStates = MatchStates;
    public physics = Physics;
    public selectedPhysics: Physics;
    public user$: Observable<UserInterface>;
    public isWaitingForServerAnswer = false;
    public match: MatchInterface;
    public playersInfo: DuelPlayersInfoInterface | null = null;

    private onDestroy$ = new Subject<void>();

    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private duelService: DuelService,
        private userService: UserService,
        private snackBar: MatSnackBar,
        private languageService: LanguageService,
    ) {}

    ngOnInit(): void {
        this.user$ = this.userService.getCurrentUser$();
        this.initUserSubscriptions();
        this.sendRestorePlayerStateMessage();
        this.initServerMessagesSubscription();
    }

    ngOnDestroy(): void {
        this.onDestroy$.next();
        this.onDestroy$.complete();
        this.duelService.closeConnection();
    }

    public joinQueue(physics: Physics): void {
        this.isWaitingForServerAnswer = true;
        this.selectedPhysics = physics;

        this.user$.pipe(filter(Boolean), take(1)).subscribe(({ id }: UserInterface) => this.duelService.joinQueue(id, physics));
    }

    public leaveQueue(): void {
        this.user$.pipe(filter(Boolean), take(1)).subscribe(({ id }: UserInterface) => this.duelService.leaveQueue(id));
    }

    public onMapBanned(mapName: string): void {
        this.user$.pipe(filter(Boolean), take(1)).subscribe(({ id }: UserInterface) => this.duelService.banMap(id, mapName));
    }

    public acceptResult(): void {
        this.user$.pipe(filter(Boolean), take(1)).subscribe(({ id }: UserInterface) => {
            this.duelService.acceptResult(id);
            this.matchState = MatchStates.WAITING_FOR_QUEUE;
            this.playersInfo = null;
        });
    }

    private initUserSubscriptions(): void {
        this.user$
            .pipe(takeUntil(this.onDestroy$))
            .subscribe((user: UserInterface) => (user ? this.duelService.openConnection() : this.duelService.closeConnection()));
    }

    private initServerMessagesSubscription(): void {
        this.duelService.serverMessages$.pipe(takeUntil(this.onDestroy$)).subscribe((serverMessage: DuelServerMessageType) => {
            this.isWaitingForServerAnswer = false;

            if (serverMessage.action === DuelWebsocketServerActions.PLAYER_STATE) {
                this.restoreState(serverMessage.payload);
            }

            if (serverMessage.action === DuelWebsocketServerActions.JOIN_QUEUE_SUCCESS) {
                if (this.matchState === MatchStates.WAITING_FOR_QUEUE) {
                    this.matchState = MatchStates.IN_QUEUE;
                }
            }

            if (serverMessage.action === DuelWebsocketServerActions.JOIN_QUEUE_FAILURE) {
                this.showErrorNotification(serverMessage.payload.error);
            }

            if (serverMessage.action === DuelWebsocketServerActions.LEAVE_QUEUE_SUCCESS) {
                if (this.matchState === MatchStates.IN_QUEUE) {
                    this.matchState = MatchStates.WAITING_FOR_QUEUE;
                }
            }

            if (serverMessage.action === DuelWebsocketServerActions.PICKBAN_STEP) {
                this.matchState = MatchStates.MATCH_IN_PROGRESS;
                this.match = serverMessage.payload.match;

                this.setPlayersInfo();
            }

            if (serverMessage.action === DuelWebsocketServerActions.MATCH_FINISHED) {
                this.matchState = MatchStates.MATCH_FINISHED;
            }

            this.changeDetectorRef.markForCheck();
        });
    }

    private showErrorNotification(errorMessage: string): void {
        this.languageService
            .getTranslations$()
            .pipe(take(1))
            .subscribe((translations: Record<string, string>) => this.snackBar.open(translations.error, errorMessage, { duration: 3000 }));
    }

    private sendRestorePlayerStateMessage(): void {
        this.user$.pipe(filter(Boolean), take(1)).subscribe(({ id }: UserInterface) => this.duelService.sendRestoreStateMessage(id));
    }

    private restoreState({ state, physics, match }: { state: MatchStates; physics?: Physics; match?: MatchInterface }): void {
        this.matchState = state;

        if (state === MatchStates.MATCH_IN_PROGRESS) {
            this.setPlayersInfo();
        }

        if (physics) {
            this.selectedPhysics = physics;
        }

        if (match) {
            this.match = match;
        }
    }

    private setPlayersInfo(): void {
        if (this.playersInfo) {
            return;
        }

        this.user$.pipe(filter(Boolean), take(1)).subscribe(() =>
            this.duelService.getPlayersInfo$().subscribe((playersInfo) => {
                this.playersInfo = playersInfo;
                this.changeDetectorRef.detectChanges();
            }),
        );
    }
}
