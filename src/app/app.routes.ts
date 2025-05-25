import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
    canActivate: [authGuard]
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/auth/login/login.component').then((m) => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/auth/register/register.component').then((m) => m.RegisterComponent)
  },
  {
    path: 'sets/:id',
    loadComponent: () =>
      import('./pages/card-set/card-set.component').then(m => m.CardSetComponent),
    canActivate: [authGuard]
  },
  {
    path: 'study/:id',
    loadComponent: () =>
      import('./pages/study-mode/study-mode.component').then(m => m.StudyModeComponent),
    canActivate: [authGuard]
  }
];