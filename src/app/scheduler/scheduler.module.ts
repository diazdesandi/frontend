import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PrimengModule } from '../primeng/primeng.module';
import { SchedulerRoutingModule } from './scheduler-routing.module';
import { SharedModule } from '../shared/shared.module';

import { ConfirmationPageComponent } from './pages/confirmation-page/confirmation-page.component';
import { DetailsFormComponent } from './components/details-form/details-form.component';
import { DetailsPageComponent } from './pages/details-page/details-page.component';
import { LocationPageComponent } from './pages/location-page/location-page.component';
import { SchedulerLayoutComponent } from './layout/scheduler-layout.component';
import { WeeklyViewComponent } from './components/weekly-view/weekly-view.component';
import { MeetingRoomPageComponent } from './pages/meeting-room-page/meeting-room-page.component';
import { StepperComponent } from './components/stepper/stepper.component';
import { LocationCardComponent } from './components/location-card/location-card.component';
import { RoomCardComponent } from './components/room-card/room-card.component';

@NgModule({
  declarations: [
    ConfirmationPageComponent,
    DetailsFormComponent,
    DetailsPageComponent,
    LocationPageComponent,
    SchedulerLayoutComponent,
    WeeklyViewComponent,
    MeetingRoomPageComponent,
    StepperComponent,
    LocationCardComponent,
    RoomCardComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    PrimengModule,
    ReactiveFormsModule,
    SchedulerRoutingModule,
    SharedModule,
  ],
  exports: [SchedulerLayoutComponent],
  providers: [DatePipe],
})
export class SchedulerModule {}
