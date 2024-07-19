import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConversationModel } from '../../../../core/models/conversation.model';
import { ElapsedTimePipe } from '../../../pipes/elapsed-time.pipe';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-conversation-list-item',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ElapsedTimePipe],
  templateUrl: './conversation-list-item.component.html',
  styleUrl: './conversation-list-item.component.scss',
})
export class ConversationListItemComponent {
  @Input() public conversation?: ConversationModel;
  @Input() public name?: string;
  @Input() public avatarUrl?: string;
}
