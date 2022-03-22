import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { EnumModules } from 'src/app/core/enum/modules.enum';
import { IModules } from 'src/app/core/models/modules.model';
import { MainService } from 'src/app/core/services/main.service';
import { SharedService } from 'src/app/core/services/shared.service';


@Component({
    templateUrl: './app-forum.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [MainService,  SharedService]
})

export class ForumComponent implements OnInit {
    public load: boolean = false;
    @Output() public modules = new EventEmitter();
    constructor(private mainService: MainService, sharedService: SharedService, private router: Router){
        this.mainService.loadModules();
        this.mainService.isModuleActived(sharedService.onGetData$, EnumModules.Forum).then(result => {
            if(result) {
                this.load = result;
            } else {
                this.router.navigate(['/404']);
            }
        })
    }
    ngOnInit(): void {}  

}