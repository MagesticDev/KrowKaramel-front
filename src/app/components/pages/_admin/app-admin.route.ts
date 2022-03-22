import { Routes, UrlMatcher, UrlSegment } from '@angular/router';
import { AuthGuard } from '../../../../app/shared/components/guard/auth.guard';
import { AdminComponent } from './app-admin.component';
import { AdminCalendarComponent } from './calendar/app-admin-calendar.component';
import { AdminForumComponent } from './forum/app-admin-forum.component';
import { AdminIndexComponent } from './index/app-admin-index.component';
import { AdminPageComponent } from './page-builder/app-admin-page.component';
import { AdminEditPageComponent } from './page-builder/edit-page/app-admin-edit-page.component';
import { AdminNewPageComponent } from './page-builder/edit-page/app-admin-new-page.component';
import { AdminPageBuilderListPagesComponent } from './page-builder/index-list-pages/app-admin-list-index-pages.component';
import { AdminPageBuilderParametersComponent } from './page-builder/parameters-pages/app-admin-parameters-pages.component';
import { AdminSettingsComponent } from './settings/app-admin-settings.component';
import { AdminTodoComponent } from './todo-list/app-admin-todo.component';


export const ADMIN_ROUTE: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'Administration',
        component: AdminIndexComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'Administration/Forum',
        component: AdminForumComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'Administration/Calendar',
        component: AdminCalendarComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'Administration/Todo',
        component: AdminTodoComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'Administration/Settings',
        component: AdminSettingsComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];
