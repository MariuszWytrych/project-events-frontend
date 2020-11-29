import { Component, OnInit } from '@angular/core';
import {AuthorizationService} from '../../service/authorization.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
})
export class WelcomeComponent implements OnInit {

  loggedIn = false;
  constructor(private authorization: AuthorizationService) { }

  ngOnInit(): void {
    this.loggedIn = this.authorization.loggedUser !== null;
  }

}
