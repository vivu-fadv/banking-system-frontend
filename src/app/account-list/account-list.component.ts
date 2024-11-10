import { Component, OnInit } from '@angular/core';
import { Account } from '../account';

@Component({
  selector: 'app-account-list',
  standalone: true,
  imports: [],
  templateUrl: './account-list.component.html',
  styleUrl: './account-list.component.css'
})
export class AccountListComponent implements OnInit{
    accounts!: Account[];

    constructor() {}

    ngOnInit():void{
      
        this.accounts = [{
          "id": 1,
          "firstName" : "Vinh",
          "lastName" : "Vu",
          "email" : "vinh.vu@example.com"
        },
        {
          "id": 2,
          "firstName" : "John",
          "lastName" : "Doe",
          "email" : "john.doe@example.com"
        }];
    }
}
