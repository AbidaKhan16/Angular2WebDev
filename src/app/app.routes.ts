import { Component, NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import {AuthGuard} from './_guards/auth-guard';

export const router: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]
  },
  {
    path: '', redirectTo: '/dashboard',
    pathMatch: 'full', canActivate: [AuthGuard]
  },
  {
    path: '**', redirectTo: '/dashboard',
    pathMatch: 'full', canActivate: [AuthGuard]
  }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
