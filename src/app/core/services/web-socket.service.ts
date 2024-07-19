import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUserId } from '../redux/auth.selector';
import { receiveMessage } from '../redux/messages.actions';
import { receiveLastMessage } from '../redux/conversations.actions';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  websocket?: WebSocket;
  store = inject(Store);

  userId: string = '';

  constructor() {
    this.store.select(selectUserId).subscribe((id) => (this.userId = id));
  }

  connect() {
    this.websocket = new WebSocket('ws://localhost:8080?userId=' + this.userId);

    this.websocket.onopen = () => {
      console.log('WebSocket opened');
    };

    this.websocket.onmessage = (message) => {
      console.log('WebSocket message received:', message.data);
      const messageDTO = JSON.parse(message.data);
      this.store.dispatch(
        receiveMessage({
          chatId: messageDTO.chatId,
          message: {
            sender: messageDTO.sender,
            content: messageDTO.content,
            timestamp: messageDTO.timestamp,
          },
        })
      );
      this.store.dispatch(
        receiveLastMessage({
          chatId: messageDTO.chatId,
          message: {
            sender: messageDTO.sender,
            content: messageDTO.content,
            timestamp: messageDTO.timestamp,
          },
        })
      );
    };

    this.websocket.onclose = () => {
      console.log('WebSocket closed');
    };
  }

  sendMessage(message: string, chatId: string) {
    this.websocket?.send(
      JSON.stringify({
        chatId,
        content: message,
        timestamp: new Date().toISOString(),
      })
    );
  }

  close() {
    this.websocket?.close();
  }
}
