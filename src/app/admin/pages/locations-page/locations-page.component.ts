import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LocationService } from '../../../shared/services';
import { Location } from '../../../shared/interfaces';
import { Header, TableConfig } from '../../interfaces';
import { locationFields } from '../../../shared/forms/location';

@Component({
  selector: 'app-locations-page',
  template: ` <app-table [config]="config"></app-table> `,
})
export class LocationsPageComponent {
  locations: Location[] = [];
  config: TableConfig<Location> = {} as TableConfig<Location>;

  constructor(
    private locationService: LocationService,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.componentInit();
  }

  componentInit() {
    this.locationService.getAll().subscribe((locations) => {
      this.locations = locations;
      this.config = this.createTableConfig();
    });
  }

  createTableConfig(): TableConfig<Location> {
    const form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      address: ['', [Validators.required, Validators.minLength(10)]],
      department: ['', [Validators.minLength(5)]],
    });

    return {
      form,
      fields: locationFields,
      header: this.getHeader(),
      actions: this.getActions(),
      columns: this.getColumns(),
      data: this.locations,
    };
  }

  getHeader(): Header {
    return {
      title: 'Locations',
      icon: 'pi pi-map-marker',
      length: this.locations.length,
      showButton: true,
    };
  }

  getActions() {
    return {
      create: (data: Location) => this.locationService.create(data),
      update: (data: Location, id: string) =>
        this.locationService.update(data, id),
      delete: (id: string) => this.locationService.delete(id),
      onUpload: (event: any) => {
        // handle file upload here
      },
    };
  }

  getColumns() {
    return [
      { field: 'name', header: 'Name' },
      { field: 'address', header: 'Address' },
      { field: 'department', header: 'Department' },
    ];
  }
}
