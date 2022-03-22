import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Console } from "console";
import { Observable } from "rxjs";
import { IError } from "../models/error.model";
import { IMain } from "../models/main.model";
import { IModules } from "../models/modules.model";
import { SharedService } from "./shared.service";

@Injectable({
    providedIn: 'root'
})

export class MainService {
    public resourceUrl = '/api';
    
    constructor(private httpClient: HttpClient, private sharedService: SharedService, private router: Router) {}
    
    public getMainBase(): Observable<IMain> {
        return this.httpClient.get<IMain>(this.resourceUrl + '/main/base'); 
    }

    public jtGetFontIcons(){
        return this.httpClient.get<any>(this.resourceUrl + '/main/icons'); 
    }

    private getMainModules(){
        return this.httpClient.get<IModules[]>(this.resourceUrl + '/main/modules'); 
    }

    async loadModules() {
        const result = new Promise<IModules[]>(async (resolve, reject) => {
            await this.getMainModules().subscribe(
                modules => {
                    this.sharedService.inputData(modules);
                    return resolve(modules);
                }
            ); 
        });

        return result.then(r => {
            return r;
        })
    }

    async isModuleActived(sharedService, page){
        const result = new Promise<boolean>(async (resolve, reject) => {
            await sharedService.subscribe(
                (modules: IModules[]) => {
                    const getModule = modules.filter(module => module.enumModules === page);
                    if(getModule) {
                        let isActive: boolean = false;
                        isActive = getModule[0].isActive;
                        if(isActive) {
                            return resolve(true);
                        } else {
                            return resolve(false);
                        }
                    }
                }
            );
        });

        return result.then(r => {
            return r;
        });
    }

    public getError(): Observable<IError>{
        return this.httpClient.get<IError>(this.resourceUrl + '/errors'); 
    }
}