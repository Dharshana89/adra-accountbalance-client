import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showNavBar = false;

  constructor(private router: Router) {
    
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showNavBar = !['/login', '/'].includes(event.url);
      }
    });
  }


  logout(): void {
    localStorage.removeItem('token'); 
    this.router.navigate(['/login']); 
  }
}
