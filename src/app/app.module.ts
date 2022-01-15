import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { MainComponent } from './components/main/main.component';
import { MapComponent } from './components/map/map.component';
import { FormComponent } from './components/form/form.component';
import {HeaderComponent} from "./components/header/header.component";
import {ReactiveFormsModule} from "@angular/forms";
// import {LeafletModule} from "@asymmetrik/ngx-leaflet";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClcHbQAauOW6mz_p6b6w8_fw1B3K9-YyE",
  authDomain: "pwa-test-location.firebaseapp.com",
  projectId: "pwa-test-location",
  storageBucket: "pwa-test-location.appspot.com",
  messagingSenderId: "986859184348",
  appId: "1:986859184348:web:3d71cc1bd86d2691b25419",
  measurementId: "G-BY5HGXQ5GX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    MapComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
