import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    HttpClientModule,
    FormsModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = '';
  isVisible: boolean = false;
  username: string = '';
  constructor(private router: Router) {}

  ngOnInit(): void {
    // Listen for route changes
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Check the current route and update isVisible
        const loginId = localStorage.getItem('loginId');
        this.isVisible = loginId !== null && Number(loginId) > 0 ? true : false;
        this.username = localStorage.getItem('username') || '';
      }
    });
  }
  
  logout() {
    localStorage.setItem('loginId', '0')
    this.router.navigate(['/login-signup'])
  }
}