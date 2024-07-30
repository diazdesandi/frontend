import { Component } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { Appointment } from '../../shared/interfaces';

@Component({
  selector: 'app-dashboard-layout',
  template: `
    <div class="grid mt-3">
      <div class="col">
        <router-outlet></router-outlet>
      </div>
      <div class="col-fixed flex flex-column  gap-2">
        <app-calendar class="mb-3" [appointments]="appointments" />
        <app-day-view *ngIf="appointments" [appointments]="appointments" />
      </div>
    </div>
  `,
})
export class DashboardLayoutComponent {
  appointments: Appointment[] = [];
  // private authService = inject(AuthService);
  // public user = computed(() => this.authService.currentUser())

  // logout() {
  //   this.authService.logout();
  // }

  user = {
    id: '40780b1a-0a49-4c32-82af-f4b6b902b18c',
    email: 'nuevoemail233@test.com',
    name: 'Test 1',
    isActive: true,
    image:
      'https://res.cloudinary.com/dl2gtzbk4/image/upload/v1712742514/msliga8m0yxayzqegzkx.png',
    roles: ['user'],
  };
}
