import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { Router } from '../../../../node_modules/@angular/router';
import { BigseaUser } from '../../model/bigsea-user.model';
import {UserService} from '../../services/user.service';
import {SubmissionService} from '../../services/submission.service';
import {Observable} from 'rxjs';

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
  isSelectingSubType = false;
  user: any = {
    username: '',
    password: '',
    email: ''
  };

  submission: any = {
    id: '',
    plugin: '',
    plugin_info: '',
    type: '1'
  };

  constructor(
    private router: Router,
    private sessionService: SessionService,
    private userService: UserService,
    private submissionService: SubmissionService
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

  sendSubmission() {

    let obs;
    switch (this.submission.type) {

      case '1':
        obs = this.submissionService.submitAndRun(this.submission);
        break;

      case '2':
        obs = this.submissionService.stopSubmission(this.submission.id);
        break;

      case '3':
        obs = this.submissionService.submissionStatus(this.submission.id);
        break;

      case '4':
        obs = this.submissionService.submissionLog(this.submission.id);
        break;

    }

    obs.subscribe((result) => {

    },

    (err) => {

    });

  }

  toggleUserRegistration() {
    this.isCreatingUser = !this.isCreatingUser;
  }

  toggleSubSelection() {
    this.isSelectingSubType = !this.isSelectingSubType;
  }

  dismissNotification() {
    this.showNotification = false;
  }

}
