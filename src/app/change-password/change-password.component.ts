import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../shared/services/alert.service';
import { User } from '../shared/models/user';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private alertService: AlertService,
    private userService: UserService) { }

  ngOnInit() {
    if (!this.userService.hasSessionToken()) {
      this.router.navigate(['login']);
    }

    this.changePasswordForm = this.formBuilder.group({
      current_password: ['', [Validators.required, Validators.minLength(6)]],
      new_password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', [Validators.required, Validators.minLength(6)]]
    }, { validator: this.checkPasswords });
  }

  // convenience getter for easy access to form fields
  get f() { return this.changePasswordForm.controls; }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    if (group.controls.current_password.value === group.controls.new_password.value)  {
      return { sameNewPassword: true };
    } else if (group.controls.new_password.value !== group.controls.confirm_password.value) {
      return { notSame: true };
    } else {
      return null;
    }
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.changePasswordForm.invalid) {
      return;
    }

    this.loading = true;

    const user = new User();
    user.username = this.userService.getUserEmail();
    user.email = this.userService.getUserEmail();
    user.password = this.changePasswordForm.value.current_password;
    user.confirmationToken = this.changePasswordForm.value.new_password;

    this.userService.changePassword(user).subscribe(registerUser => {
      this.alertService.success('Password changed.', true);
      this.router.navigate(['home']);
    },
      error => {
        this.alertService.error(error.error.message);
        this.loading = false;
      });
  }

}
