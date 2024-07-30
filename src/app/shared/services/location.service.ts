import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environments';
import { Location, LocationResponse } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private readonly baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  private errorHandler(error: any) {
    return throwError(() => error);
  }

  private urlBuilder(id?: string) {
    return `${this.baseUrl}/locations${id ? '/' + id : ''}`;
  }

  private formDataBuilder(data: Location) {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('address', data.address);

    if (data.image) {
      formData.append('image', data.image);
    }

    if (data.department) {
      formData.append('department', data.department);
    }

    return formData;
  }

  getAll() {
    return this.http
      .get<Location[]>(this.urlBuilder())
      .pipe(catchError(this.errorHandler));
  }

  create(location: Location) {
    return this.http
      .post<LocationResponse>(this.urlBuilder(), { ...location })
      .pipe(catchError(this.errorHandler));
  }

  update(location: Location, id: string) {
    return this.http
      .patch<LocationResponse>(
        this.urlBuilder(id),
        this.formDataBuilder(location),
      )
      .pipe(catchError(this.errorHandler));
  }

  delete(id: string) {
    return this.http
      .delete<LocationResponse>(this.urlBuilder(id))
      .pipe(catchError(this.errorHandler));
  }
}
