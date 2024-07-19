import { createAction, props } from '@ngrx/store';
import { ConversationModel } from '../models/conversation.model';
import { MessageModel } from '../models/message.model';

export const getAllConversations = createAction(
  '[Conversations] GetAll'
);
export const getAllConversationsSuccess = createAction(
  '[Conversations] GetAll Success',
    props<{conversations: ConversationModel[]}>()
);
export const getAllConversationsFailure = createAction(
  '[Conversations] GetAll Failure',
  props<{ error: string }>()
);

export const receiveLastMessage = createAction(
  '[Conversations] Receive',
  props<{ chatId: string; message: MessageModel }>()
);