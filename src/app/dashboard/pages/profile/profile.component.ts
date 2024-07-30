import { Component, Input } from '@angular/core';
import { User } from '../../../shared/interfaces';

@Component({
  selector: 'app-profile',
  template: `
    <app-user-edit [user]="user" [title]="'Profile'"></app-user-edit>
  `,
})
export class ProfileComponent {
  user = {
    id: '40780b1a-0a49-4c32-82af-f4b6b902b18c',
    email: 'nuevoemail233@test.com',
    name: 'Test 1',
    isActive: true,
    image:
      'https://res.cloudinary.com/dl2gtzbk4/image/upload/v1712742514/msliga8m0yxayzqegzkx.png',
    roles: ['user', 'admin'],
  };
}
