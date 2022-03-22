import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TICKET_ROUTE } from './app-support.route';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { NgxLoadingModule } from 'ngx-loading';
import { SharedModule } from 'src/app/shared';
import { SupportComponent } from './app-support.component';
import { IndexTicketComponent } from './index/app-index-ticket.component';
import { ViewTicketComponent } from './view/app-view-ticket.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule, 
        RouterModule.forChild(TICKET_ROUTE), 
        CommonModule,
        NgxLoadingModule,
        SharedModule
    ],
    declarations: [SupportComponent, IndexTicketComponent, ViewTicketComponent],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class SupportModule {} 