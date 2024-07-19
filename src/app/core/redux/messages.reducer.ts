import { createReducer, on } from '@ngrx/store';
import { getMessages, getMessagesSuccess, getMessagesFailure, receiveMessage } from './messages.actions';
import { MessageModel } from '../models/message.model';

export interface MessagesState {
  chatId: string;
  messages: MessageModel[];
  isLoading: boolean;
  error: string;
};

export const initialState: MessagesState = {
  chatId: '',
  messages: [],
  isLoading: false,
  error: '',
};

export const messagesReducer = createReducer(
  initialState,
  on(getMessages, (state, { chatId }) => ({
    ...state,
    chatId: chatId,
    isLoading: true,
    error: '',
  })),
  on(getMessagesSuccess, (state, { messages }) => ({
    ...state,
    messages,
    isLoading: false,
  })),
  on(getMessagesFailure, (state, { error }) => ({
    ...state,
    messages: [],
    isLoading: false,
    error,
  })),
  on(receiveMessage, (state, { chatId, message }) => (
    state.chatId === chatId ?
      {
        ...state,
        messages: [
          ...state.messages,
          message,
        ],
      }
      :
      state)),
);
