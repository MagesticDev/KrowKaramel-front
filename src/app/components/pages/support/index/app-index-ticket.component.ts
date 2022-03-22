import { Component, OnInit, Injectable, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { ITicket } from 'src/app/core/models/support/support.model';
import { SupportService } from 'src/app/core/services/support.service';

@Component({
    templateUrl: './app-index-ticket.component.html',
    styleUrls: ['./app-index-ticket.component.scss']
})

export class IndexTicketComponent implements OnInit {
    public tickets: ITicket[];
    constructor(private SupportService: SupportService){}
    ngOnInit() {
        this.SupportService.ticketList().subscribe(tickets => {
            this.tickets = tickets;
        });
    } 
}