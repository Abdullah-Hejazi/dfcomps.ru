import { LanguageService } from '../../../../services/language/language.service';
import { Translations } from '../../../../components/translations/translations.component';
import { Component, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { Rewards } from '../../enums/rewards.enum';
import { PROFILE_REWARDS } from '../../config/profile-rewards.config';

interface RewardWithIconPath {
    reward: Rewards;
    iconPath: string;
}

@Component({
    selector: 'app-profile-rewards',
    templateUrl: './profile-rewards.component.html',
    styleUrls: ['./profile-rewards.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileRewardsComponent extends Translations implements OnChanges {
    @Input()
    rewards: Rewards[];

    public rewardsWithIconPaths: RewardWithIconPath[];

    constructor(protected languageService: LanguageService) {
        super(languageService);
    }

    ngOnChanges({ rewards }: SimpleChanges): void {
        if (rewards) {
            this.rewardsWithIconPaths = this.rewards.map((reward: Rewards) => ({ reward, iconPath: this.getRewardIconPath(reward) }));
        }
    }

    private getRewardIconPath(reward: Rewards): string {
        return `/assets/images/rewards/${PROFILE_REWARDS.ICONS_MAP[reward]}.png`;
    }
}
