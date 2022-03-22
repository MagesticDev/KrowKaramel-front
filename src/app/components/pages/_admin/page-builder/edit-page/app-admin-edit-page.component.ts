
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { indexEditPageBuilder } from 'src/app/core/abstracts-class/_admin/page-builder/index-edit.class';
import { IPage } from 'src/app/core/models/pagesBuilder/page.model';
import { PagesService } from 'src/app/core/services/pages/page.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { AlertService } from 'src/app/shared/components/app-popup-alert/app-popup-alert.service';


@Component({
    selector: "app-edit-page",
    templateUrl: './template/app-admin-page.component.html',
    styleUrls: ['./template/app-admin-page.component.scss']
})
export class AdminEditPageComponent extends indexEditPageBuilder {
    public page: IPage;
    public content: SafeHtml;
    public is_not_saved: boolean = false;
    public hasEdit: boolean = true;

    constructor(
        protected activatedRoute: ActivatedRoute, 
        protected sharedService: SharedService, 
        private router: Router, 
        protected pagesService: PagesService, 
        protected fb: FormBuilder,
        private sanitizer: DomSanitizer,
        protected alertService: AlertService
    ) {
        super(activatedRoute, fb, pagesService, alertService);
        const id = this.activatedRoute.snapshot.paramMap.get('id');
        this.sharedService.emitChange(true);
        if(id != undefined && Number(id)){
            pagesService.getPage(id).subscribe((value: IPage) => {
                this.page = value;
                this.content = this.removeBackslashes(value.content);
            });
        } else {
            this.router.navigate(['/Administration/Pages']);
        }
    }

    removeBackslashes(content) {
        const str = content.replace(/\\/g, '');
        return str;
    }

}