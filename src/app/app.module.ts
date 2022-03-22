import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Injectable } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ErrorsModule } from './components/pages/errors/app-errors.module';
import { AccountModule } from './components/pages/account/app-account.module';
import { IonicStorageModule } from '@ionic/storage';
import { AdminModule } from './components/pages/_admin/app-admin.module';
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
    AccountModule,
    AdminModule,
    ErrorsModule,
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