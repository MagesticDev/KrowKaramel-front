import { Component, Input, OnInit } from '@angular/core';
import { IMain } from 'src/app/core/models/main.model';



@Component({
    selector: 'app-footer',
    templateUrl: './app-footer.component.html',
    styleUrls: ['./app-footer.component.scss']
})

export class AppFooterComponent implements OnInit {
    public year: number = new Date().getFullYear();
    @Input()
    public main: IMain;
    constructor(){
    }
    ngOnInit() { 
        
    }

    openUrl(value){
        const url = value.currentTarget.attributes["href"].nodeValue;
        window.open(url, "social","menubar=1,resizable=1,width=450,height=450");
        return false
    }
    
}