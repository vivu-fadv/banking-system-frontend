import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Account } from '../../Model/account';
import { Router } from '@angular/router';
import { AccountService } from '../../Service/account.service';

@Component({
  selector: 'app-login-signup',
  standalone: true,
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css'],
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  providers: [AccountService],
})
export class LoginSignupComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private accountService: AccountService,
    private http: HttpClient
  ) {}
  account: Account = new Account();
  signupform!: FormGroup;
  loginform!: FormGroup;
  isLoginMode: boolean = true;
  ngOnInit(): void {
    // userdata should not be stored in localstorage
    localStorage.removeItem('loginId');
    // signup
    this.signupform = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
    });

    // login
    this.loginform = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  signup() {
    this.isLoginMode = false;
  }
  login() {
    this.isLoginMode = true;
  }

  submitsignup() {
    if (
      this.signupform.value.username !== '' &&
      this.signupform.value.password !== '' &&
      this.signupform.value.email !== ''
    ) {
      this.account.password = this.signupform.value.password;
      this.account.username = this.signupform.value.username;
      this.account.email = this.signupform.value.email;
      this.accountService.signupAccount(this.account).subscribe((data) => {
        if (data) {
          alert('Account created successfully!');
          this.isLoginMode = true;
        }
        else
        {
          alert('Signup failed');
        }
      });
    }
  }

  loginuser() {
    if (
      this.loginform.value.username !== '' &&
      this.loginform.value.password !== ''
    ) {
      this.account.password = this.loginform.value.password;
      this.account.username = this.loginform.value.username;
      this.accountService.loginAccount(this.account).subscribe((data) => {
        if (data) {
          var result = data as unknown as Account;
          this.router.navigate(['/account-list']);
          localStorage.setItem('loginId', result.id.toString());
          localStorage.setItem('username', result.username);
          localStorage.setItem('isAdmin', result.isAdmin.toString());
        }
        else
        {
          alert('Invalid username or password');
        }
      });
    }
  }
}
