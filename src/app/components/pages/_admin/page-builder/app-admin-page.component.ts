
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, NavigationEnd, Router } from '@angular/router';


@Component({
    templateUrl: './app-admin-page.component.html',
    styleUrls: ['../app-admin.component.scss', './app-admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {
    constructor(private activatedRoute: ActivatedRoute, private router: Router){
       
    }
    ngOnInit() {
        
    }
}