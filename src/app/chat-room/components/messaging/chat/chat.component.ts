import {
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageComponent } from '../message/message.component';
import { map, Observable } from 'rxjs';
import { MessagesService } from '../../../../core/services/messages.service';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { ReversePipe } from '../../../pipes/reverse.pipe';
import { selectUserId } from '../../../../core/redux/auth.selector';
import { WebSocketService } from '../../../../core/services/web-socket.service';
import { MessagesState } from '../../../../core/redux/messages.reducer';
import { MemberModel } from '../../../../core/models/member.model';
import { FindAvatarPipe } from '../../../pipes/find-avatar.pipe';
import { FindNamePipe } from '../../../pipes/find-name.pipe';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    FormsModule,
    MessageComponent,
    AsyncPipe,
    ReversePipe,
    FindNamePipe,
    FindAvatarPipe,
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent implements OnInit, OnChanges {
  messagesService = inject(MessagesService);
  webSocketService = inject(WebSocketService);
  store = inject(Store);

  userId$ = this.store.select(selectUserId);
  members$: Observable<MemberModel[]> = this.store
    .select('members')
    .pipe(map((members) => members.members));
  messages$: Observable<MessagesState> = this.store.select('messages');

  @Input() public chatId: string = '';

  typedMessage: string = '';

  ngOnInit() {
    this.messagesService.getMessagesForConversation(this.chatId).subscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chatId']) {
      this.messagesService.getMessagesForConversation(this.chatId).subscribe();
    }
  }

  sendMessageHandler = () => {
    console.log('Send message: ' + this.typedMessage);
    this.webSocketService.sendMessage(this.typedMessage, this.chatId);
    this.typedMessage = '';
  };
}
