import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, Injectable, NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { FORUM_ROUTE } from './app-forum.route';
import { ForumIndexComponent } from './index/app-forum-index.component';
import { CommonModule } from '@angular/common';
import { ForumSectionComponent } from './section/app-forum-section.component';
import { ForumSubjectComponent } from './subject/app-forum.subject.component';
import { ForumComponent } from './app-forum.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppBreadcrumbComponent } from '../../main/app-bread-crumbs/app-bread-crumbs.component';
import { NgxLoadingModule } from 'ngx-loading';
import { SharedModule } from 'src/app/shared';
import { ForumEditComponent } from './actions/edit/app-forum-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForumNewComponent } from './actions/new/app-forum-new.component';
import { MainService } from 'src/app/core/services/main.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { EnumModules } from 'src/app/core/enum/modules.enum';

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    BrowserModule, 
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule, 
    RouterModule.forRoot(FORUM_ROUTE, { preloadingStrategy: PreloadAllModules }), 
    CommonModule, 
    NgxLoadingModule, 
    SharedModule
  ],
  providers: [],
  declarations: [AppBreadcrumbComponent, ForumComponent, ForumIndexComponent, ForumSectionComponent, ForumSubjectComponent, ForumNewComponent, ForumEditComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ForumModule {

} 

// export function loadModules(mainService: MainService, sharedService: SharedService){
//   return (): Promise<any> => {
//       return mainService.isModuleActived(sharedService.onGetData$, EnumModules.Forum).then();
//   };
// }