import { Injectable } from '@angular/core';
import { BackendService } from '../backend-service/backend-service';
import { URL_PARAMS } from '../../configs/url-params.config';
import { Observable } from 'rxjs';
import { LoginAvailableDtoInterface } from './dto/login-available.dto';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService {
    private _isLogged: boolean;

    constructor(private backendService: BackendService) {}

    public get isLogged(): boolean {
        return this._isLogged;
    }

    public login$(login: string, password: string): Observable<any> {
        return this.backendService.post$(URL_PARAMS.USER_ACTIONS.LOGIN, {
            login,
            password,
        });
    }

    public checkLogin$(login: string): Observable<boolean> {
        return this.backendService
            .post$(URL_PARAMS.USER_ACTIONS.CHECK_LOGIN, {
                login,
            })
            .pipe(map(({ loginAvailable }: LoginAvailableDtoInterface) => loginAvailable));
    }

    public checkAccess$(): Observable<any> {
        return this.backendService.post$(URL_PARAMS.USER_ACTIONS.CHECK_ACCESS);
    }

    public register(login: string, password: string): void {
        this.backendService.post$(URL_PARAMS.USER_ACTIONS.REGISTER, {
            login,
            password,
        });
    }

    public logout(): void {
        this.backendService.post$(URL_PARAMS.USER_ACTIONS.REGISTER);
    }
}
