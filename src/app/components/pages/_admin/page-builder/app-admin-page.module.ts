import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PreloadAllModules, RouteReuseStrategy, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpLoaderFactory } from 'src/app/app.module';
import { AppCalendarModule } from 'src/app/shared/calendar.module';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { NumericTextBoxAllModule, TextBoxAllModule } from '@syncfusion/ej2-angular-inputs';
import { ColorSketchModule } from 'ngx-color/sketch';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomRouteReuseStrategy } from 'src/app/core/utils/customReuseRouteStrategy';
import { ADMIN_PAGE_ROUTE } from './app-admin-page.route';
import { AdminPageBuilderListPagesComponent } from './index-list-pages/app-admin-list-index-pages.component';
import { AdminEditPageComponent } from './edit-page/app-admin-edit-page.component';
import { AdminNewPageComponent } from './edit-page/app-admin-new-page.component';
import { AdminEditPageInformationsComponent } from './edit-page/informations-page/app-admin-edit-page-informations.component';
import { AdminPageBuilderParametersComponent } from './parameters-pages/app-admin-parameters-pages.component';
import { AdminPageComponent } from './app-admin-page.component';
import { AppTemplateEditorComponent } from './edit-page/template-editor/app-template-editor.component';

// import { AuthGuardService } from 'src/app/core/services/authGuard.service';


@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(ADMIN_PAGE_ROUTE, { preloadingStrategy: PreloadAllModules }), 
    CommonModule,
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AppCalendarModule,
    DropDownListAllModule,
    NumericTextBoxAllModule,
    TextBoxAllModule,
    ColorSketchModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient] 
      }
    })
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: CustomRouteReuseStrategy
    }
  ],
  declarations: [
    AdminPageComponent,
    AdminPageBuilderListPagesComponent,
    AdminNewPageComponent,
    AdminEditPageComponent,
    AdminEditPageInformationsComponent,
    AdminPageBuilderParametersComponent,
    AppTemplateEditorComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AdminPageModule {} 