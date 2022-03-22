import { HttpClient } from "@angular/common/http";
import { ComponentRef, Injectable, InjectionToken, Injector } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { async } from "rxjs/internal/scheduler/async";
import { PagesBuilderComponent } from "src/app/components/pages/pagesBuilder/app-pages-builder.component";
import { IUrlsPages } from "../../models/pagesBuilder/urls.model";

@Injectable({ providedIn: 'root' })
export class UrlsPagesService {
    static getUrlsList() {
      throw new Error('Method not implemented.');
    } 
    public resourceUrl = '/api/pages/urls';

    constructor(private http: HttpClient, private router: Router, private injector: Injector) {}

    getUrlsList() {
       return this.http.get<IUrlsPages[]>(`${this.resourceUrl}`);
    }

    async loadRoutes() {
      return new Promise(async (resolve, reject) => {
        await this.getUrlsList().subscribe(
              val => {
                if(val){
                  const config = this.router.config;
                  val.forEach(route => {
                      const url = route?.path;
                      config.push({path: `${url}`,  component: PagesBuilderComponent});
                  });
                  this.router.resetConfig(config);
                  resolve(true);
                }
                resolve(true);
              }
          ); 
         
      })
    }
}