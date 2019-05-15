import { Rewards } from '../enums/rewards.enum';

export class PROFILE_REWARDS {
    public static get ICONS_MAP(): Record<Rewards, string> {
        return {
            [Rewards.SEASON_ONE_PARTICIPANT]: 's1',
            [Rewards.TOP1_VQ3_FIRST_SEASON]: 'top_1_vq3',
            [Rewards.TOP2_VQ3_FIRST_SEASON]: 'top_2_vq3',
            [Rewards.TOP3_VQ3_FIRST_SEASON]: 'top_3_vq3',
            [Rewards.TOP1_CPM_FIRST_SEASON]: 'top_1_cpm',
            [Rewards.TOP2_CPM_FIRST_SEASON]: 'top_2_cpm',
            [Rewards.TOP3_CPM_FIRST_SEASON]: 'top_3_cpm',
            [Rewards.TOP10_VQ3_FIRST_SEASON]: 'top10',
            [Rewards.TOP10_CPM_FIRST_SEASON]: 'top10',
            [Rewards.THE_BITTER_MAN]: 'the_bitter_man',
            [Rewards.THE_CAKE]: 'qportal',
            [Rewards.DDC2018_TOP1]: 'ddc2018-top1',
            [Rewards.DDC2018_TOP2]: 'ddc2018-top2',
            [Rewards.DDC2018_TOP3]: 'ddc2018-top3',
            [Rewards.DDC2018_TOP4]: 'ddc2018-top4',
            [Rewards.DDC2018_PARTICIPANT]: 'ddc2018-part',
        };
    }
}
