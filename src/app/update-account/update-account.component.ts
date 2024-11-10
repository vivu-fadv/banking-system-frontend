import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Account } from '../account';
import { AccountService } from '../account.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';;

@Component({
  selector: 'app-update-account',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './update-account.component.html',
  styleUrl: './update-account.component.css',
  providers: [AccountService]
})
export class UpdateAccountComponent {
  id!: number;
  account: Account = new Account();

  constructor(private accountService: AccountService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // Logic for initialization
    this.id = this.route.snapshot.params['id'];
    this.accountService.getAccountById(this.id).subscribe(data => {
      this.account = data;
    },
      error => console.log(error));
  }

  updateAccount() {
    this.accountService.updateAccount(this.id, this.account).subscribe(data => {
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
    this.updateAccount();
  }
}
