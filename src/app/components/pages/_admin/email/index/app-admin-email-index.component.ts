import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailService } from 'src/app/core/services/email/email.service';
@Component({
    templateUrl: './app-admin-email-index.component.html',
    styleUrls: ['../app-admin-email.component.scss', './app-admin-email-index.component.scss'],
    encapsulation: ViewEncapsulation.Emulated
})
export class AdminEmailIndexComponent implements OnInit {
    public emails: any[] = [];
    public emailsListInormation: any;
    public pageId : number;
    public folderName : string;
    public hasLoading: boolean = true;
    constructor(private emailService: EmailService,  private activatedRoute: ActivatedRoute, ) { }
    ngOnInit() {
        
        const folderName = this.activatedRoute.snapshot.paramMap.get('name');
        this.folderName = (folderName ? folderName : 'INBOX');

        const pageId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
        this.pageId = (pageId ? pageId : 1);
        
        // console.log(this.folderName, this.pageId);
        this.emailService.getEmailList(this.pageId, this.folderName).subscribe(items => {
            this.emailsListInormation = items['pages'];
            this.emails = items['list'];
            this.hasLoading = false;
        });
    }    
}