import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import jwt_decode from 'jwt-decode';
import { IUser } from 'src/app/core/models/user.modele';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/core/services/shared.service';


@Component({
    templateUrl: './app-admin.component.html',
    styleUrls: ['./app-admin.component.scss']
})

export class AdminComponent implements OnInit, AfterContentChecked, AfterViewInit {
    public account: IUser;
    public hasClosedMenu: boolean;
    public hasLoading = true;
   
     
    
    constructor(private authService: AuthService, private router: Router, private changeDetector: ChangeDetectorRef, private _sharedService: SharedService){
        if(this.authService.getToken() != null){
            this.account = jwt_decode(this.authService.getToken())['data'];
            if(!this.account.hasAdmin){
                this.router.navigate(['/404']);
            }
        } else {
            this.router.navigate(['/404']);
        }
    }

    ngAfterContentChecked() : void {
        this.changeDetector.detectChanges();
    }

    ngAfterViewInit() {
        this.hasLoading = false;
    }
   
    ngOnInit() {
        this.hasLoading = false;   
    }
}
