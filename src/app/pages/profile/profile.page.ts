import { MAIN_URL } from '../../configs/url-params.config';
import { Physics } from '../../enums/physics.enum';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap, tap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ProfileService } from './services/profile.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.less'],
})
export class ProfilePageComponent implements OnInit, OnDestroy {
    // TODO [DFRU-8] типизировать все any
    public mainInfo: any;
    public cpmChart: any;
    public vq3Chart: any;
    public demos: any;
    public cups: any;
    public isLoading = true;
    public physics = Physics;
    public mainUrl = MAIN_URL;

    private onDestroy$ = new Subject<void>();

    constructor(private activatedRoute: ActivatedRoute, private profileService: ProfileService, private sanitizer: DomSanitizer) {}

    ngOnInit(): void {
        this.setRouteSubscription();
    }

    ngOnDestroy(): void {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    }

    public setRouteSubscription(): void {
        this.activatedRoute.params.pipe(
            tap(() => this.isLoading = true),
            switchMap(({ id }: Params) => this.profileService.getProfile$(id)),
            takeUntil(this.onDestroy$),
        ).subscribe((profileInfo: any) => {
            this.mainInfo = profileInfo.player;
            this.cpmChart = profileInfo.rating.cpm;
            this.vq3Chart = profileInfo.rating.vq3;
            this.demos = profileInfo.demos;
            this.cups = profileInfo.cups;

            this.sanitizer.bypassSecurityTrustResourceUrl(`/assets/images/avatars/${ this.mainInfo.avatar }.jpg`);

            this.isLoading = false;
        });
    }
}
