import {Component, OnInit} from '@angular/core';
import {AuthorizationService} from '../../service/authorization.service';
import {LoggedUser} from '../../model/logged-user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'project-events-frontend';
  loggedUser: LoggedUser = null;
  loggedIn = false;

  constructor(private authorization: AuthorizationService, private router: Router) {
  }

  ngOnInit(): void {
    this.authorization.checkLoginStatus(loggedUser => this.onAuthenticationSuccess(loggedUser));
    this.router
      .events
      .subscribe(() => {
        if (this.loggedUser !== this.authorization.loggedUser) {
          this.loggedUser = this.authorization.loggedUser;
          this.loggedIn = true;
        }
      });
  }

  private onAuthenticationSuccess(loggedUser: LoggedUser): void {
    this.loggedUser = loggedUser;
    console.log(this.loggedUser);
    this.loggedIn = true;
  }

  logout(): void {
    this.authorization.logout(() => {
      this.loggedUser = null;
      this.loggedIn = false;
      this.router.navigate(['']);
    });
  }
}
