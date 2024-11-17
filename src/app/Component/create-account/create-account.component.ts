import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Account } from '../../Model/account';
import { AccountService } from '../../Service/account.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


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
  isFormSubmitted: boolean = false;

  accountForm = new FormGroup({
    firstName: new FormControl("", [Validators.required, Validators.maxLength(50)]),
    lastName: new FormControl("", [Validators.required, Validators.maxLength(50)]),
    email: new FormControl("", [Validators.required, Validators.maxLength(100), Validators.email]),
    username: new FormControl("", [Validators.required, Validators.maxLength(50)]),
    city: new FormControl("", [Validators.required, Validators.maxLength(50)]),
    state: new FormControl("", [Validators.required, Validators.maxLength(50)]),
    zip: new FormControl("", [Validators.required, Validators.maxLength(50)]),
    balance: new FormControl(100, [Validators.required, Validators.min(100)]), //Added Balance
    isAgree: new FormControl(false)
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
      this.account.username = this.accountForm.value.username || '';
      this.account.city = this.accountForm.value.city || '';
      this.account.state = this.accountForm.value.state || '';
      this.account.zip = this.accountForm.value.zip || '';
      this.account.balance = this.accountForm.value.balance || 100; //Mapping the balance field

      console.log(this.account);
      this.isFormSubmitted = true;
      this.accountForm.markAsTouched();
      this.saveAccount();
    }
  }
}