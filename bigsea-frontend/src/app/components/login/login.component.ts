import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private sessionService: SessionService
  ) { }

  ngOnInit() {
    if(this.sessionService.isSignedIn()){
      this.router.navigate(['/submissions']);
    }
  }

  signInWithGoogle(){
    this.sessionService.signIn();
  }

}
