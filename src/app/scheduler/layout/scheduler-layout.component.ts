import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SchedulerService } from '../services';

@Component({
  selector: 'app-scheduler-layout',
  template: `
    <div class="mt-4">
      <app-stepper />
      <ng-container [ngSwitch]="schedulerService.currentStep()">
        <div class="mt-3">
          <div *ngSwitchCase="0">
            <app-location-page />
          </div>
          <div *ngSwitchCase="1">
            <app-meeting-room-page />
          </div>

          <div *ngSwitchCase="2">
            <app-details-page />
          </div>

          <div *ngSwitchCase="3">
            <app-confirmation-page />
          </div>
        </div>
      </ng-container>
    </div>
  `,
  providers: [MessageService],
})
export class SchedulerLayoutComponent {
  constructor(public schedulerService: SchedulerService) {}
}

/*
    <!-- <div class="flex m-2 align-items-center justify-content-between">
  <p-button
    icon="pi pi-arrow-left"
    [disabled]="schedulerService.currentStep() === 0"
    (click)="stepBackward()"
    label="Back"
  >
  </p-button>
  <p-button
    icon="pi pi-arrow-right"
    [disabled]="schedulerService.currentStep() === items!.length - 1"
    (click)="stepForward()"
    label="Next"
  >
  </p-button>
</div> -->
*/
