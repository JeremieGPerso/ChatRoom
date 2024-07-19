import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, Observable, of, tap } from 'rxjs';
import {
  getAllConversations,
  getAllConversationsFailure,
  getAllConversationsSuccess,
} from '../redux/conversations.actions';

@Injectable({
  providedIn: 'root',
})
export class ConversationsService {
  http = inject(HttpClient);
  store = inject(Store);

  getAllConversations(): Observable<any> {
    this.store.dispatch(getAllConversations());
    return this.http.get('http://localhost:8000/api/conversations').pipe(
      tap((res: any) => {
        this.store.dispatch(getAllConversationsSuccess({ conversations: res }));
      }),
      catchError((error) => {
        this.store.dispatch(
          getAllConversationsFailure({ error: error.error.message })
        );
        return of(error);
      })
    );
  }
}
