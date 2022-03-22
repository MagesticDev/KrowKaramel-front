
import { DatePipe } from '@angular/common';
import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { editPageBuilder } from 'src/app/core/abstracts-class/_admin/page-builder/edit.class';
import { MainService } from 'src/app/core/services/main.service';
import { PagesService } from 'src/app/core/services/pages/page.service';
import { AlertService } from 'src/app/shared/components/app-popup-alert/app-popup-alert.service';


@Component({
    selector: "app-edit-page-informations",
    templateUrl: './template/app-admin-edit-page-informations.component.html',
    styleUrls: ['./template/app-admin-edit-page-informations.component.scss']
})
export class AdminEditPageInformationsComponent extends editPageBuilder implements OnInit, AfterContentChecked {
    
    constructor(
        private changeDetector: ChangeDetectorRef, 
        protected fb: FormBuilder,
        protected pagesService: PagesService, 
        protected alertService: AlertService, 
        private router: Router,
        public datepipe: DatePipe,
        protected mainService: MainService,
        protected activatedRoute: ActivatedRoute
        
    ) { 
        super(fb, pagesService, alertService, datepipe, mainService, activatedRoute);
    }

    

    ngAfterContentChecked() {
        this.changeDetector.detectChanges();
    }

    ngOnInit() {}

    protected reloadCurrentRoute(val) {
        setTimeout(() => {
            this.router.navigate(['/Administration/Page/Edit/' + val]);
        }, 3000);
    }
}