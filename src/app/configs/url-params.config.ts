import { Physics } from '../enums/physics.enum';

export const MAIN_URL = 'http://localhost:80';
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

    public static RATING_TABLE_PLAYERS_COUNT(physics: Physics): string {
        return `${API_URL}/tables/rating_table_players_count/${physics}`;
    }

    public static SEASON_RATING_TABLE_PAGE(physics: Physics, page: number, season: number): string {
        return `${API_URL}/tables/rating/${physics}/${page}/${season}`;
    }

    public static SEASON_RATING_TABLE_PLAYERS_COUNT(physics: Physics, season: number): string {
        return `${API_URL}/tables/season_rating_table_players_count/${physics}/${season}`;
    }

    public static PROFILE(playerId: string): string {
        return `${API_URL}/profile/${playerId}`;
    }

    public static get NEWS(): {
        MAIN_PAGE: string;
    } {
        return {
            MAIN_PAGE: `${API_URL}/news/mainpage`,
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
        }
    }

    public static get CUP(): {
        GET_NEXTCUP: string;
    } {
        return {
            GET_NEXTCUP: `${API_URL}/cup/next_cup_info`,
        };
    }
}
