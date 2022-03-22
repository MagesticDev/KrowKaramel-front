import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EmailService } from 'src/app/core/services/email/email.service';
@Component({
    templateUrl: './app-admin-email.component.html',
    styleUrls: ['../app-admin.component.scss', './app-admin-email.component.scss'],
    encapsulation: ViewEncapsulation.Emulated
})
export class AdminEmailComponent implements OnInit {
    constructor(private emailService: EmailService) { }
    public folders: any[] = [];
    public hasLoading: boolean = true;
    ngOnInit() {
        this.emailService.getFoldersList().subscribe(folders => {
            this.folders = folders;
            this.hasLoading = false;
        });
    }    
}