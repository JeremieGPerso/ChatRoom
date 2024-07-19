import { createReducer, on } from '@ngrx/store';
import { getAllConversations, getAllConversationsSuccess, getAllConversationsFailure, receiveLastMessage } from './conversations.actions';
import { ConversationModel } from '../models/conversation.model';

export interface ConversationsState {
    conversations: ConversationModel[];
    isLoading: boolean;
    error: string;
};

export const initialState: ConversationsState = {
  conversations: [],
  isLoading: false,
  error: '',
};

export const conversationsReducer = createReducer(
  initialState,
  on(getAllConversations, (state) => ({
    ...state,
    isLoading: true,
    error: '',
  })),
  on(getAllConversationsSuccess, (state, { conversations }) => ({
    ...state,
    conversations,
    isLoading: false,
  })),
  on(getAllConversationsFailure, (state, { error }) => ({
    ...state,
    conversations: [],
    isLoading: false,
    error,
  })),
  on(receiveLastMessage, (state, { chatId, message }) => {
    const conversations = state.conversations.map(conversation => {
      if (conversation.id === chatId) {
        return {
          ...conversation,
          lastMessage: message,
        };
      }
      return conversation;
    });

    return {
      ...state,
      conversations,
    };
  })
);
