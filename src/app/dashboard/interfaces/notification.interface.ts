import { Appointment, SmallUser } from '../../shared/interfaces';

export interface Notification {
  id: string;
  message: string;
  type: string;
  status: string;
  user: SmallUser;
  appointment: Appointment;
  createdAt?: string;
  updatedAt?: string;
}
