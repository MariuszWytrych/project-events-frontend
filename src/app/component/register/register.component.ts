import {Component, OnInit} from '@angular/core';
import {RegisterNewUser} from '../../model/registerNewUser';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
newUser: RegisterNewUser = {
  name: '',
  password: '',
  mail: '',
  dateOfBirth: ''
};
  url = 'http://localhost:8080/user/register';

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
  }

  register(): void {
    this.httpClient.post<RegisterNewUser>(this.url, this.newUser)
      .subscribe(newUser => this.newUser = newUser);
    this.router.navigate(['']);
  }
}
