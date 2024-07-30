import { Component, effect } from '@angular/core';
import { formatDate } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SchedulerService } from '../../services';
import { appointmentFields } from '../../../shared/forms';
import { ConfirmationStatus, Person, User } from '../../../shared/interfaces';

@Component({
  selector: 'app-details-form',
  templateUrl: './details-form.component.html',
})
export class DetailsFormComponent {
  appointmentForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    responsible: ['', Validators.required],
    start_hour: [{ value: '', disabled: true }, Validators.required],
    end_hour: [{ value: '', disabled: true }, Validators.required],
    location: [{ value: '', disabled: true }, Validators.required],
    meetingRoom: [{ value: '', disabled: true }, Validators.required],
    invitees: [[], Validators.required],
  });
  fields = appointmentFields;

  users: User[] = [];
  selectedUsers: User[] = [];

  constructor(
    private fb: FormBuilder,
    private schedulerService: SchedulerService,
  ) {
    this.getSignals();
    this.getUsers();
  }

  onSubmit() {
    this.schedulerService.currentAppointment().title =
      this.appointmentForm.value.title;
    this.schedulerService.currentAppointment().description =
      this.appointmentForm.value.description;
    this.schedulerService.currentAppointment().responsible =
      this.appointmentForm.value.responsible;
    (this.schedulerService.currentAppointment().invited = [
      ...this.selectedUsers.map(
        (invitee) =>
          ({
            user: invitee,
            status: ConfirmationStatus.PENDING,
          }) satisfies Person,
      ),
    ]),
      this.schedulerService.currentStep.update((step) => step + 1);
  }

  onReset() {
    this.appointmentForm.controls['title'].reset();
    this.appointmentForm.controls['description'].reset();
    this.appointmentForm.controls['responsible'].reset();
  }

  onCancel() {
    this.schedulerService.currentStep.update((step) => step - 1);
  }

  getUsers() {
    this.schedulerService.getUsers().subscribe((users) => (this.users = users));
  }

  getSignals() {
    effect(() => {
      const startHour = this.schedulerService.selectedStartHour();
      const endHour = this.schedulerService.selectedEndHour();
      const location = this.schedulerService.selectedLocation().name;
      const meetingRoom = this.schedulerService.selectedMeetingRoom().name;

      const formatHour = (hour: Date | null) =>
        hour ? formatDate(hour, 'EE HH:mm MMMM dd yyyy', 'en-US') : '';

      this.appointmentForm.patchValue({
        start_hour: formatHour(startHour),
        end_hour: formatHour(endHour),
        location,
        meetingRoom,
      });
    });
  }
}
