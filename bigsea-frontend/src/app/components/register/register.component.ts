import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user: any = {
    username: '',
    password: '',
    email: ''
  };

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  register() {

    console.log(this.user);

    this.userService.newUser(this.user).subscribe((result) => {
      this.router.navigate(['/']);
    });
  }

}
