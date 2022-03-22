import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { PagesBuilderComponent } from './components/pages/pagesBuilder/app-pages-builder.component';
import { UrlsPagesService } from './core/services/pages/urls.service';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: '', redirectTo: '/Home', pathMatch: 'full' },
            { path: 'Home', loadChildren: () => import('./components/pages/home/app-home.module').then(m => m.HomeModule) },
            { path: 'Contact', loadChildren: () => import('./components/pages/contact/app-contact.module').then(m => m.ContactModule) },
        ],
            { enableTracing: false }
        ),
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
