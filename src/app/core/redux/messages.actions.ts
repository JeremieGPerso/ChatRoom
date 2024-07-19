import { createAction, props } from '@ngrx/store';
import { MessageModel } from '../models/message.model';

export const getMessages = createAction(
  '[Messages] Get',
  props<{ chatId: string }>()
);
export const getMessagesSuccess = createAction(
  '[Messages] Get Success',
  props<{ messages: MessageModel[] }>()
);
export const getMessagesFailure = createAction(
  '[Messages] Get Failure',
  props<{ error: string }>()
);

export const receiveMessage = createAction(
  '[Messages] Receive',
  props<{ chatId: string, message: MessageModel }>()
);
