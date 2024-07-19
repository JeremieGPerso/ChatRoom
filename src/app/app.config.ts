import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { authReducer } from './core/redux/auth.reducer';
import { membersReducer } from './core/redux/members.reducer';
import { conversationsReducer } from './core/redux/conversations.reducer';
import { messagesReducer } from './core/redux/messages.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideStore(
      {
        auth: authReducer,
        members: membersReducer,
        conversations: conversationsReducer,
        messages: messagesReducer,
      }),
    provideStoreDevtools(),
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
};
