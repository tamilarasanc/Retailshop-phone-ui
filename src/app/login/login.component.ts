import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from "../services/auth/auth.service";
import {LoginService} from "../services/user/login.service";
import {CommonService} from "../services/common/common.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userForm: FormGroup;
  passwordVisible = false;
  serverError = false;
  @ViewChild('passwordField') passwordField: ElementRef;
  constructor(
              private fb: FormBuilder,
              private loginService: LoginService,
              private _router: Router,
              private _authService: AuthService,
              private commonService: CommonService
  ) {
  }

  ngOnInit() {
    if (this._authService.isAuthenticated()) {
      this._router.navigate(['']);
    }
    this.initForm();
  }

  initForm() {
    this.userForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login() {
    this.serverError = false;
    this.loginService.login(this.userForm.value).toPromise()
        .then(user => {
            localStorage.setItem('currentUser', JSON.stringify(user['user']));
            localStorage.setItem('role', user['role']);
            localStorage.setItem('token', user.token);
            this._authService.role = user['role'];
              this.commonService.loadMessage('info', 'Login status',
                  `${user['user']['email_id']} loggedin successfully`)
            this.commonService.updateLoggedUser(true)
            this._router.navigate(['/products']);
            },
            error => {
              this.commonService.loadMessage('error', 'Login status',
                  error.error['error'])
            });
  }

  showPassword() {
    this.passwordVisible = !this.passwordVisible;
    this.passwordField.nativeElement.type = this.passwordVisible ? 'text' : 'password';
  }

}
