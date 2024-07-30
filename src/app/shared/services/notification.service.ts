import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { Notification } from '../../dashboard/interfaces';
import { environment } from '../../../environments/environments';
import { Appointment } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  private urlBuilder(path: string) {
    return `${this.baseUrl}/notifications/${path}`;
  }

  private errorHandler(error: any) {
    return throwError(() => error);
  }

  getAllNotifications() {
    return this.http
      .get<Notification[]>(this.urlBuilder(''))
      .pipe(catchError(this.errorHandler));
  }

  getNotifications(id: string) {
    return this.http
      .get<Notification[]>(this.urlBuilder(`user/${id}`))
      .pipe(catchError(this.errorHandler));
  }

  updateNotification(id: string, status: string, confirmation: string) {
    return this.http
      .patch(this.urlBuilder(`${id}`), {
        status,
        confirmation,
      })
      .pipe(catchError(this.errorHandler));
  }

  getAppointmentFromNotification(id: string) {
    return this.http
      .get<Appointment>(this.urlBuilder(`appointment/${id}`))
      .pipe(
        map((appointment) => {
          return appointment;
        }),
        catchError(this.errorHandler),
      );
  }
}
