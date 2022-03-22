import { Routes } from '@angular/router';
import { SupportComponent } from './app-support.component';
import { IndexTicketComponent } from './index/app-index-ticket.component';
import { ViewTicketComponent } from './view/app-view-ticket.component';


export const TICKET_ROUTE: Routes = [
  {
    path: '',
    component: SupportComponent,
    children: [
      { 
        path: 'Support', 
        component: IndexTicketComponent, 
      }, { 
        path: 'Support/View/:id', 
        component: ViewTicketComponent, 
      },
    ]
  }
];
