import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { cartReducer } from './store/reducers/cart.reducer';
import { provideEffects } from '@ngrx/effects';
import { CartEffects } from './store/effects/cart.effects';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideStore(),
    provideState({ name: 'cart', reducer: cartReducer }),
    provideEffects([CartEffects]),
    provideClientHydration(withEventReplay()),
  ],
};
