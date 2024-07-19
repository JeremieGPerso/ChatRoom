import { createAction, props } from '@ngrx/store';
import { MemberModel } from '../models/member.model';

export const getAllMembers = createAction('[Members] GetAll');
export const getAllMembersSuccess = createAction(
  '[Members] GetAll Success',
  props<{ members: MemberModel[] }>()
);
export const getAllMembersFailure = createAction(
  '[Members] GetAll Failure',
  props<{ error: string }>()
);
