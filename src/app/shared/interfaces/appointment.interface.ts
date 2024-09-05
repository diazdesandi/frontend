import { SmallMeetingRoom } from './meeting-room.interface';
import { SmallUser } from './user.interface';

export interface Appointment {
  id?: string;
  title: string;
  description: string;
  start_hour: Date;
  end_hour: Date;
  responsible: string;
  meetingRoom?: SmallMeetingRoom;
  user?: SmallUser;
  invited?: Person[];
}

export interface Person {
  user: SmallUser;
  status: ConfirmationStatus;
}

export enum ConfirmationStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  DECLINED = 'DECLINED',
}
