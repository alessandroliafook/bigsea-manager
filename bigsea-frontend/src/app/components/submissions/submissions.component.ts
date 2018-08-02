import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { Router } from '../../../../node_modules/@angular/router';
import { BigseaUser } from '../../model/bigsea-user.model';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-submissions',
  templateUrl: './submissions.component.html',
  styleUrls: ['./submissions.component.scss']
})
export class SubmissionsComponent implements OnInit {

  bigseaUser: BigseaUser;
  isCreatingUser = false;
  notification = '';
  showNotification = false;
  user: any = {
    username: '',
    password: '',
    email: ''
  };


  constructor(
    private router: Router,
    private sessionService: SessionService,
    private userService: UserService
  ) {
    this.bigseaUser = sessionService.recoveryUserFromStorage();
  }

  ngOnInit() {
  }

  signOut() {
    this.sessionService.signOut();
    this.router.navigate(['/']);
  }

  registerUser() {
    this.userService.newUser(this.user).subscribe(result => {
        this.showNotification = true;
        this.notification = 'Successfully registered ' + this.user.email + '!';
    }, err => {
        this.showNotification = true;
        this.notification = 'Couldn\'t register ' + this.user.email + '!';
    }, () => {
      this.user = {};
    });
  }

  toggleUserRegistration() {
    this.isCreatingUser = !this.isCreatingUser;
  }

  dismissNotification() {
    this.showNotification = false;
  }

}
