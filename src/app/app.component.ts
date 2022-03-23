import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IUser } from './core/models/user.modele';
import { AuthService } from './core/services/auth.service';
import jwt_decode from 'jwt-decode';
import { MainService } from './core/services/main.service';
import { IMain } from './core/models/main.model';
import { SharedService } from './core/services/shared.service';
import { InjectorInstance } from './app.module';
import { IModules } from './core/models/modules.model';
import { EnumModules, TypeModules } from './core/enum/modules.enum';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Les bouquineurs';
  public background: string;
  public isLoggedInOk: boolean;
  private refreshLogin;
  public account: IUser;
  public accountDetail: IUser;
  public myAngularxQrCode: string = null;

  @Output()
  public isLogged = new EventEmitter<boolean>();
  public main: IMain;
  public tchatActiveModule: boolean;
  public modules: IModules[];
  public tchatActive: boolean;


  constructor(
    public translate: TranslateService,
    private router: Router,
    private AuthService: AuthService,
    private mainService: MainService,
    private sharedService: SharedService
  ) {
    this.myAngularxQrCode = 'Your QR code data string';
    this.mainService.loadModules().then((result: IModules[]) => {
      this.modules = result
      // Partie module activable via le backend
      const component = result.filter(item => item.isActive === true && item.type === TypeModules.Component);
      component.forEach(modules => {
        //Tchat
        (modules['enumModules'] == EnumModules.Tchat ? this.tchatActive = modules?.isActive : null);
        //ETC
        //(modules['enumModules'] == EnumModules.Tchat ? this.tchatActive = modules?.isActive : null);
      })
    });

    this.mainService.getMainBase().subscribe(mainResult => {
      this.main = mainResult;
      if (window.location.protocol == 'http:' && this.main.https === 'true') {
        window.location.href = window.location.href.replace('http:', 'https:');
      }
    })

    if (this.AuthService.getToken() != null) {
      this.account = jwt_decode(this.AuthService.getToken())['data'];
      this.accountDetail = this.account;
      this.isConnected();
      this.router.events.forEach((event) => {
          if(event instanceof NavigationStart) {
            this.isConnected();
          }
      });

      // this.refreshLogin = setInterval(() => {
      //   this.isConnected();
      // }, 10000);
    }

    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('fr');
    const browserLang = translate.getBrowserLang();
    translate.use(this.getUsersLocale('fr') ? browserLang : 'fr');
    this.router.errorHandler = (error: any) => {
      let routerError = error.toString();
      if (routerError.indexOf('Cannot match any routes') >= 0) {
        this.router.navigate(['/404']);
      } else {
        throw error;
      }
    }
  }

  isConnected() {
    if (this.AuthService.getToken() != null) {
      this.AuthService.getUserProfile(this.accountDetail.id, this.AuthService.getToken()).subscribe(
        success => {
          this.accountDetail = this.account;
          this.isLogged.emit(true);
          this.isLoggedInOk = true;
        }, error => {
          this.router.navigate(['/Home']);
          this.isDisconnected();
        }
      );
    }
  }

  isDisconnected() {
    this.AuthService.deleteToken();
    this.isLogged.emit(false);
    this.isLoggedInOk = false;
    this.stopTimer();
  }

  stopTimer() {
    if (this.refreshLogin) {
      clearInterval(this.refreshLogin);
    }
  }


  ngOnInit() {
    this.background = "../assets/videos/background.mp4";

  }

  public isLoggedIn(value) {
    this.accountDetail = value;
    this.isLoggedInOk = value;
  }

  getUsersLocale(defaultValue: string): string {
    if (typeof window === 'undefined' || typeof window.navigator === 'undefined') {
      return defaultValue;
    }
    const wn = window.navigator as any;
    let lang = wn.languages ? wn.languages[0] : defaultValue;
    lang = lang || wn.language || wn.browserLanguage || wn.userLanguage;
    return lang;
  }
}

