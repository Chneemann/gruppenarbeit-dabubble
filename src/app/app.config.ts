import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStorage, getStorage } from "@angular/fire/storage";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          apiKey: 'AIzaSyAA3lx7xPrzYpZ9g784RhgBgKbpI5gBaxk',
          authDomain: 'dabubble-cbd3b.firebaseapp.com',
          projectId: 'dabubble-cbd3b',
          storageBucket: 'dabubble-cbd3b.appspot.com',
          messagingSenderId: '252491203764',
          appId: '1:252491203764:web:5dff8ddccb37001d6743e1',
        })
      ),
      provideFirestore(() => getFirestore()),
      provideStorage(() => getStorage())
      
    ),
    provideAnimationsAsync(),
  ],
};
