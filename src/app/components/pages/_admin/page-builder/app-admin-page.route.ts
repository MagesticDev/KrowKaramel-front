import { Routes } from "@angular/router";
import { AdminPageComponent } from "./app-admin-page.component";
import { AdminEditPageComponent } from "./edit-page/app-admin-edit-page.component";
import { AdminNewPageComponent } from "./edit-page/app-admin-new-page.component";
import { AdminPageBuilderListPagesComponent } from "./index-list-pages/app-admin-list-index-pages.component";
import { AuthGuard } from '../../../../../app/shared/components/guard/auth.guard';

export const ADMIN_PAGE_ROUTE: Routes = [
  {
    path: '',
    component: AdminPageComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'Administration/Pages',
        component: AdminPageBuilderListPagesComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'Administration/Page/New',
        component: AdminNewPageComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'Administration/Page/Edit/:id',
        component: AdminEditPageComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
];