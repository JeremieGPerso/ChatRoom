import { createReducer, on } from '@ngrx/store';
import {
  getAllMembers,
  getAllMembersSuccess,
  getAllMembersFailure,
} from './members.actions';
import { MemberModel } from '../models/member.model';

export interface MembersState {
    members: MemberModel[];
    isLoading: boolean;
    error: string;
};

export const initialState: MembersState = {
  members: [],
  isLoading: false,
  error: '',
};

export const membersReducer = createReducer(
  initialState,
  on(getAllMembers, (state) => ({
    ...state,
    isLoading: true,
    error: '',
  })),
  on(getAllMembersSuccess, (state, { members }) => ({
    ...state,
    members,
    isLoading: false,
  })),
  on(getAllMembersFailure, (state, { error }) => ({
    ...state,
    members: [],
    isLoading: false,
    error,
  }))
);
