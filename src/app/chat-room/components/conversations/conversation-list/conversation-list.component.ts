import { AsyncPipe } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { ConversationsService } from '../../../../core/services/conversations.service';
import { ConversationListItemComponent } from '../conversation-list-item/conversation-list-item.component';
import { map, Observable } from 'rxjs';
import { ConversationModel } from '../../../../core/models/conversation.model';
import { Store } from '@ngrx/store';
import { ChatComponent } from '../../messaging/chat/chat.component';
import { WebSocketService } from '../../../../core/services/web-socket.service';
import { MembersService } from '../../../../core/services/members.service';
import { MemberModel } from '../../../../core/models/member.model';
import { FindAvatarPipe } from '../../../pipes/find-avatar.pipe';
import { FindNamePipe } from '../../../pipes/find-name.pipe';

@Component({
  selector: 'app-conversation-list',
  standalone: true,
  imports: [
    ConversationListItemComponent,
    ChatComponent,
    AsyncPipe,
    FindNamePipe,
    FindAvatarPipe,
  ],
  templateUrl: './conversation-list.component.html',
  styleUrl: './conversation-list.component.scss',
})
export class ConversationListComponent implements OnInit {
  membersService = inject(MembersService);
  conversationsService = inject(ConversationsService);
  webSocketService = inject(WebSocketService);
  store = inject(Store);

  members$: Observable<MemberModel[]> = this.store
    .select('members')
    .pipe(map((members) => members.members));
  conversations$: Observable<ConversationModel[]> = this.store
    .select('conversations')
    .pipe(map((conversations) => conversations.conversations));

  @Input() chatId: string = '';

  ngOnInit() {
    this.membersService.getAllMembers().subscribe();
    this.conversationsService.getAllConversations().subscribe();
  }
}
