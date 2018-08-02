import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { Router } from '../../../../node_modules/@angular/router';
import { BigseaUser } from '../../model/bigsea-user.model';

@Component({
  selector: 'app-submissions',
  templateUrl: './submissions.component.html',
  styleUrls: ['./submissions.component.scss']
})
export class SubmissionsComponent implements OnInit {

  user: BigseaUser;
  isCreatingUser : boolean = false;
  constructor(
    private router: Router,
    private sessionService: SessionService
  ) { 
    this.user = sessionService.recoveryUserFromStorage();
  }

  ngOnInit() {
  }

  signOut(){
    this.sessionService.signOut();
    this.router.navigate(['/']);
  }

  registerUser() {
    this.isCreatingUser = true;
  }



}
