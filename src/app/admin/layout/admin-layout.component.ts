import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  template: `
    <div class="mt-4">
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AdminLayoutComponent {}
