import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideHttpClient } from '@angular/common/http';
import { cacheReducer } from './state/data-cache/cache.reducer';
import { InjectorProvider } from './injector-provider.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideStore(),
    provideState({ name: 'cache', reducer: cacheReducer }),
    provideHttpClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: (injectorProvider: InjectorProvider) => {
        return (): Promise<any> => {
          return Promise.resolve(true);
        };
      },
      deps: [InjectorProvider],
      multi: true,
    },
  ],
};
