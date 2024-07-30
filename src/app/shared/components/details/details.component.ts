import { Component, Input } from '@angular/core';
import {
  Appointment,
  ConfirmationStatus,
  SmallUser,
  User,
} from '../../interfaces';
import { OverlayPanel } from 'primeng/overlaypanel';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
})
export class DetailsComponent {
  @Input() appointment: Appointment = {} as Appointment;
  @Input() title: boolean = true;
  @Input() showStatus: boolean = false;

  userDetails: SmallUser = {} as SmallUser;
  showDetails: boolean = false;

  getAppointmentStatusColor(status: string): string {
    switch (status) {
      case ConfirmationStatus.PENDING:
        return 'var(--bluegray-600)';
      case ConfirmationStatus.DECLINED:
        return 'var(--red-600)';
      case ConfirmationStatus.CONFIRMED:
        return 'var(--green-600)';
      default:
        return 'var(--primary-color)';
    }
  }

  viewProfile(user: SmallUser, event: MouseEvent, op: OverlayPanel) {
    this.userDetails = user;
    op.toggle(event);
  }
}
