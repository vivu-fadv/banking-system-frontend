import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
//import { signup, login } from '../contactmodel';
import { Router } from '@angular/router';
import { AccountService } from '../../Service/account.service';

@Component({
  selector: 'app-login-signup',
  standalone: true,
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css'],
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  providers: [AccountService]
})
export class LoginSignupComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private router: Router) { 

  }
  signupform!: FormGroup;
  loginform!: FormGroup;
  isLoginMode:boolean = true;
  ngOnInit(): void {
    // userdata should not be stored in localstorage
    localStorage.removeItem("logindata")
    localStorage.removeItem("adminlogin")

    this.signupform = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
    // login
    this.loginform = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  signup() {
    this.isLoginMode = false;
  }
  login() {
    this.isLoginMode = true;
  }

  submitsignup() {
    // this.http.post<signup>("http://localhost:3000/signup", this.signupform.value).subscribe(res => {
    //   const user = res;
    //   if (res) {
    //     alert("user signed up successfully !!!!")
    //   } else {
    //     alert("Please try again")
    //   }
    //   this.signupform.reset();
    // }, err => {
    //   // alert("something went wrong try after sometime")
    //   this.loginform.reset();
    //   // alert("something went wrong !!")
    //    this.router.navigate(["/server-error"])
    // })
  }

  loginuser() {
    if(this.loginform.value.username === 'demo' && this.loginform.value.password === '123')
    {
      this.router.navigate(['/account-list']);
    }
    // this.http.get<login[]>("http://localhost:3000/signup").subscribe(res => {
    //   // matching email & password
    //   const user = res.find((a: any) => {
    //     return a.email === this.loginform.value.email && a.password === this.loginform.value.password;
    //   })
    //   // check condition for login

    //   if (user) {
    //     alert("successfully logged in");
    //     this.loginform.reset();
    //     this.router.navigate(["/contactlist"])
    //     // storing data in local storage
    //     localStorage.setItem('logindata', JSON.stringify(user))
    //   } else {
    //     alert("user not found with these credentials")
    //     this.loginform.reset();
    //   }
    // }, err => {
    //   // alert("something went wrong try after sometime")
    //   this.loginform.reset();
    //   this.router.navigate(["/server-error"])
    // })
  }

  adminlogin() {
    //this.router.navigate(['/adminlogin-signup']);
  }
}