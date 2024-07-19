import { createAction, props } from '@ngrx/store';

export const login = createAction('[User] Login', props<{ email: string, password: string }>());
export const loginSuccess = createAction('[User] Login Success', props<{ userId: string, token: string }>());
export const loginFailure = createAction('[User] Login Failure', props<{ error: string }>());
export const resetLogin = createAction('[User] Reset Login');
export const logout = createAction('[User] Logout', props<{ message: string }>());
