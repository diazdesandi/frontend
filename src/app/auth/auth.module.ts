import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PrimengModule } from '../primeng/primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LayoutComponent } from './layouts/layout.component';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

@NgModule({
  declarations: [LayoutComponent, LoginPageComponent, RegisterPageComponent],
  imports: [
    AuthRoutingModule,
    CommonModule,
    PrimengModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AuthModule {}
