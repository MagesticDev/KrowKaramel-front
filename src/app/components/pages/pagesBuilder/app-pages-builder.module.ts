import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NEWS_ROUTE } from './app-pages-builder.route';
import { CommonModule } from '@angular/common';
import { PagesBuilderComponent } from './app-pages-builder.component';
import { NgxCaptureModule } from 'ngx-capture';
import { SharedModule } from 'src/app/shared';
@NgModule({
  imports: [
    RouterModule.forChild(NEWS_ROUTE), 
    CommonModule,
    NgxCaptureModule,
    SharedModule
  ],
  declarations: [PagesBuilderComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class PagesBuilderModule {} 