import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';
import { User } from '../shared/models/user';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  model: any = {};
  errorMessage: string;
  productName: string = environment.productName;

  constructor(private router: Router,
    private userService: UserService) { }

  ngOnInit() {
    this.userService.clearSession();
  }

  login() {
    this.errorMessage = '';
    const user = new User();
    user.username = this.model.username;
    user.password = this.model.password;
    this.userService.login(user).subscribe(loginUser => {
      this.userService.setSession(loginUser);
      if (loginUser.tempPassword === true) {
        this.router.navigate(['change-password']);
      } else {
        this.router.navigate(['']);
      }

    },
      error => {
        this.errorMessage = error.error.message;
      });
  }


}
