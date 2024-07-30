import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap, throwError } from 'rxjs';
import { User } from '../interfaces';
import { environment } from '../../../environments/environments';
import { UserAppointment } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  private errorHandler(error: any) {
    return throwError(() => error);
  }

  private urlBuilder(path?: string, id?: string) {
    return `${this.baseUrl}/users/${path ? path + '/' : ''}${id ? id : ''}`;
  }

  private formDataBuilder(data: User) {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    if (data.image) {
      formData.append('image', data.image);
    }

    // Password reset
    // if (data.password) {
    //   formData.append('password', data.password);
    // }

    return formData;
  }

  getAll(): Observable<User[]> {
    return this.http
      .get<User[]>(this.urlBuilder())
      .pipe(catchError(this.errorHandler));
  }

  getAppointmentsByUser() {
    return this.http
      .get<UserAppointment[]>(this.urlBuilder('appointments'))
      .pipe(catchError(this.errorHandler));
  }

  getById(id: string) {
    return this.http
      .get<User>(this.urlBuilder('', id))
      .pipe(catchError(this.errorHandler));
  }

  create(user: User) {
    return this.http
      .post<User>(this.urlBuilder(), { ...user })
      .pipe(catchError(this.errorHandler));
  }

  update(user: User, id: string) {
    return this.http
      .patch<User>(this.urlBuilder('', id), this.formDataBuilder(user))
      .pipe(catchError(this.errorHandler));
  }

  delete(id: string) {
    return this.http
      .delete(this.urlBuilder('', id))
      .pipe(catchError(this.errorHandler));
  }
}
