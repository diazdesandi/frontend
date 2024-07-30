import { Component } from '@angular/core';
import { Location } from '../../../shared/interfaces';
import { LocationService } from '../../../shared/services';

@Component({
  selector: 'app-location-page',
  template: `
    <div class="grid gap-3 p-2">
      <app-location-card
        *ngFor="let location of locations"
        [data]="location"
      ></app-location-card>
    </div>
  `,
})
export class LocationPageComponent {
  locations: Location[] = [];

  constructor(private locationService: LocationService) {
    this.getLocations();
  }

  getLocations(): void {
    this.locationService.getAll().subscribe((locations: Location[]) => {
      this.locations = locations;
    });
  }
}
