import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable, LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NgxLoadingModule } from 'ngx-loading';
import { AppRoutingModule } from '../app-routing.module';
import { HttpLoaderFactory } from '../app.module';
import { AppLoadingComponent } from '../components/main/app-loading/app-loading.component';
import { AppAlertComponent } from './components/app-alert/app-alert.component';
import { AppAvatarComponent } from './components/app-avatar/app-avatar.component';
import { AppLoginComponent } from './components/app-login/app-login.component';
import { AppPopupAlertComponent } from './components/app-popup-alert/app-popup-alert.component';
import { AppUploadComponent } from './components/app-upload/app-upload.component';
import { AppTchatComponent } from './components/app-tchat/app-tchat.component';
import { LocalizedDatePipe } from './components/date/date.component';
import localeFr from '@angular/common/locales/fr';
import { AppErrorComponent } from './components/app-error/app-error.component';
import { AppModalsComponent } from './components/app-modal/app-modals.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppDragAndDropListComponent } from './components/app-drag-and-drop/app-drag-and-drop-list.component';
import { AppModalsForumAddcategoriesComponent } from './components/app-modal/forum/add-section/app-modals-forum-add-categories.component';
import { CalendarService } from '../core/services/calendar.service';
import { AppTableComponent } from './components/app-table/app-table.component';
import { NgxImgZoomModule } from 'ngx-img-zoom';
import { AppImageMagnifierPopupComponent } from './components/app-image-magnifier-popup/app-image-magnifier-popup';
import { SortDirective } from '../core/utils/sort-directive';
import { DndDirective } from '../core/utils/dnd.directive';
import { ProgressComponent } from './components/app-progress/app-progress.component';
import { AppUploadDropComponent } from './components/app-upload-drop/app-upload-drop.component';
import { NgFileValidatorLibModule } from 'angular-file-validator';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AppAdminWysiwygComponent } from './components/app-wysiwyg/admin/app-admin-wysiwyg.component';
import { AppNormalyWysiwygComponent } from './components/app-wysiwyg/normaly/app-normaly-wysiwyg.component';

import { PageAdminContainerComponent } from './components/app-templating/_admin/template-principaly/page-container.component';
import { MatIconModule } from '@angular/material/icon';
import { AppOffcanvasComponent } from './components/app-offcanvas/app-offcanvas.component';
import { uploadIcons } from './components/app-upload-drop/svg/svg.component';
import { AppFileListComponent } from './components/app-files-list/app-files-list.component';

registerLocaleData(localeFr);

const APP_COMPONENTS = [
  AppAlertComponent,
  AppLoginComponent,
  AppPopupAlertComponent,
  AppLoadingComponent,
  AppUploadComponent,
  AppAvatarComponent,
  AppTchatComponent,
  AppErrorComponent,
  AppModalsComponent,
  AppTableComponent,
  AppModalsForumAddcategoriesComponent,
  AppDragAndDropListComponent,
  AppImageMagnifierPopupComponent,
  SortDirective,
  DndDirective,
  ProgressComponent,
  AppUploadDropComponent,
  LocalizedDatePipe,
  AppAdminWysiwygComponent,
  AppNormalyWysiwygComponent,
  PageAdminContainerComponent,
  AppOffcanvasComponent,
  AppFileListComponent
];

const APP_SHARED = [...APP_COMPONENTS];

@NgModule({
  imports: [
    BrowserModule, 
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxLoadingModule,
    DragDropModule,
    NgxImgZoomModule,
    NgFileValidatorLibModule,
    CKEditorModule,
    MatIconModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    CalendarService
  ],
  declarations: [...APP_SHARED],
  exports: [...APP_SHARED]
})
export class SharedModule {

}
