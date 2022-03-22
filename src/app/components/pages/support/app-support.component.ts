import { Component, OnInit, ElementRef } from '@angular/core';



@Component({
    templateUrl: './app-support.component.html',
    styleUrls: ['./app-support.component.scss']
})

export class SupportComponent implements OnInit {
    constructor(private elementRef: ElementRef){}
    ngOnInit() {} 
}