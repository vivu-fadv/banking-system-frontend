import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Account } from '../account';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css'],
  providers: [AccountService]
})
export class AccountListComponent implements OnInit {
    accounts!: Account[];

    constructor(private accountService: AccountService, private router: Router) {
        this.getAccounts();
    }

    ngOnInit(): void {
        this.getAccounts();
    }

    private getAccounts() {
        this.accountService.getAccountsList().subscribe(data => {
            this.accounts = data as unknown as Account[];
        });
    }

    updateAccount(id: number) {
        // Logic for updating account
        this.router.navigate(['update-account', id]);
    }
}