import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Account } from '../../Model/account';
import { AccountService } from '../../Service/account.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-account-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css'],
  providers: [AccountService]
})
export class AccountListComponent implements OnInit {
  accounts!: Account[];
  isButtonDisabled: boolean = false;

  constructor(private accountService: AccountService, private router: Router) {
    this.getAccounts();
  }

  ngOnInit(): void {
    this.getAccounts();
    const isAdmin = localStorage.getItem('isAdmin');
    this.isButtonDisabled = isAdmin === 'true' ? false : true;
  }

  private getAccounts() {
    var id = localStorage.getItem('loginId');
    if (id !== null) {
      this.accountService.getAccountsList(Number(id)).subscribe((data) => {
        this.accounts = data as unknown as Account[];
      });
    }
  }

  updateAccount(id: number) {
    // Logic for updating account
    this.router.navigate(['update-account', id]);
  }

  deleteAccount(id: number) {
    // Logic for deleting account
    if (confirm('Are you sure to delete this account?')) {
      this.accountService.deleteAccount(id).subscribe((data) => {
        console.log(data);
        alert('Account deleted successfully');
        this.getAccounts();
      });
    }
  }

  accountDetails(id: number) {
    // Logic for account details
    this.router.navigate(['account-details', id]);
  }
}
