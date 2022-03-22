import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PreloadAllModules, RouteReuseStrategy, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ADMIN_ROUTE } from './app-admin.route';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpLoaderFactory } from 'src/app/app.module';
import { AdminComponent } from './app-admin.component';
import { AdminIndexComponent } from './index/app-admin-index.component';
import { AdminForumComponent } from './forum/app-admin-forum.component';
import { AppCalendarModule } from 'src/app/shared/calendar.module';
import { AdminCalendarComponent } from './calendar/app-admin-calendar.component';
import { AdminTodoComponent } from './todo-list/app-admin-todo.component';
import { KanbanModule } from '@syncfusion/ej2-angular-kanban';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { NumericTextBoxAllModule, TextBoxAllModule } from '@syncfusion/ej2-angular-inputs';
import { AdminSettingsComponent } from './settings/app-admin-settings.component';
import { ColorSketchModule } from 'ngx-color/sketch';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomRouteReuseStrategy } from 'src/app/core/utils/customReuseRouteStrategy';
import { AdminPageModule } from './page-builder/app-admin-page.module';

// import { AuthGuardService } from 'src/app/core/services/authGuard.service';


@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule,
    HttpClientModule, 
    RouterModule.forRoot(ADMIN_ROUTE, { preloadingStrategy: PreloadAllModules }), 
    CommonModule,
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AppCalendarModule,
    KanbanModule,
    DropDownListAllModule,
    NumericTextBoxAllModule,
    TextBoxAllModule,
    ColorSketchModule,
    AdminPageModule,
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
    AdminComponent, 
    AdminIndexComponent, 
    AdminForumComponent, 
    AdminCalendarComponent, 
    AdminTodoComponent, 
    AdminSettingsComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AdminModule {} 