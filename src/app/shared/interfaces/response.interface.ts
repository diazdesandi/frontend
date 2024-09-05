import { Location } from './location.interface';
import { MeetingRoom } from './meeting-room.interface';
import { User } from './user.interface';

interface Response {
  message: string | string[];
}

export interface AppointmentResponse extends Response {
  ok: boolean;
}

export interface LocationResponse extends Response {
  location: Location;
}

export interface MeetingRoomResponse extends Response {
  meetingRoom: MeetingRoom;
}

export interface UserResponse extends Response {
  user: User;
}

// Error
export interface ErrorResponse extends Response {
  statusCode: number;
  error: string;
}
