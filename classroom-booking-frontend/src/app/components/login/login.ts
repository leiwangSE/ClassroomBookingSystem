import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';  // ← Make sure this is imported
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  username = '';
  password = '';
  showRegister = false;
  error = '';
  success = '';
  loading = false;
  newUser = { username: '', email: '', password: '' };

  constructor(
    private authService: AuthService,
    private router: Router  // ← Make sure this is here
  ) {}

  onSubmit(): void {
    if (!this.username || !this.password) {
      this.error = 'Please enter username and password';
      return;
    }

    this.loading = true;
    this.error = '';
    this.success = '';

    this.authService.login(this.username, this.password).subscribe({
      next: (response: any) => {
        this.loading = false;
        console.log('Login successful:', response);
        // Navigate to dashboard after successful login
        this.router.navigate(['/dashboard']);
      },
      error: (error: any) => {
        this.loading = false;
        this.error = 'Login failed. Please check your credentials.';
        console.error('Login error:', error);
      }
    });
  }

  onRegister(): void {
    if (!this.newUser.username || !this.newUser.email || !this.newUser.password) {
      this.error = 'Please fill in all fields';
      return;
    }

    this.loading = true;
    this.error = '';
    this.success = '';

    this.authService.register(this.newUser.username, this.newUser.email, this.newUser.password)
      .subscribe({
        next: (response: any) => {
          this.loading = false;
          this.success = 'Registration successful! You can now login.';
          this.showRegister = false;
          this.newUser = { username: '', email: '', password: '' };
          console.log('Registration successful:', response);
        },
        error: (error: any) => {
          this.loading = false;
          this.error = 'Registration failed. Username might already exist.';
          console.error('Registration error:', error);
        }
      });
  }
}