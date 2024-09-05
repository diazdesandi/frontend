import { Component, computed, inject, Input } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { MenuItem } from '../../../shared/interfaces';
import { SettingsService } from '../../services';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
})
export class SidebarComponent {
  // private authService = inject(AuthService);
  // public user = computed(() => this.authService.currentUser())

  user = {
    id: '40780b1a-0a49-4c32-82af-f4b6b902b18c',
    email: 'nuevoemail233@test.com',
    name: 'Test 1',
    isActive: true,
    image:
      'https://res.cloudinary.com/dl2gtzbk4/image/upload/v1712742514/msliga8m0yxayzqegzkx.png',
    roles: ['user', 'admin'],
  };

  isAdmin: boolean = false;

  items: MenuItem[] = [
    {
      label: 'MAIN MENU',
      routerLink: '/dashboard',
      icon: '',
      items: [
        {
          label: 'Dashboard',
          icon: 'pi pi-home',
          routerLink: '/dashboard',
        },
        {
          label: 'Inbox',
          icon: 'pi pi-inbox',
          routerLink: '/dashboard/inbox',
        },
        {
          label: 'Scheduler',
          icon: 'pi pi-calendar',
          routerLink: '/scheduler',
        },
        {
          label: 'My profile',
          icon: 'pi pi-user',
          routerLink: `/dashboard/profile/${this.user.id}`,
        },
      ],
    },
    {
      label: 'ADMIN',
      routerLink: '/dashboard',
      icon: '',
      items: [
        {
          label: 'Appointments',
          routerLink: '/admin/appointments',
          icon: 'pi pi-home',
        },
        {
          label: 'Locations',
          routerLink: '/admin/locations',
          icon: 'pi pi-map-marker',
        },
        {
          label: 'Meeting Rooms',
          routerLink: '/admin/meeting-rooms',
          icon: 'pi pi-building',
        },
        {
          label: 'Users',
          routerLink: '/admin/users',
          icon: 'pi pi-users',
        },
        {
          label: 'Stats',
          routerLink: '/admin/stats',
          icon: 'pi pi-chart-bar',
        },
      ],
    },
  ];

  bottomItems: MenuItem[] = [
    // {
    //   label: 'Settings',
    //   icon: 'pi pi-user',
    //   routerLink: '/dashboard/profile/40780b1a-0a49-4c32-82af-f4b6b902b18c',
    // },
    // {
    //   label: 'Logout',
    //   icon: 'pi pi-sign-out',
    //   routerLink: '/auth/login',
    // },
  ];

  constructor(
    private router: Router,
    public settingsService: SettingsService
  ) {}

  ngOnInit() {
    this.checkRole();
  }

  checkRole() {
    // this.isAdmin = this.user()!.roles.includes('admin');
    this.isAdmin = true;

    // if (this.isAdmin) {
    //   this.items.push(...this.adminItems);
    // }
  }

  logout() {
    // this.authService.logout();
    console.log('logout');
  }
}
