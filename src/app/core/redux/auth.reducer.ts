import { createReducer, on } from '@ngrx/store';
import { login, loginSuccess, loginFailure, logout, resetLogin } from './auth.actions';

export interface AuthState {
    userId: string;
    token: string;
    isLoading: boolean;
    error: string;
};

export const initialState: AuthState = {userId: '', token: '', isLoading: false, error: ''};

export const authReducer = createReducer(
    initialState,
    on(login, (state, { email, password }) => ({ ...state, isLoading: true, error: '' })),
    on(loginSuccess, (state, { userId, token }) => ({ ...state, userId, token, isLoading: false})),
    on(loginFailure, (state, { error }) => ({ ...state, userId: '', token: '', isLoading: false, error })),
    on(resetLogin, (state) => ({ ...state, userId: '', token: '', isLoading: false, error: '' })),
    on(logout, (state, { message }) => ({ ...state, userId: '', token: '', isLoading: false, error: message })),
);
