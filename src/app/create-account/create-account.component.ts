import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Account } from '../account';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css'],
  providers: [AccountService]
})
export class CreateAccountComponent implements OnInit {
  account: Account = new Account();

  constructor(private accountService: AccountService, private router: Router) { }

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
    // Logic for form submission
    console.log(this.account);
    this.saveAccount();
  }
}