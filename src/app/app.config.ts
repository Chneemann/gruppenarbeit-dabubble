import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from "@angular/fire/storage";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}


const translationConfig = {
  defaultLanguage: 'de',
  loader: {
    provide: TranslateLoader,
    useFactory: HttpLoaderFactory,
    deps: [HttpClient]
  }
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      HttpClientModule,
      provideFirebaseApp(() => initializeApp({
        apiKey: 'AIzaSyAA3lx7xPrzYpZ9g784RhgBgKbpI5gBaxk',
        authDomain: 'dabubble-cbd3b.firebaseapp.com',
        projectId: 'dabubble-cbd3b',
        storageBucket: 'dabubble-cbd3b.appspot.com',
        messagingSenderId: '252491203764',
        appId: '1:252491203764:web:5dff8ddccb37001d6743e1',
      })),
      provideFirestore(() => getFirestore()),
      provideStorage(() => getStorage()),
      TranslateModule.forRoot(translationConfig),
    ),
    provideAnimationsAsync(),
  ],
};