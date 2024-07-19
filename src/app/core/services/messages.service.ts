import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, Observable, of, tap } from 'rxjs';
import { MessageModel } from '../models/message.model';
import {
  getMessages,
  getMessagesFailure,
  getMessagesSuccess,
} from '../redux/messages.actions';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  http = inject(HttpClient);
  store = inject(Store);

  getMessagesForConversation(id: string): Observable<any> {
    this.store.dispatch(getMessages({ chatId: id }));
    return this.http.get(`http://localhost:8000/api/conversations/${id}`).pipe(
      tap((res: any) => {
        this.store.dispatch(getMessagesSuccess({ messages: res }));
      }),
      catchError((error) => {
        this.store.dispatch(getMessagesFailure({ error: error.error.message }));
        return of(error);
      })
    );
  }
}
