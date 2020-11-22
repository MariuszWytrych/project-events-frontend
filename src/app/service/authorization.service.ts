import {Injectable} from '@angular/core';
import {LoginData} from '../model/login-data';
import {Observable} from 'rxjs';
import {LoggedUser} from '../model/loggedUser';
import {HttpClient} from '@angular/common/http';
import {GlobalsService} from './globals.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  loggedUser: LoggedUser = null;

  constructor(private globals: GlobalsService, private httpClient: HttpClient) {
  }
  login(loginData: LoginData, successCallback: (LoggedUser) => void, errorCallback: () => void): void {
    const authorizationHeader = 'Basic ' + btoa(loginData.name + ':' + loginData.password);
    localStorage.setItem('authorizationHeader', authorizationHeader);
    this.authenticate(successCallback, errorCallback);
  }

  authenticate(successCallback: (LoggedUser) => void, errorCallback: () => void): void {
    const url = this.globals.apiUrl + '/user/login';
    this.httpClient.get<LoggedUser>(url)
      .subscribe(loggedUser => {
        this.loggedUser = loggedUser;
        successCallback(loggedUser);
      }, () => errorCallback());
  }

  logout(successCallback: () => void): void {
    localStorage.removeItem('authorization');
    this.loggedUser = null;
    successCallback();
  }
}
