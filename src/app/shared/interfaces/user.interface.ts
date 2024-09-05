import { Appointment } from '.';

export interface SmallUser {
  id: string;
  name: string;
  image: string;
  email: string;
}

export interface User extends SmallUser {
  isActive: boolean;
  roles: string[];
  password?: string;
}

export interface UserAppointment extends User {
  appointments: Appointment[];
}
