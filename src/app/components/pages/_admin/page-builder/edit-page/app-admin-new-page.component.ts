
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { indexEditPageBuilder } from 'src/app/core/abstracts-class/_admin/page-builder/index-edit.class';
import { IPage } from 'src/app/core/models/pagesBuilder/page.model';
import { PagesService } from 'src/app/core/services/pages/page.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { AlertService } from 'src/app/shared/components/app-popup-alert/app-popup-alert.service';


@Component({
    selector: "app-new-page",
    templateUrl: './template/app-admin-page.component.html',
    styleUrls: ['./template/app-admin-page.component.scss']
})
export class AdminNewPageComponent extends indexEditPageBuilder {
    public page: IPage;
    public content: SafeHtml = null;
    public is_not_saved: boolean = true;
    public hasEdit: boolean = false;
    
    constructor( 
        protected activatedRoute: ActivatedRoute, 
        protected sharedService: SharedService, 
        protected fb: FormBuilder, 
        protected pagesService: PagesService,
        protected alertService: AlertService
    ) {
        super(activatedRoute, fb, pagesService, alertService);
    }

    removeBackslashes(content) {}
}