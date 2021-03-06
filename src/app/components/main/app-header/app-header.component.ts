import { Component, Input, OnInit, OnDestroy, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/core/models/user.modele';
import { AuthService } from 'src/app/core/services/auth.service';



@Component({
    selector: 'app-header',
    templateUrl: './app-header.component.html',
    styleUrls: ['./app-header.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class AppHeaderComponent implements OnInit {
    public show: boolean;
    
    @Output()
    public isLogged = new EventEmitter<boolean>();

    @Input()
    public isLoggedIn: boolean;

    public hasAdmin: boolean;

    public _accountDetail: IUser;
    get accountDetail(): IUser {
        return this._accountDetail;
    }
    @Input() set accountDetail(value: IUser) {
        this._accountDetail = value;
        this.getHasAdmin(this._accountDetail);
    }

    getHasAdmin(account){
        this.hasAdmin = account?.hasAdmin;
    }

    

    constructor(private AuthService: AuthService, private router: Router) {
        if (AuthService.isLoggedIn) {
            this.isLogged.emit(true);
            this.isLoggedIn = true;
        }
    }

    ngOnInit() {
        // this.getHasAdmin();
    }

    logout() {
        this.AuthService.deleteToken();
        this.isLogged.emit(false);
        this.isLoggedIn = false;
        this.router.navigate(['/Home']);
    }

    toggle() {
        let element = document.getElementById('sidebar');
        this.show = !this.show;
        (this.show) ? element.className = 'active' : element.removeAttribute("class");
    }

} 