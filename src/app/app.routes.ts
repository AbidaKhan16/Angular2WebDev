import { Component, NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';

export const router: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard', component: DashboardComponent },
  {
    path: '', redirectTo: '/login',
    pathMatch: 'full'
  },

];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
