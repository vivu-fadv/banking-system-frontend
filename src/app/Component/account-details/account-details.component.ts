import { Component, OnInit } from '@angular/core';
import { Account } from '../../Model/account';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../../Service/account.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

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
  depositAmount: number = 0;
  constructor(private route:ActivatedRoute, private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    // Logic for initialization
    this.id = this.route.snapshot.params['id'];
    this.account = new Account();
    this.accountService.getAccountById(this.id).subscribe(data => { this.account = data; }, error => console.log(error));
  }

  // Method to handle deposit logic
  onDeposit(): void {
    const amount = prompt('Enter deposit amount:'); // Ask user for the deposit amount
    if (amount && parseFloat(amount) > 0) {
      this.depositAmount = parseFloat(amount);

      // Call the AccountService to update the balance
      this.accountService.depositAmount(this.id, this.depositAmount).subscribe(
        (updatedAccount) => {
          this.account = updatedAccount; // Update the local account object
          alert(`Deposit successful! New balance: $${updatedAccount.balance.toFixed(2)}`);
        },
        (error) => {
          console.error('Deposit failed:', error);
          alert('Failed to deposit. Please try again.');
        }
      );
    } else {
      alert('Invalid deposit amount.');
    }
  }

  onWithdraw(): void {
    const amount = prompt('Enter withdraw amount:'); // Ask user for the withdraw amount
    if (amount && parseFloat(amount) > 0) {
      const withdrawAmount = parseFloat(amount);
  
      if (withdrawAmount > this.account.balance) {
        alert('Insufficient funds.');
        return;
      }
  
      // Call the AccountService to update the balance
      this.accountService.withdrawAmount(this.id, withdrawAmount).subscribe(
        (updatedAccount) => {
          this.account = updatedAccount; // Update the local account object
          alert(`Withdrawal successful! New balance: $${updatedAccount.balance.toFixed(2)}`);
        },
        (error) => {
          console.error('Withdrawal failed:', error);
          alert('Failed to withdraw. Please try again.');
        }
      );
    } else {
      alert('Invalid withdraw amount.');
    }
  }
  
  goToAccountList() {
    // Logic for navigation to account
    this.router.navigate(['/account-list']);
  }
}
