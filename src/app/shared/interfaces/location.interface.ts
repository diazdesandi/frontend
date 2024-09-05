import { MeetingRoom } from './meeting-room.interface';

export interface SmallLocation {
  id: string;
  name: string;
  image: string;
  address: string;
}

export interface Location extends SmallLocation {
  isActive: boolean;
  department?: string;
  meetingRooms?: MeetingRoom[];
}
