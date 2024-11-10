import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Account } from '../account';
import { AccountService } from '../account.service';

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

    constructor(private accountService: AccountService) {}

    ngOnInit(): void {
        this.getAccounts();
    }

    private getAccounts() {
        this.accountService.getAccountsList().subscribe(data => {
            this.accounts = data as unknown as Account[];
        });
    }
}