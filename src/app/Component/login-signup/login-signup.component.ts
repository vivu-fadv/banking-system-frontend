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
    localStorage.removeItem('logindata');
    localStorage.removeItem('adminlogin');

    this.signupform = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
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
    this.accountService.loginAccount(this.signupform.value).subscribe(
      (res) => {
        alert('successfully signed up');
        this.signupform.reset();
        this.router.navigate(['/login-signup']);
      },
      (err) => {
        alert('something went wrong try after sometime');
        this.signupform.reset();
        this.router.navigate(['/server-error']);
      }
    );
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
          this.router.navigate(['/account-list']);
          localStorage.setItem('isLoggedin', 'true');
        }
        else
        {
          alert('Invalid username or password');
        }
      });
    }
  }
}