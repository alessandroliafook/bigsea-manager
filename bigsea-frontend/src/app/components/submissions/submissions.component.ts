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
      this.submissions = result;
    });

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

  reloadSubmissions() {
    this.submissionService.listSubmissions().subscribe((result) => {
      this.submissions = result;
    });
  }

  sendSubmission() {

    let obs;
    switch (this.submission.type) {

      case '1':
        // obs = this.submissionService.submitAndRun(this.submission);
        this.submissions.push({status: 'Submit and Run'});
        break;

      case '2':
        // obs = this.submissionService.stopSubmission(this.submission.id);
        this.submissions.push({status: 'Stop'});
        break;

      case '3':
        // obs = this.submissionService.submissionStatus(this.submission.id);
        this.submissions.push({status: 'Status'});
        break;

      case '4':
        // obs = this.submissionService.submissionLog(this.submission.id);
        this.submissions.push({status: 'Log'});
        break;

    }

    // TODO: descomentar
    // obs.subscribe((result) => {
    //
    // },
    //
    // (err) => {
    //
    // },
    //
    // () => {
    //   this.toggleSubmission();
    // });

    // TODO: remover
    this.toggleSubmission();

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
