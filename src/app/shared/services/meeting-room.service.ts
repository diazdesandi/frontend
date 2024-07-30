import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environments';
import { MeetingRoom, MeetingRoomResponse } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class MeetingRoomService {
  private readonly baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  private errorHandler(error: any) {
    return throwError(() => error);
  }

  private urlBuilder(id?: string) {
    return `${this.baseUrl}/meeting-rooms${id ? '/' + id : ''}`;
  }

  private formDataBuilder(data: MeetingRoom) {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('occupancy', data.occupancy.toString());

    if (data.location) {
      formData.append('location', data.location.toString());
    }

    if (data.department) {
      formData.append('department', data.department);
    }

    if (data.image) {
      formData.append('image', data.image);
    }
    return formData;
  }

  getAll() {
    return this.http.get<MeetingRoom[]>(this.urlBuilder()).pipe(
      tap((data) => console.log(data)),
      catchError(this.errorHandler),
    );
  }

  getById(id: string) {
    return this.http
      .get<MeetingRoom>(this.urlBuilder(id))
      .pipe(catchError(this.errorHandler));
  }

  create(meetingRoom: MeetingRoom) {
    return this.http
      .post<MeetingRoomResponse>(this.urlBuilder(), meetingRoom)
      .pipe(catchError(this.errorHandler));
  }

  update(meetingRoom: MeetingRoom, id: string) {
    return this.http
      .patch<MeetingRoomResponse>(
        this.urlBuilder(id),
        this.formDataBuilder(meetingRoom),
      )
      .pipe(catchError(this.errorHandler));
  }

  delete(id: string) {
    return this.http
      .delete<MeetingRoomResponse>(this.urlBuilder(id))
      .pipe(catchError(this.errorHandler));
  }
}
