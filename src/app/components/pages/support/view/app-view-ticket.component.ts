import { ViewportScroller } from '@angular/common';
import { Component, OnInit, Injectable, ChangeDetectionStrategy, ViewChild, Renderer2, AfterViewInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IMessage, ITicketMessage } from 'src/app/core/models/support/support-message.model';
import { ITicket } from 'src/app/core/models/support/support.model';
import { SupportService } from 'src/app/core/services/support.service';

@Component({
    templateUrl: './app-view-ticket.component.html',
    styleUrls: ['./app-view-ticket.component.scss']
})

export class ViewTicketComponent implements OnInit, AfterViewInit  {
    public ticket: ITicketMessage;
    public responses: IMessage[];
    public postForm: FormGroup;
    public id: number;
    public visible: boolean = false
    @ViewChildren("messageDiv") messageDivs: QueryList<ElementRef>;

    constructor(private SupportService: SupportService, private route: ActivatedRoute, private fb: FormBuilder, private renderer: Renderer2){} 
    ngOnInit() {
        this.id = Number(this.route.snapshot.paramMap.get('id'));
        this.SupportService.ticketView(this.id).subscribe(
            ticket => {
                this.ticket = ticket;
                this.responses = ticket.responses;
                this.scroll();
                this.postForm = this.fb.group({
                    text: [null, [Validators.required, Validators.minLength(10)]],
                });
            }, error  => {
                // console.log((error);
            }
        )
    } 

    scroll(){
        this.visible=true;
        if (this.messageDivs && this.messageDivs.last) {
            this.messageDivs.last.nativeElement.focus();
        }
    }

    ngAfterViewInit() {
        this.messageDivs.changes.subscribe(() => {
            this.scroll();
        });
    }

    newResponse(event){
        this.postForm.get('text').setValue(event);
    }

    post(form){
        this.SupportService.post(this.id, form.value.text).subscribe(result => {
            this.responses = result.responses;
            // this.ckeditor.instance.setData('');
            //const lastReponses =  this.responses[this.responses.length - 1];
            // if(lastReponses){
            //     const lastId = Number(lastReponses.id)
            //     this.scroll(lastId);
                
            // }
        });
    }

}