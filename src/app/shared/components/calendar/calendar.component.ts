import { Component, Input, effect } from '@angular/core';
import { Appointment, DayOfWeek, Hour } from '../../interfaces';
import { SchedulerService } from '../../../scheduler/services';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
})
export class CalendarComponent {
  @Input() appointments: Appointment[] = [];
  @Input() isForDashboard: boolean = false;

  minDate: Date | undefined;
  maxDate: Date | undefined;
  readonly disabledDates = [];
  readonly disabledDays = [0, 6];
  readonly firstDayOfWeek = DayOfWeek.Monday;
  readonly yearRange = '2024:2024';
  readonly weekView = [1, 2, 3, 4, 5];

  selectedDate = new Date();

  constructor(private schedulerService: SchedulerService) {}

  ngOnInit() {
    this.disabledOptions();
  }

  disabledOptions() {
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let nextMonth = month === 11 ? 0 : month + 1;
    let nextYear = nextMonth === 0 ? year + 1 : year;
    this.minDate = new Date();
    this.maxDate = new Date();
    this.maxDate.setMonth(nextMonth);
    this.maxDate.setFullYear(nextYear);
  }

  // onDateSelect(event: Date) {
  //   if (!this.isForDashboard) {
  //     this.schedulerService.selectedDay.update(() => event);
  //   }
  // }
}
