import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users = [
    { username: 'admin', email: 'admin@test.com', password: 'admin123' }
  ];

  constructor() {}

  login(username: string, password: string): Observable<any> {
    // Simulate API delay
    return new Observable(observer => {
      setTimeout(() => {
        const user = this.users.find(u => u.username === username && u.password === password);
        if (user) {
          const response = { 
            token: 'mock-jwt-token-123', 
            username: user.username,
            userId: 1
          };
          localStorage.setItem('currentUser', JSON.stringify(response));
          observer.next(response);
          observer.complete();
        } else {
          observer.error({ message: 'Invalid credentials' });
        }
      }, 1000); // 1 second delay to simulate network
    });
  }

  register(username: string, email: string, password: string): Observable<any> {
    return new Observable(observer => {
      setTimeout(() => {
        // Check if username already exists
        if (this.users.find(u => u.username === username)) {
          observer.error({ message: 'Username already exists' });
        } else {
          // Add new user
          this.users.push({ username, email, password });
          observer.next({ message: 'User registered successfully' });
          observer.complete();
        }
      }, 1000);
    });
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('currentUser');
  }
}