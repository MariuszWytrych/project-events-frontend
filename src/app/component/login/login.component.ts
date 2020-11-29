import {Component, OnInit} from '@angular/core';
import {LoginData} from '../../model/login-data';
import {AuthorizationService} from '../../service/authorization.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  loginData: LoginData = {
    username: '',
    password: ''
  };

  constructor(private authorization: AuthorizationService, private router: Router) {
  }

  ngOnInit(): void {
  }

  login(): void {
    this.authorization.login(this.loginData,
      () => this.router.navigate(['/']),
      () => alert('Błąd logowania'));
  }
}
