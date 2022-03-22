import { Routes, UrlMatcher, UrlSegment } from "@angular/router";
import { AuthGuard } from '../../../../../app/shared/components/guard/auth.guard';
import { AdminEmailComponent } from "./app-admin-email.component";
import { AdminEmailIndexComponent } from "./index/app-admin-email-index.component";
import { AdminEmailReadComponent } from "./read/app-admin-email-read.component";

export const routingMatcher: ((paths: string[]) => UrlMatcher) = (paths: string[]) => {
  const result: UrlMatcher = (segments) => {
    const matchingPathIndex = paths.findIndex((path, index) => {
      const pathSegments = path.split("/");
      return segments.every((segment, i) =>
        pathSegments.length > i && (
          pathSegments[i].startsWith(":") ? true : segment.path.toLowerCase() === pathSegments[i].toLowerCase()));
    });

    if (matchingPathIndex >= 0) {
      const matchingPath = paths[matchingPathIndex];

      const consumed: UrlSegment[] = [];
      const params = {};

      matchingPath.split("/").forEach((path, i) => {
        consumed.push(segments[i]);
        if (path.startsWith(":")) {
          const param = path.substring(1);
          params[param] = segments[i];
        }
      });

      return {
        consumed: consumed,
        posParams: params
      };
    }

    return null;
  };

  return result;
};

export const ADMIN_EMAIL_ROUTE: Routes = [
  {
    path: '',
    component: AdminEmailComponent,
    canActivate: [AuthGuard],
    children: [
      {
        matcher: routingMatcher([
          'Email',
          'Email/page/:id',
          'Email/folder/:name',
          'Email/folder/:name/page/:id'
        ]),
        component: AdminEmailIndexComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: 'Read/{id}',
            component: AdminEmailReadComponent,
            canActivate: [AuthGuard],
          }
        ]
      }
    ]
  },
];