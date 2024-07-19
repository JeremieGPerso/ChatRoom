import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { firstValueFrom, Observable } from 'rxjs';
import { AuthState } from '../redux/auth.reducer';

export const AuthGuard = async () => {
  const router = inject(Router);
  const store = inject(Store);

  const auth$: Observable<AuthState> = store.select('auth');

  const token = (await firstValueFrom(auth$)).token;

  if (!token) {
    router.navigateByUrl('/login');
    return false;
  }
  return true;
};
