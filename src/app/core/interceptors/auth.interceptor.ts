import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, Observable, of } from 'rxjs';
import { AuthState } from '../redux/auth.reducer';
import { Router } from '@angular/router';
import { logout } from '../redux/auth.actions';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const store = inject(Store);

  const auth$: Observable<AuthState> = store.select('auth');

  let token;
  auth$.subscribe((auth) => {
    token = auth.token;
  });

  if (!token) {
    return next(req);
  }

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
  });

  const newReq = req.clone({
    headers,
  });

  return next(newReq).pipe(
    catchError((err) => {
      if (err.status === 401) {
        // Handle 401 error
        store.dispatch(logout({ message: 'Session expired. Please login again.' }));
        router.navigateByUrl('/login');
      }
      return of(err);
    })
  );
};
