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
  newSubmission: any;
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

  submissions: any = [];

  constructor(
    private router: Router,
    private sessionService: SessionService,
    private userService: UserService,
    private submissionService: SubmissionService
  ) {
    this.bigseaUser = sessionService.recoveryUserFromStorage();
  }

  ngOnInit() {

    this.submissionService.listSubmissions().subscribe(result => {
      // console.log(result);

      if (Object.keys(result).length === 0 && result.constructor === Object) {
        return;
      }

      this.submissions = result;
    });

  }

  signOut() {
    this.sessionService.signOut();
    this.router.navigate(['/']);
  }

  registerUser() {

    // console.log(this.user);

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

  reloadSubmissions() {
    this.submissionService.listSubmissions().subscribe((result) => {

      if (Object.keys(result).length === 0 && result.constructor === Object) {
        return;
      }

      this.submissions = result;

    });
  }

  sendSubmission() {

    let obs;
    switch (this.submission.type) {

      case '1':
        this.newSubmission = JSON.parse(this.newSubmission);
        console.log(this.newSubmission);
        obs = this.submissionService.submitAndRun(this.newSubmission);
        break;

      case '2':
        obs = this.submissionService.stopSubmission(this.submission.id);
        break;

      case '3':
        obs = this.submissionService.submissionStatus(this.submission.id);
        break;

      case '4':
        // let id = this.submission.id;
        // console.log(id.replace('os', ''));
        obs = this.submissionService.submissionLog(this.submission.id);
        break;

    }

    obs.subscribe((result) => {
      // this.toggleSubmission();
      // console.log(result);
    },

    (err) => {
      // console.log(err);
      this.isSelectingSubType = false;
    },

    () => {
      this.isSelectingSubType = false;
      this.newSubmission = '';

      this.reloadSubmissions();
    });
  }

  toggleUserRegistration() {
    this.isCreatingUser = !this.isCreatingUser;
  }

  toggleSubmission() {
    this.isSelectingSubType = !this.isSelectingSubType;
  }

  dismissNotification() {
    this.showNotification = false;
  }

}
