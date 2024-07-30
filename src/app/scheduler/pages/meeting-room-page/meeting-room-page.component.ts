import { Component } from '@angular/core';
import { MeetingRoom } from '../../../shared/interfaces';
import { SchedulerService } from '../../services';

@Component({
  selector: 'app-meeting-room-page',
  template: `
    <div class="grid flex p-2 gap-2">
      <app-room-card *ngFor="let room of rooms" [data]="room" />
    </div>
  `,
  styles: [],
})
export class MeetingRoomPageComponent {
  rooms: MeetingRoom[] = [
    {
      id: 'e182a014-45bc-4db4-ab18-327ff8c84326',
      name: 'Sala de juntas 3',
      occupancy: 12,
      isActive: true,
      image:
        'https://www.wework.com/ideas/wp-content/uploads/sites/4/2021/08/20201008-199WaterSt-2_v1-scaled.jpg',
      department: 'Desarrollo',
      hasProjector: true,
      hasWhiteboard: false,
      hasScreen: false,
      hasVideoConferencing: true,
      hasSpeakers: true,
      hasWifi: true,
      location: {
        id: '4614effe-cf9c-4e29-8ed9-295b807c59b5',
        name: 'Sede Centro',
        address: 'Av. asdasd Colonia Centro',
        image:
          'https://assets.devx.work/images/external/blog/corporate_office_building/dfl_epitome.jpg',
      },
    },
  ];
  id: string = '';

  constructor(private schedulerService: SchedulerService) {
    this.id = this.schedulerService.selectedLocation().id!;
    this.getRooms(this.id);
  }

  getRooms(id: string): void {
    this.schedulerService.getMeetingRoomsByLocation(id).subscribe((rooms) => {
      this.rooms = rooms;
    });
  }
}
