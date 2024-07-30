import { Component, Input } from '@angular/core';
import { Appointment } from '../../../shared/interfaces';
import { SchedulerService } from '../../services';

@Component({
  selector: 'app-weekly-view',
  templateUrl: './weekly-view.component.html',
  styles: [
    `
      td {
        width: 150px;
        height: 130px;
        text-align: left;
        vertical-align: middle;
        border-radius: 10px;
      }

      .time {
        width: 50px;
      }

      .selected {
        background-color: green;
      }
    `,
  ],
})
export class WeeklyViewComponent {
  @Input() appointments: Appointment[] = [];
  currentDate = new Date();
  hoursOfDay = Array.from({ length: 18 }, (_, i) => ({
    hour: Math.floor((i + 18) / 2),
    minute: (i % 2) * 30,
  }));
  selectedCell: { day: Date; hour: number; minute: number } | null = null;
  weekDays: Date[] = [];

  constructor(private schedulerService: SchedulerService) {}

  ngOnInit() {
    this.updateWeek();
  }

  getWeekStart(): Date {
    const date = new Date(this.currentDate);
    const day = date.getDay();
    const diff = date.getDate() - day + (day == 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  }

  // Métodos para navegar por las semanas
  nextWeek(): void {
    this.changeWeek(7);
  }

  previousWeek(): void {
    this.changeWeek(-7);
  }

  private changeWeek(days: number): void {
    this.currentDate.setDate(this.currentDate.getDate() + days);
    this.updateWeek();
  }

  private updateWeek(): void {
    const startOfWeek = this.getWeekStart();
    this.weekDays = Array.from({ length: 6 }, (_, i) => {
      let date = new Date(startOfWeek);
      date.setDate(date.getDate() + i);
      return date;
    });
  }

  getAppointmentForTime(time: Time, day: number): Appointment {
    const date = new Date(this.weekDays[day]);
    date.setHours(time.hour, time.minute);
    const hourTime = date.getTime();
    return (
      (this.appointments.find(
        (appointment) =>
          hourTime >= appointment.start_hour.getTime() &&
          hourTime < appointment.end_hour.getTime(),
      ) as Appointment) || null
    );
  }

  newAppointment(day: Date, time: Time) {
    this.selectedCell = { day, hour: time.hour, minute: time.minute };
    const date = new Date(day);
    date.setHours(time.hour, time.minute, 0, 0);
    this.schedulerService.selectedStartHour.set(date);
  }

  isSelectedCell(day: Date, time: Time): boolean {
    return (
      this.selectedCell?.day.getTime() === new Date(day).getTime() &&
      this.selectedCell?.hour === time.hour &&
      this.selectedCell?.minute === time.minute
    );
  }
}

interface Time {
  hour: number;
  minute: number;
}
