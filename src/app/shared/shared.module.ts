import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PrimengModule } from '../primeng/primeng.module';

import { CalendarComponent } from './components/calendar/calendar.component';
import { DayViewComponent } from './components/day-view/day-view.component';
import { DetailsComponent } from './components/details/details.component';
import { ListComponent } from './components/list/list.component';
import { UserComponent } from './components/user/user.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';

@NgModule({
  declarations: [
    CalendarComponent,
    DayViewComponent,
    DetailsComponent,
    ListComponent,
    UserComponent,
    UserEditComponent,
  ],
  imports: [CommonModule, PrimengModule, FormsModule, ReactiveFormsModule],
  exports: [
    CalendarComponent,
    DayViewComponent,
    DetailsComponent,
    ListComponent,
    UserComponent,
    UserEditComponent,
  ],
})
export class SharedModule {}
