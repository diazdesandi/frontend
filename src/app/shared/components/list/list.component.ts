import { Component, Input } from '@angular/core';
import { Appointment } from '../../../shared/interfaces';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: [
    `
      .no-wrap {
        white-space: nowrap;
      }
    `,
  ],
})
export class ListComponent {
  @Input() appointments: Appointment[] = [];
  @Input() title: string = 'Next Appointments';
  selectedAppointment: Appointment | null = null;

  selectAppointment(appointment: Appointment) {
    this.selectedAppointment = appointment;
  }
}
