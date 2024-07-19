import { Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { AuthGuard } from './core/guard/auth.guard';
import { ConversationListComponent } from './chat-room/components/conversations/conversation-list/conversation-list.component';

export const routes: Routes = [
  {
    path: '',
    component: ConversationListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'conversations',
    component: ConversationListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'conversations/:chatId',
    component: ConversationListComponent,
    canActivate: [AuthGuard],
  },
];
