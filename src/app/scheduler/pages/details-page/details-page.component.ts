import { Component } from '@angular/core';
import { Appointment } from '../../../shared/interfaces';
import { SchedulerService } from '../../services';

@Component({
  selector: 'app-details-page',
  template: `
    <div class="grid">
      <div class="col-8">
        <app-weekly-view [appointments]="appointments" />
      </div>
      <div class="col-4">
        <app-details-form />
      </div>
    </div>
  `,
})
export class DetailsPageComponent {
  appointments: Appointment[] = [];
  id: string = '';

  constructor(private schedulerService: SchedulerService) {
    this.id = this.schedulerService.selectedMeetingRoom().id!;
    this.getAppointements(this.id);
  }

  getAppointements(id: string) {
    this.schedulerService.getRoomAppointments(id).subscribe((appointments) => {
      this.appointments = appointments;
    });
  }
}
