import { Component } from '@angular/core';
import { environment } from '../environments/environments';

@Component({
  selector: 'app-root',
  template: `
    <div class="p-1">
      <router-outlet />
    </div>

    <!-- <h1 *ngIf="!finishedAuthCheck()">Cargando</h1>

<router-outlet *ngIf="finishedAuthCheck()" /> -->.
  `,
})
export class AppComponent {
  title = 'Scheduler App';

  constructor() {
    console.log('Google Maps Key: ' + environment.GOOGLE_MAPS_API_KEY);
  }
}
