import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, Routes } from '@angular/router';  // ← Add Routes import
import { AppComponent } from './app/app.component';

const routes: Routes = [  // ← Add type annotation
  { path: '', redirectTo: '/login', pathMatch: 'full' as const },  // ← Fix pathMatch type
  { 
    path: 'login', 
    loadComponent: () => import('./app/components/login/login').then(m => m.LoginComponent)
  },
  { 
    path: 'dashboard', 
    loadComponent: () => import('./app/components/dashboard/dashboard').then(m => m.DashboardComponent)
  },
  { path: '**', redirectTo: '/login' }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes)
  ]
});