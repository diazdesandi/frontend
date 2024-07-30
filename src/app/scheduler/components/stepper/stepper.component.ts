import { Component } from '@angular/core';
import { SchedulerService } from '../../services';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-stepper',
  template: `
    <p-toast></p-toast>
    <div class="py-3 surface-card shadow-3 border-round">
      <p-steps
        [model]="steps"
        [readonly]="false"
        [activeIndex]="schedulerService.currentStep()"
        (activeIndexChange)="onActiveIndexChange($event)"
      ></p-steps>
    </div>
  `,
  providers: [MessageService],
})
export class StepperComponent {
  steps = [
    { step: 'First Step', label: 'Location', command: () => {} },
    { step: 'Second Step', label: 'Meeting Room', command: () => {} },
    { step: 'Third Step', label: 'Date & Details', command: () => {} },
    { step: 'Last Step', label: 'Confirmation', command: () => {} },
  ];

  constructor(
    private messageService: MessageService,
    public schedulerService: SchedulerService,
  ) {}

  onActiveIndexChange(step: number) {
    const currentStep = this.schedulerService.currentStep();
    if (step > currentStep) {
      this.stepForward();
    } else {
      this.schedulerService.currentStep.update(() => step);
    }
  }

  stepForward() {
    if (this.stepValidation()) {
      this.schedulerService.currentStep.update((step) => step + 1);
    }
  }

  stepBackward() {
    const step = this.schedulerService.currentStep();
    if (step > 0) {
      switch (step) {
        case 1:
          this.schedulerService.selectedLocation.update(() => ({}));
          break;
        case 2:
          this.schedulerService.selectedMeetingRoom.update(() => ({}));
          break;
        case 3:
          this.schedulerService.selectedStartHour.update(() => '' as any);
          this.schedulerService.currentAppointment().description = '';
          this.schedulerService.currentAppointment().title = '';
          this.schedulerService.currentAppointment().responsible = '';
          break;
        default:
          break;
      }
      this.schedulerService.currentStep.update((step) => step - 1);
    }
  }

  private stepValidation(): boolean {
    const step = this.schedulerService.currentStep();
    switch (step) {
      case 0:
        if (this.schedulerService.selectedLocation() === null) {
          this.showMessages('warn', 'Warning', 'Please select a location');
          return false;
        }
        break;
      case 1:
        if (this.schedulerService.selectedMeetingRoom() === null) {
          this.showMessages('warn', 'Warning', 'Please select a room');
          return false;
        }
        break;
      case 2:
        if (this.schedulerService.currentAppointment().title === null) {
          this.showMessages(
            'warn',
            'Warning',
            'Please fill in the details before proceeding',
          );
          return false;
        }
        break;
    }
    return true;
  }

  showMessages(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity,
      summary,
      detail,
    });
  }
}
