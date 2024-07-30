import {
  Injectable,
  Signal,
  WritableSignal,
  computed,
  effect,
  signal,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import {
  Appointment,
  MeetingRoom,
  SmallLocation,
  SmallMeetingRoom,
  Person,
  User,
} from '../../shared/interfaces';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class SchedulerService {
  private readonly baseUrl: string = environment.baseUrl;

  currentStep: WritableSignal<number> = signal(0);

  // Remove selectedDay
  selectedDay: WritableSignal<Partial<Date>> = signal('' as any);
  selectedLocation: WritableSignal<Partial<SmallLocation>> = signal({});
  selectedMeetingRoom: WritableSignal<Partial<SmallMeetingRoom>> = signal({});
  selectedStartHour: WritableSignal<Date> = signal('' as any);
  selectedEndHour: Signal<Date> = computed(() => {
    const startHour = this.selectedStartHour();
    if (startHour) {
      const endHour = new Date(startHour.getTime());
      endHour.setHours(endHour.getHours() + 1);
      return endHour;
    }
    return '' as any;
  });

  currentAppointment: Signal<Appointment> = computed(() => {
    const start_hour = this.selectedStartHour();
    const end_hour = this.selectedEndHour();
    return {
      title: '',
      description: '',
      responsible: '',
      invited: [],
      start_hour,
      end_hour,
      meetingRoom: this.selectedMeetingRoom() as SmallMeetingRoom,
      location: this.selectedLocation() as SmallLocation,
      user: {
        id: '40780b1a-0a49-4c32-82af-f4b6b902b18c',
        email: 'nuevoemail233@test.com',
        name: 'Test 1',
        isActive: true,
        image:
          'https://res.cloudinary.com/dl2gtzbk4/image/upload/v1712742514/msliga8m0yxayzqegzkx.png',
        roles: ['user'],
      },
    };
  });

  constructor(private http: HttpClient) {
    effect(() => {
      this.currentStepCheck();
    });
  }

  currentStepCheck() {
    if (!this.selectedLocation) {
      this.currentStep.set(0);
    }
    if (!this.selectedMeetingRoom) {
      this.currentStep.set(1);
    }
    if (!this.selectedStartHour) {
      this.currentStep.set(2);
    }
  }

  private errorHandler(error: any) {
    return throwError(() => error);
  }

  private urlBuilder(path: string, id: string) {
    return `${this.baseUrl}/${path}/${id}`;
  }

  // getMeetingRoomsByLocation(location: Location): Observable<MeetingRoom[]> {
  getMeetingRoomsByLocation(id: string): Observable<MeetingRoom[]> {
    // this.selectedLocation.set(location);
    const url = this.urlBuilder('meeting-rooms/location', id);
    return this.http
      .get<MeetingRoom[]>(url)
      .pipe(catchError(this.errorHandler));
  }

  getRoomAppointments(id: string): Observable<Appointment[]> {
    // this.selectedMeetingRoom.set(meetingRoom);
    const url = this.urlBuilder('appointments/meeting-room', id);
    return this.http.get<Appointment[]>(url).pipe(
      map((appointments: Appointment[]) => {
        return appointments.map((appointment) => ({
          ...appointment,
          start_hour: new Date(appointment.start_hour),
          end_hour: new Date(appointment.end_hour),
        }));
      }),
      catchError(this.errorHandler),
    );
  }

  // Get users for responsible and participants
  getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(this.baseUrl + '/users')
      .pipe(catchError(this.errorHandler));
  }
}
