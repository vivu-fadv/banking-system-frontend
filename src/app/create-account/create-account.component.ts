import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Account } from '../account';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { last } from 'rxjs';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css'],
  providers: [AccountService]
})
export class CreateAccountComponent implements OnInit {
  account: Account = new Account();
  accountForm = new FormGroup({
    firstName: new FormControl("", [Validators.required, Validators.maxLength(50)]),
    lastName: new FormControl("", [Validators.required, Validators.maxLength(50)]),
    email: new FormControl("", [Validators.required, Validators.maxLength(100), Validators.email]),
  });

  constructor(private accountService: AccountService, private router: Router) {
  }

  ngOnInit(): void {
  }

  saveAccount() {
    this.accountService.createAccount(this.account).subscribe(data => {
      console.log(data);
      this.account = new Account();
      this.goToAccountList();
    },
      error => console.log(error));
  }

  goToAccountList() {
    // Logic for navigation to account
    this.router.navigate(['/account-list']);
  }

  onSubmit() {
    const isFormValid = this.accountForm.valid;
    if (isFormValid) {
      // Logic for form submission
      this.account.firstName = this.accountForm.value.firstName || '';
      this.account.lastName = this.accountForm.value.lastName || '';
      this.account.email = this.accountForm.value.email || '';
      console.log(this.account);
      this.saveAccount();
    }
  }
}