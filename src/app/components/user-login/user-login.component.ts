import { Component } from '@angular/core';
import { AuthService, LoginCredentials, LoginResponse } from '../../services/auth-service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent {
  loginModel: LoginCredentials = { Username: '', Password: '' };
  errorMessage: string = '';
  loading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Handles the login form submission
   */
  onSubmit(): void {
    this.errorMessage = '';
    this.loading = true;

    this.authService.login(this.loginModel).subscribe({
      next: (response: LoginResponse) => {
        // Save token and redirect
        localStorage.setItem('token', response.token);
        this.router.navigate(['/view']);
      },
      error: (error) => {
        // Show error message
        this.errorMessage = error?.error?.message || 'Login failed. Please try again.';
        console.error('Login error:', error);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}
