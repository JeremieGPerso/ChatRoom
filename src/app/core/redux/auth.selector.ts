import { createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const selectAuthState = (state: AppState) => state.auth;

export interface AppState {
    auth: AuthState;
};
    
export const selectUserId = createSelector(
  selectAuthState,
  (state: AuthState) => state.userId,
);
