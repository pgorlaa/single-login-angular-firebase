import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component'

import { AppRoutes } from './app-routes.enum'

import { AuthGuard } from './services/auth.guard'

const routes: Routes = [
  { path: AppRoutes.LOGIN, component: LoginComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule { }