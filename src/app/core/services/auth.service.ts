import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, Observable, of, tap } from 'rxjs';
import {
  login,
  loginFailure,
  loginSuccess,
  logout,
} from '../redux/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  store = inject(Store);

  constructor() {
    const storedUserId = localStorage.getItem('userId');
    const storedToken = localStorage.getItem('token');
    if (storedUserId && storedToken) {
      this.store.dispatch(
        loginSuccess({ userId: storedUserId, token: storedToken })
      );
    }
    // this.store.select('auth').subscribe((auth) => {
    //   if (auth.error) {
    //     console.dir(auth.error);
    //   }
    // });
  }

  login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Observable<any> {
    this.store.dispatch(login({ email, password }));
    return this.http
      .post('http://localhost:8000/api/auth/login', { email, password })
      .pipe(
        tap((res: any) => {
          this.store.dispatch(
            loginSuccess({ userId: res.userId, token: res.token })
          );
          localStorage.setItem('userId', res.userId);
          localStorage.setItem('token', res.token);
        }),
        catchError((error) => {
          this.store.dispatch(loginFailure({ error: error.error.error }));
          return of(error);
        })
      );
  }

  logout() {
    this.store.dispatch(logout({ message: 'Logged out' }));
  }
}
