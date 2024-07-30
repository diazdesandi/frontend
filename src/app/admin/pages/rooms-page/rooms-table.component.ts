import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LocationService, MeetingRoomService } from '../../../shared/services';
import { MeetingRoom, SmallLocation } from '../../../shared/interfaces';
import { TableConfig } from '../../interfaces';
import { meetingRoomFields } from '../../../shared/forms';

@Component({
  selector: 'app-rooms-page',
  template: ` <app-table [config]="config"></app-table> `,
})
export class RoomsPageComponent {
  meetingRooms: MeetingRoom[] = [];
  locations: SmallLocation[] = [];
  config: TableConfig<MeetingRoom> = {} as TableConfig<MeetingRoom>;

  amenities = [
    {
      id: 'wifi',
      name: 'Wi-Fi',
      icon: 'pi-wifi',
    },
    {
      id: 'screen',
      name: 'Screen',
      icon: 'pi-desktop',
    },
    {
      id: 'camera',
      name: 'Camera',
      icon: 'pi-camera',
    },
    {
      id: 'microphone',
      name: 'Microphone',
      icon: 'pi-microphone',
    },
    {
      id: 'phone',
      name: 'Phone',
      icon: 'pi-phone',
    },
    {
      id: 'video',
      name: 'Video',
      icon: 'pi-video',
    },
    {
      id: 'speaker',
      name: 'Speaker',
      icon: 'pi-volume-up',
    },
  ];

  constructor(
    private locationService: LocationService,
    private meetingRoomService: MeetingRoomService,
    private fb: FormBuilder,
  ) {
    this.getLocations();
  }

  ngOnInit(): void {
    this.meetingRoomService.getAll().subscribe({
      next: (rooms) => {
        this.meetingRooms = rooms;

        this.config = this.createTableConfig();
      },
      error: (error) => {
        console.error('Error fetching meeting rooms:', error);
      },
    });
  }

  createTableConfig(): TableConfig<MeetingRoom> {
    const form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      occupancy: [
        0,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      location: ['', [Validators.required]],
      department: ['', [Validators.minLength(5)]],
      amenities: ['', [Validators.required]],
    });

    return {
      form,
      fields: this.getFields(),
      header: this.getHeader(),
      actions: this.getActions(),
      columns: this.getColumns(),
      data: this.meetingRooms,
    };
  }

  getFields() {
    const fields = [...meetingRoomFields];
    fields[2] = { ...fields[2], options: this.locations };
    fields[4] = { ...fields[4], options: this.amenities };

    return fields;
  }

  getHeader() {
    return {
      title: 'Meeting Rooms',
      icon: 'pi pi-briefcase',
      length: this.meetingRooms.length,
      showButton: true,
    };
  }

  getActions() {
    return {
      create: (room: MeetingRoom) => this.meetingRoomService.create(room),
      update: (room: MeetingRoom, id: string) =>
        this.meetingRoomService.update(room, id),
      delete: (id: string) => this.meetingRoomService.delete(id),
    };
  }

  getColumns() {
    return [
      { field: 'name', header: 'Name' },
      { field: 'occupancy', header: 'Occupancy' },
      { field: 'location', header: 'Location' },
      { field: 'department', header: 'Department' },
      { field: 'ammenities', header: 'Ammenities' },
    ];
  }

  getLocations() {
    this.locationService.getAll().subscribe({
      next: (locations) => {
        this.locations = locations.map((location: SmallLocation) => {
          return {
            id: location.id,
            name: location.name,
            image: location.image,
            address: location.address,
          };
        });
      },
      error: (error) => {
        console.error('Error fetching locations:', error);
      },
    });
  }
}
