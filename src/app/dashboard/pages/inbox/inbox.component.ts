import { Component } from '@angular/core';
import { NotificationService } from '../../../shared/services';
import { Notification } from '../../interfaces';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styles: [],
})
export class InboxComponent {
  notifications: Notification[] = [];
  id = '1';

  constructor(private notificationService: NotificationService) {
    this.notificationService
      .getAllNotifications()
      .subscribe((notifications: Notification[]) => {
        this.notifications = notifications;
      });
  }
}
