import { Physics } from '../enums/physics.enum';

export const MAIN_URL = 'http://dfcomps.ru';
export const API_URL = `${MAIN_URL}/api`;

export class URL_PARAMS {
    public static get MOVIES(): string {
        return `${API_URL}/movies`;
    }

    public static get USER_ACTIONS(): {
        LOGIN: string;
        REGISTER: string;
        LOGOUT: string;
        CHECK_ACCESS: string;
        CHECK_LOGIN: string;
    } {
        return {
            LOGIN: `${API_URL}/user/login`,
            REGISTER: `${API_URL}/user/register`,
            LOGOUT: `${API_URL}/user/logout`,
            CHECK_ACCESS: `${API_URL}/user/check_access`,
            CHECK_LOGIN: `${API_URL}/user/check_login`,
        };
    }

    public static TOP_TEN_TABLE(physics: Physics): string {
        return `${API_URL}/tables/top10/${physics}`;
    }

    public static RATING_TABLE_PAGE(physics: Physics, page: number): string {
        return `${API_URL}/tables/rating/${physics}/${page}`;
    }

    public static RATING_TABLE_PLAYERS_COUNT(): string {
        return `${API_URL}/tables/rating_table_players_count`;
    }

    public static SEASON_RATING_TABLE_PAGE(physics: Physics, page: number, season: number): string {
        return `${API_URL}/tables/season_rating/${physics}/${page}/${season}`;
    }

    public static SEASON_RATING_TABLE_PLAYERS_COUNT(season: number): string {
        return `${API_URL}/tables/season_rating_table_players_count/${season}`;
    }

    public static PROFILE(playerId: string): string {
        return `${API_URL}/profile/${playerId}`;
    }

    public static get NEWS(): {
        MAIN_PAGE: string;
        COUNT: string;
        SINGLE_NEWS: (id: string) => string;
        ARCHIVE: (startIndex: number, endIndex: number) => string;
    } {
        return {
            MAIN_PAGE: `${API_URL}/news/mainpage`,
            COUNT: `${API_URL}/news/count`,
            SINGLE_NEWS: (id: string) => `${API_URL}/news/single/${id}`,
            ARCHIVE: (startIndex: number, endIndex: number) => `${API_URL}/news/archive/${startIndex}/${endIndex}`,
        };
    }

    public static get COMMENTS(): {
        ADD: string;
    } {
        return {
            ADD: `${API_URL}/comments/add`,
        };
    }

    public static get DEMOS(): {
        UPLOAD: string;
        DELETE: string;
    } {
        return {
            UPLOAD: `${API_URL}/cup/upload_demo`,
            DELETE: `${API_URL}/cup/delete_demo`,
        };
    }

    public static get CUP(): {
        GET_NEXTCUP: string;
        ONLINE_FULL_TABLE: (cupId: string) => string;
        ONLINE_ROUND: (cupId: string, roundNumber: string) => string;
        MULTICUP_FULL_TABLE: (cupId: string, physics: Physics) => string;
        MULTICUP_ROUND: (cupId: string, physics: Physics, roundNumber: string) => string;
    } {
        return {
            GET_NEXTCUP: `${API_URL}/cup/next_cup_info`,
            ONLINE_FULL_TABLE: (cupId: string) => `${API_URL}/cup/online/${cupId}`,
            ONLINE_ROUND: (cupId: string, roundNumber: string) => `${API_URL}/cup/online/${cupId}/round/${roundNumber}`,
            MULTICUP_FULL_TABLE: (cupId: string, physics: Physics) => `${API_URL}/cup/multi/${cupId}/${physics}`,
            MULTICUP_ROUND: (cupId: string, physics: Physics, roundNumber: string) =>
                `${API_URL}/cup/multi/${cupId}/${physics}/round/${roundNumber}`,
        };
    }
}
