import { Component, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Notification } from '../../interfaces';
import { NotificationService } from '../../../shared/services';
import { Appointment } from '../../../shared/interfaces';

interface Button {
  label: string;
  severity: string;
  icon: string;
  alwaysShow?: boolean;
  command: (id: string) => void;
}

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
})
export class NotificationComponent {
  @Input() notification: Notification = {} as Notification;
  isShow: boolean = true;
  displayDialog: boolean = false;
  selectedAppointment: Appointment = {} as Appointment;
  items: MenuItem[] = [];

  notificationButtons: Button[] = [
    {
      label: 'Accept',
      severity: 'success',
      icon: 'pi pi-check',
      alwaysShow: false,
      command: (id: string) => this.acceptInvitation(id),
    },
    {
      label: 'Reject',
      severity: 'danger',
      icon: 'pi pi-times',
      alwaysShow: false,
      command: (id: string) => this.rejectInvitation(id),
    },
    {
      label: 'View Details',
      severity: 'primary',
      icon: 'pi pi-eye',
      alwaysShow: true,
      command: (id: string) => this.viewDetails(id),
    },
  ];

  dialogButtons: Button[] = [
    {
      label: 'Accept',
      severity: 'success',
      icon: 'pi pi-check',
      command: (id: string) => this.acceptInvitation(id),
    },
    {
      label: 'Reject',
      icon: 'pi pi-times',
      severity: 'danger',
      command: (id: string) => this.rejectInvitation(id),
    },
  ];

  constructor(private notificationService: NotificationService) {}

  /*
export enum ConfirmationState {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  DECLINED = 'DECLINED',
}
  */

  ngOnInit() {
    this.items = [
      {
        icon: 'pi pi-pencil',
        command: () => {},
      },
      {
        icon: 'pi pi-refresh',
        command: () => {},
      },
      {
        icon: 'pi pi-trash',
        command: () => {},
      },
      {
        icon: 'pi pi-upload',
        routerLink: ['/fileupload'],
      },
      {
        icon: 'pi pi-external-link',
        target: '_blank',
        url: 'http://angular.io',
      },
    ];
  }

  acceptInvitation(id: string): void {
    this.notificationService
      .updateNotification(id, 'READ', 'CONFIRMED')
      .subscribe(() => (this.isShow = false));
  }

  rejectInvitation(id: string): void {
    this.notificationService
      .updateNotification(id, 'READ', 'DECLINED')
      .subscribe(() => (this.isShow = false));
  }

  viewDetails(id: string): void {
    this.notificationService
      .getAppointmentFromNotification(id)
      .subscribe((appointment: Appointment) => {
        this.selectedAppointment = appointment;
        this.displayDialog = true;
      });
  }

  getNotificationColor(status: string): string {
    switch (status) {
      case 'PENDING':
        return '1px solid yellow';
      case 'READ':
        return '2px solid blue';
      case 'DECLINED':
        return '2px solid red';
      default:
        return '2px solid black';
    }
  }
}
