import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Injectable } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage';
import { AppRoutingModule } from './app-routing.module'; 


@Injectable({
  providedIn: 'root' 
})

@NgModule({
  imports: [
    RouterModule.forRoot([]),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // AccountModule,
    // AdminModule,
    // ErrorsModule,
    IonicStorageModule.forRoot()
  ],
  declarations: [
    AppComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor() {
  }
}