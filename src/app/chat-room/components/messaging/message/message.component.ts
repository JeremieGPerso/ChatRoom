import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MessageModel } from '../../../../core/models/message.model';
import { ElapsedTimePipe } from '../../../pipes/elapsed-time.pipe';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [NgClass, ElapsedTimePipe],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent {

  @Input() message?: MessageModel;
  @Input() name?: string;
  @Input() avatarUrl?: string;
  @Input() flipped: boolean = false;
}
