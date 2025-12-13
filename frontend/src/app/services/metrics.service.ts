import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, throwError, map, Observable } from 'rxjs';
import { AdminMetricsResponse } from '../interfaces/admin-metrics-response.interface';
import { UserMetricsResponse } from '../interfaces/user-metrics-response.interface';


@Injectable({
  providedIn: 'root'
})
export class MetricsService {

  private URL = 'http://localhost:4000/api/metrics';

  constructor( private http: HttpClient ) {}

  getUserMetrics() {
    return this.http.get<UserMetricsResponse>(`${this.URL}/user`).pipe(
      map( response => response.metrics),
      catchError( this.handleError )
    );
  }

  getAdminMetrics() {
    return this.http.get<AdminMetricsResponse>(`${this.URL}/admin`).pipe(
      map( response => response.metrics),
      catchError( this.handleError )
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Error inesperado';

    if (error.error?.message) {
      errorMessage = `${error.error?.message}: ${error.error?.error}`
    }

    return throwError(() => new Error(errorMessage));
  }

}

