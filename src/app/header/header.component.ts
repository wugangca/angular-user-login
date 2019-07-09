import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public loggedIn = false;
  constructor(private router: Router, private userService: UserService) {
    router.events.subscribe(event => {
      this.loggedIn = this.userService.hasSessionToken();
    });
  }

  ngOnInit() {

  }

  logout() {
    this.userService.clearSession();
    this.router.navigate(['login']);
  }
}
