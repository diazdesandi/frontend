import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrimengModule } from '../primeng/primeng.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';

import { DashboardLayoutComponent } from './layout/layout.component';
import { NotificationComponent } from './components/notification/notification.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { HomeComponent } from './pages/home/home.component';
import { InboxComponent } from './pages/inbox/inbox.component';

@NgModule({
  declarations: [
    DashboardLayoutComponent,
    NotificationComponent,
    ProfileComponent,
    HomeComponent,
    InboxComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    PrimengModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
  ],
  providers: [DatePipe],
})
export class DashboardModule {}
