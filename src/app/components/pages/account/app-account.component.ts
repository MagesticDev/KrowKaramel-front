import { Component, Input, OnInit } from '@angular/core';
import { IAccountUser } from 'src/app/core/models/account.model';
import { SharedService } from 'src/app/core/services/shared.service';

import { UserService } from 'src/app/core/services/user.service';

@Component({
    templateUrl: './app-account.component.html'
})

export class AccountComponent implements OnInit {
    public account: IAccountUser;
    public hasLoading = true;
    constructor(private userService: UserService, private sharedService: SharedService) {
        this.sharedService.changeEmitted$.subscribe(
            account => {
                this.account = account;
                this.hasLoading = false;
            }
        );
    }
    ngOnInit() { 
        this.hasLoading = false;
    }
}