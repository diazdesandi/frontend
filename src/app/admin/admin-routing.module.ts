import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layout/admin-layout.component';
import { AppointmentsTableComponent } from './components/appointments-table/appointments-table.component';
import { LocationsPageComponent } from './pages/locations-page/locations-page.component';
import { RoomsPageComponent } from './pages/rooms-page/rooms-table.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { StatsComponent } from './pages/stats/stats.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'appointments',
        component: AppointmentsTableComponent,
      },
      {
        path: 'locations',
        component: LocationsPageComponent,
      },
      {
        path: 'meeting-rooms',
        component: RoomsPageComponent,
      },
      {
        path: 'users',
        component: UsersPageComponent,
      },
      {
        path: 'stats',
        component: StatsComponent,
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
