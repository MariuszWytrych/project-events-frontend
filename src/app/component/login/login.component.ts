import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginData} from '../../model/login-data';
import {LoggedUser} from '../../model/loggedUser';
import {GlobalsService} from '../../service/globals.service';
import {AuthorizationService} from '../../service/authorization.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  loggedUser: LoggedUser = null;
  loggedIn = false;
  loginData: LoginData = {
    name: '',
    password: ''
  };
  url = 'http://localhost:8080/user/login';

  constructor(private globals: GlobalsService, private httpClient: HttpClient,
              private authorization: AuthorizationService) {
  }

  ngOnInit(): void {
    this.authorization.authenticate(loggedUser => this.onAuthenticationSuccess(loggedUser), () => {
    });
  }

  login(): void {
    this.authorization.login(this.loginData,
      loggedUser => this.onAuthenticationSuccess(loggedUser),
      () => alert('Błąd logowania'));

  }

  private onAuthenticationSuccess(loggedUser): void {
    console.log(loggedUser);
    this.loggedIn = true;
    this.loggedUser = loggedUser;
  }


}
