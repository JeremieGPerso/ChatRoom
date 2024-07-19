import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, Observable, of, tap } from 'rxjs';
import {
  getAllMembers,
  getAllMembersFailure,
  getAllMembersSuccess,
} from '../redux/members.actions';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  http = inject(HttpClient);
  store = inject(Store);

  getAllMembers(): Observable<any> {
    this.store.dispatch(getAllMembers());
    return this.http.get('http://localhost:8000/api/members').pipe(
      tap((res: any) => {
        this.store.dispatch(getAllMembersSuccess({ members: res }));
      }),
      catchError((error) => {
        this.store.dispatch(
          getAllMembersFailure({ error: error.error.message })
        );
        return of(error);
      })
    );
  }
}
