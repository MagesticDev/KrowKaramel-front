import { Component, Input, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { MainService } from 'src/app/core/services/main.service';
import { IMain } from 'src/app/core/models/main.model';
import { UrlsPagesService } from 'src/app/core/services/pages/urls.service';
import { IUrlsPages } from 'src/app/core/models/pagesBuilder/urls.model';
import { EnumModules, TypeModules } from 'src/app/core/enum/modules.enum';
import { SharedService } from 'src/app/core/services/shared.service';
import { IModules } from 'src/app/core/models/modules.model';


@Component({
    selector: 'app-aside',
    templateUrl: './app-aside.component.html',
    styleUrls: ['./app-aside.component.scss'],
    encapsulation: ViewEncapsulation.None 
})

export class AppAsideComponent implements OnInit {
    @Input()
    public main: IMain;

    public filteredModule: IModules[];

    public _modules: IModules[];

    get modules(): IModules[] {
        return this._modules;
    }

    @Input() set modules(value: IModules[]){
        this._modules = value;
        this.getModules();
    }

    public _isLoggedIn: any;

    @Input() set isLoggedIn(value: any) {
        this._isLoggedIn = value;
        this.getUrlsPages();
    }

    public dynamicUrls: IUrlsPages[];

    public ForumActive: boolean;

    constructor(private urlsPagesService: UrlsPagesService, private mainService: MainService, private sharedService: SharedService) {}

    ngOnInit() {
        this.getUrlsPages();
    }

    getUrlsPages(){
        this.urlsPagesService.getUrlsList().subscribe(result => {
            if(result) {
                let url = result.filter(item => item.is_add_menu == true);
                this.dynamicUrls = url;
            }
        })
    }

    getModules(){
        if(this.modules){
            const modules = this.modules.filter(item => item.isActive === true && item.type === TypeModules.Page && item.label_url !== undefined);
            this.filteredModule = modules;  
        }  
    }
}