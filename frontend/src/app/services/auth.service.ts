import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, throwError, map, Observable } from 'rxjs';
import { MeResponse } from '../interfaces/me-response.interface';
import { User } from '../interfaces/user.interface';
import { routes } from '../app.routes';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private URL = 'http://localhost:4000/api/auth';

  constructor( private http: HttpClient, private router: Router ) {}

  login( email: string, password: string ) {
    return this.http.post<any>(`${this.URL}/login`, {
      email, password
    }).pipe(
      tap(response => {
        localStorage.setItem('token', response.token)
      }),
      catchError(this.handleError)
    );
  }

  register( name: string, email: string, password: string) {
    return this.http.post<any>(`${this.URL}/register`, {
      name, email, password
    }).pipe(
      catchError(this.handleError)
    );
  }

  me() {
    return this.http.get<MeResponse>(`${this.URL}/me`)
      .pipe(
        map(response => response.user[0]),
        catchError(this.handleError)
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login'])
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unexpected error';

    if (error.error?.message) {
      errorMessage = `${error.error?.message}: ${error.error?.error}`
    }

    return throwError(() => new Error(errorMessage));
  }

}

