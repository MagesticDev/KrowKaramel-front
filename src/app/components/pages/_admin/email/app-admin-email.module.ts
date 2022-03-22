import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PreloadAllModules, RouteReuseStrategy, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CustomRouteReuseStrategy } from 'src/app/core/utils/customReuseRouteStrategy';
import { ADMIN_EMAIL_ROUTE } from './app-admin-email.route';
import { AdminEmailIndexComponent } from './index/app-admin-email-index.component';
import { AdminEmailReadComponent } from './read/app-admin-email-read.component';
import { AdminEmailComponent } from './app-admin-email.component';
import { SharedModule } from 'src/app/shared';

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(ADMIN_EMAIL_ROUTE, { preloadingStrategy: PreloadAllModules }), 
    CommonModule,
    BrowserModule,
    SharedModule
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: CustomRouteReuseStrategy
    }
  ],
  declarations: [
    AdminEmailIndexComponent,
    AdminEmailReadComponent,
    AdminEmailComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AdminEmailModule {} 