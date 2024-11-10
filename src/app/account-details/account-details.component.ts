import { Component, OnInit } from '@angular/core';
import { Account } from '../account';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../account.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-account-details',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './account-details.component.html',
  styleUrl: './account-details.component.css',
  providers: [AccountService]
})
export class AccountDetailsComponent implements OnInit {
  id!: number;
  account!: Account;
  constructor(private route:ActivatedRoute, private accountService: AccountService) { }

  ngOnInit(): void {
    // Logic for initialization
    this.id = this.route.snapshot.params['id'];
    this.account = new Account();
    this.accountService.getAccountById(this.id).subscribe(data => { this.account = data; }, error => console.log(error));
  }

}
