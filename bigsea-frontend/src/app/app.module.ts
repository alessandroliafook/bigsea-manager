import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';

import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';

import { UserService } from './services/user.service';
import { SubmissionService } from './services/submission.service';
import { SessionService } from './services/session.service';

import { routing } from './config/routes.config';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SubmissionsComponent } from './components/submissions/submissions.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import {FormsModule} from '@angular/forms';
import {AuthInterceptor} from './interceptor/auth.interceptor';

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('805238338632-eqa63hvse1tt3qa2emud2ta368tps7dm.apps.googleusercontent.com')
  },
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    SubmissionsComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    routing,
    RouterModule,
    HttpClientModule,
    FormsModule,
    SocialLoginModule
  ],
  providers: [
    UserService,
    SubmissionService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    SessionService,
    AuthGuard,

    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
