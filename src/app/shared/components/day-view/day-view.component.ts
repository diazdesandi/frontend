import { Component, Input } from '@angular/core';
import { Appointment } from '../../../shared/interfaces';

@Component({
  selector: 'app-day-view',
  templateUrl: './day-view.component.html',
  styles: [
    `
      td {
        width: 250px;
        text-align: left;
        vertical-align: middle;
      }

      .no-appointment {
        height: 80px;
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
export class DayViewComponent {
  @Input() appointments: Appointment[] = [];
  currentDate = new Date();
  currentHour = this.currentDate.getHours();

  // hoursOfDay = Array.from({ length: 4 }, (_, i) => ({
  //   hour: this.currentHour - 2 + i,
  //   minute: 0,
  // }));
  hoursOfDay = Array.from({ length: 18 }, (_, i) => ({
    hour: Math.floor((i + 18) / 2),
    minute: (i % 2) * 30,
  }));
  selectedCell: { day: Date; hour: number; minute: number } | null = null;

  constructor() {
    this.currentDate.setDate(new Date().getDate() - 2);
  }

  ngOnInit() {}

  nextDay(): void {
    this.updateDay(1);
  }

  previousDay(): void {
    this.updateDay(-1);
  }

  updateDay(day: number) {
    this.currentDate.setDate(this.currentDate.getDate() + day);
  }

  getAppointmentForTime(time: { hour: number; minute: number }) {
    const appointmentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
      this.currentDate.getDate(),
      time.hour,
      time.minute,
    );
    return this.appointments.find((appointment) => {
      const appointmentStart = new Date(appointment.start_hour);
      return (
        appointmentStart.getHours() === time.hour &&
        appointmentStart.getMinutes() === time.minute &&
        appointmentStart.getFullYear() === this.currentDate.getFullYear() &&
        appointmentStart.getMonth() === this.currentDate.getMonth() &&
        appointmentStart.getDate() === this.currentDate.getDate()
      );
    });
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }
}
