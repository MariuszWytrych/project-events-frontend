import {Injectable} from '@angular/core';
import {LoginData} from '../model/login-data';
import {Observable} from 'rxjs';
import {LoggedUser} from '../model/logged-user';
import {HttpClient} from '@angular/common/http';
import {GlobalsService} from './globals.service';
import {log} from 'util';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  loggedUser: LoggedUser = null;

  constructor(private globals: GlobalsService, private httpClient: HttpClient) {
  }
  login(loginData: LoginData, successCallback: (LoggedUser) => void, errorCallback: () => void): void {
    localStorage.removeItem('jwt');
    this.httpClient.post<LoggedUser>(this.globals.apiUrl + '/user/login', loginData)
      .subscribe(loggedUser => {
        this.loggedUser = loggedUser;
        localStorage.setItem('jwt', loggedUser.jwt);
        successCallback(loggedUser);
      }, () => errorCallback());
  }

  checkLoginStatus(successCallback: (LoggedUser) => void): void {
    this.httpClient.get<LoggedUser>(this.globals.apiUrl + '/user/check-login-status')
      .subscribe(loggedUser => {
        this.loggedUser = loggedUser;
        successCallback(loggedUser);
      });
  }

  logout(successCallback: () => void): void {
    localStorage.removeItem('jwt');
    this.loggedUser = null;
    successCallback();
  }
}
