import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { UserService } from './services/user.service';
import { SubmissionService } from './services/submission.service';

import { routing } from './config/routes.config';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SubmissionsComponent } from './components/submissions/submissions.component';
import { RegisterComponent } from './components/register/register.component';

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
    HttpClientModule
  ],
  providers: [
    UserService,
    SubmissionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
