import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AccountListComponent } from './account-list/account-list.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AccountListComponent,
    HttpClientModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'banking-system-frontend';
}
