import { Component, Input } from '@angular/core';
import { MeetingRoom } from '../../../shared/interfaces';
import { SchedulerService } from '../../services';

interface Attribute {
  label: string;
  value: boolean;
  icon: string;
}

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
})
export class RoomCardComponent {
  @Input() data: MeetingRoom = {} as MeetingRoom;
  attributes: Attribute[] = [];

  constructor(private schedulerService: SchedulerService) {}

  ngAfterViewInit() {
    this.attributes = [
      // { label: 'Whiteboard', value: this.data.hasWhiteboard, icon: '' },
      { label: 'Projector', value: this.data.hasProjector, icon: 'video' },
      { label: 'Screen', value: this.data.hasScreen, icon: 'desktop' },
      { label: 'Speakers', value: this.data.hasSpeakers, icon: 'volume-up' },
      {
        label: 'VideoConferencing',
        value: this.data.hasVideoConferencing,
        icon: 'microphone',
      },
      { label: 'Wi-Fi', value: this.data.hasWifi, icon: 'wifi' },
    ];
  }

  selectRoom(room: MeetingRoom) {
    this.schedulerService.selectedMeetingRoom.update(() => room);
    this.schedulerService.currentStep.update((step) => step + 1);
  }
}
