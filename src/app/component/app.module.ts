import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app/app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {WelcomeComponent} from './welcome/welcome.component';
import {AuthorizationInterceptor} from '../interceptor/authorization.interceptor';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import { EventsListComponent } from './events-list/events-list.component';
import { EventByIdComponent } from './event-by-id/event-by-id.component';

const routes: Routes = [{
  path: '',
  component: WelcomeComponent
}, {
  path: 'register',
  component: RegisterComponent
}, {
  path: 'login',
  component: LoginComponent
}, {
  path: 'events',
  component: EventsListComponent
}, {
  path: 'event-by-id/:id',
  component: EventByIdComponent
}
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    WelcomeComponent,
    EventsListComponent,
    EventByIdComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [{
    useClass: AuthorizationInterceptor,
    multi: true,
    provide: HTTP_INTERCEPTORS
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
