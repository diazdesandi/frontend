import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of, throwError } from 'rxjs';
import { environment } from '../../../environments/environments';
import { Appointment } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AppointmentsService {
  private readonly baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  private errorHandler(error: any) {
    return throwError(() => error);
  }

  private urlBuilder(path?: string, id?: string) {
    return `${this.baseUrl}/appointments/${path ? path + '/' : ''}${
      id ? id : ''
    }`;
  }

  getAll() {
    return this.http
      .get<Appointment[]>(this.urlBuilder())
      .pipe(catchError(this.errorHandler));
  }

  getByUser(id: string) {
    return this.http
      .get<Appointment[]>(this.urlBuilder('user/next', id))
      .pipe(catchError(this.errorHandler));
  }

  getById(id: string) {
    return this.http
      .get<Appointment>(this.urlBuilder('', id))
      .pipe(catchError(this.errorHandler));
  }

  create(appointment: Appointment) {
    return of({
      message: 'Appointment created successfully',
      ok: true,
      data: appointment,
    });
    // return this.http
    //   .post<AppointmentResponse>(this.urlBuilder(), appointment)
    //   .pipe(catchError(this.errorHandler));
  }

  update(appointment: Appointment) {
    return of({
      message: 'Appointment created successfully',
      ok: true,
      data: appointment,
    });
    // return this.http
    //   .put<AppointmentResponse>(
    //     this.urlBuilder('', appointment.id),
    //     appointment,
    //   )
    //   .pipe(catchError(this.errorHandler));
  }

  delete(id: string) {
    return this.http
      .delete<Response>(this.urlBuilder('', id))
      .pipe(catchError(this.errorHandler));
  }
}
