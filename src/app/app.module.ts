import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Injectable, APP_INITIALIZER } from '@angular/core';
import { AppComponent } from './app.component';
import { AppAsideComponent } from './components/main/app-aside/app-aside.component';
import { AppFooterComponent } from './components/main/app-footer/app-footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppHeaderComponent } from './components/main/app-header/app-header.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ForumModule } from './components/pages/forum/app-forum.module';
import { Router, RouterModule } from '@angular/router';
import { ErrorsModule } from './components/pages/errors/app-errors.module';
import { AccountModule } from './components/pages/account/app-account.module';
import { SharedModule } from './shared';
import { IonicStorageModule } from '@ionic/storage';
import { AuthInterceptor } from './shared/components/auths/authconfig.interceptor';
import { HttpErrorInterceptor } from './shared/components/app-interceptor/app-intercaptor.component';
import { AdminModule } from './components/pages/_admin/app-admin.module';
import { PodcastModule } from './components/pages/podcast/app-podcast.module';
import { SupportModule } from './components/pages/support/app-support.module';
import { PagesBuilderModule } from './components/pages/pagesBuilder/app-pages-builder.module';
import { NEWS_ROUTE } from './components/pages/home/app-home.route';
import { PagesBuilderComponent } from './components/pages/pagesBuilder/app-pages-builder.component';
import { UrlsPagesService } from './core/services/pages/urls.service';
import {Injector} from '@angular/core';
import { AppRoutingModule } from './app-routing.module'; 



export let InjectorInstance: Injector;


export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@Injectable({
  providedIn: 'root' 
})

@NgModule({
  imports: [
    RouterModule.forChild(NEWS_ROUTE),
    RouterModule.forRoot([]),
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ForumModule,
    PagesBuilderModule,
    AccountModule,
    AdminModule,
    ErrorsModule,
    PodcastModule,
    SupportModule,
    SharedModule,
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  declarations: [
    AppComponent,
    AppAsideComponent,
    AppFooterComponent,
    AppHeaderComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: loadRoutes,
      deps: [UrlsPagesService, Router],
      multi: true
    },
    UrlsPagesService,
    {
      // provide: [LOCALE_ID, HTTP_INTERCEPTORS],
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }, {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  entryComponents: [PagesBuilderComponent],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(private injector: Injector) {
    InjectorInstance = this.injector;
  }
}


export function loadRoutes(provider: UrlsPagesService) {
  return (): Promise<any> => {
      return provider.loadRoutes();
  };
}
