import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Account } from '../../Model/account';
import { AccountService } from '../../Service/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';;

@Component({
  selector: 'app-update-account',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './update-account.component.html',
  styleUrl: './update-account.component.css',
  providers: [AccountService]
})
export class UpdateAccountComponent {
  id!: number;
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
    balance: new FormControl(0, [Validators.required]),
    //isAgree: new FormControl(false)
  });

  constructor(private accountService: AccountService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // Logic for initialization
    this.id = this.route.snapshot.params['id'];
    this.accountService.getAccountById(this.id).subscribe(data => {
      this.account = data;
      this.accountForm.value.firstName = data.firstName;
      this.accountForm.value.lastName = data.lastName;
      this.accountForm.value.email = data.email;
      this.accountForm.value.username = data.username;
      this.accountForm.value.city = data.city;
      this.accountForm.value.state = data.state;
      this.accountForm.value.zip = data.zip;
      this.accountForm.value.balance = data.balance;
    },
      error => console.log(error));
  }

  updateAccount() {
    this.accountService.updateAccount(this.id, this.account).subscribe(data => {
      console.log(data);
      this.account = new Account();
      alert('Account updated successfully');
      this.goToAccountList();
    },
      error => console.log(error));
  }

  goToAccountList() {
    // Logic for navigation to account
    this.router.navigate(['/account-list']);
  }

  onSubmit() {
    // Logic for form submission
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
      this.account.balance = this.accountForm.value.balance || 0; 

      console.log(this.account);
      this.isFormSubmitted = true;
      this.accountForm.markAsTouched();
      this.updateAccount();
    }
  }
}
