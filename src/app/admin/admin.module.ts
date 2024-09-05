import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { PrimengModule } from '../primeng/primeng.module';
import { SharedModule } from '../shared/shared.module';

import { AdminLayoutComponent } from './layout/admin-layout.component';

import { LocationsPageComponent } from './pages/locations-page/locations-page.component';
import { RoomsPageComponent } from './pages/rooms-page/rooms-table.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';

import { AppointmentsTableComponent } from './components/appointments-table/appointments-table.component';
import { HeaderComponent } from './components/header/header.component';
import { TableComponent } from './components/table/table.component';
import { RowComponent } from './components/row/row.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { StatsPageComponent } from './pages/stats-page/stats-page.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    AppointmentsTableComponent,
    HeaderComponent,
    LocationsPageComponent,
    RoomsPageComponent,
    RowComponent,
    TableComponent,
    UsersPageComponent,
    DialogComponent,
    StatsPageComponent,
  ],
  imports: [
    AdminRoutingModule,
    CommonModule,
    FormsModule,
    PrimengModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [AdminLayoutComponent],
})
export class AdminModule {}
