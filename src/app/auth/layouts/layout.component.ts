import { Component, inject } from '@angular/core';
import { SettingsService } from '../../layout/services/settings.service';

@Component({
  // templateUrl: './auth-layout.component.html',
  template: `
    <p-toggleButton
      [ngModel]="settingsService.darkMode"
      [onIcon]="'pi pi-sun'"
      [offIcon]="'pi pi-moon'"
      (onChange)="settingsService.setTheme()"
    ></p-toggleButton>
    <router-outlet></router-outlet>
  `,
})
export class LayoutComponent {
  public settingsService = inject(SettingsService);
}
