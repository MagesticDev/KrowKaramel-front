import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IPage } from 'src/app/core/models/pagesBuilder/page.model';
import { PagesService } from 'src/app/core/services/pages/page.service';
import { toCSS, toJSON } from 'cssjson';
import { NgxCaptureService } from 'ngx-capture';
import { AlertService } from 'src/app/shared/components/app-popup-alert/app-popup-alert.service';
import { AuthService } from 'src/app/core/services/auth.service';
import jwt_decode from 'jwt-decode';
import { DomSanitizer } from '@angular/platform-browser';
import { EnumOffcanvas } from 'src/app/core/enum/offcanvas.enum';

@Component({
    templateUrl: './app-pages-builder.component.html',
    styleUrls: ['./app-pages-builder.component.scss']
})

export class PagesBuilderComponent implements OnInit {
    
    public page: IPage;
    public custom_css: string;
    public imgBase64: any;
    public hasAdmin: boolean = false;
    public offcanvasConfig = {
        "position": EnumOffcanvas.RIGHT,
        "id": "offCanvasPageBuilder",
        "title": "Documents",
        "description": "Liste des documents téléchargeables",
        "backdrop": true,
        "scroll": false
    }
    @ViewChild('screen', { static: false }) screen: any;
    
    constructor(private pagesService: PagesService, private router: Router, private captureService: NgxCaptureService, private alertService: AlertService, private authService: AuthService, private sanitizer: DomSanitizer){}
    
    ngOnInit() {
        this.pagesService.getPage(this.router.url.substr(1)).subscribe(pageResult => {
            this.page = pageResult;
            this.custom_css = toJSON(pageResult.custom_css).attributes;
            this.getHasAdmin();
        });
    } 

    getHasAdmin(){
        if(this.authService.getToken() != null){
             this.hasAdmin = jwt_decode(this.authService.getToken())['data'].hasAdmin;
        } 
    }

    capture() {
        this.captureService.getImage(this.screen.nativeElement, true).toPromise().then(img=>{
            this.imgBase64 = img;
            this.save();
        })
    }

    DataURIToBlob(dataURI: string) {
        const splitDataURI = dataURI.split(',')
        const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
        const mimeString = splitDataURI[0].split(':')[1].split(';')[0]
            
        const ia = new Uint8Array(byteString.length)
        for (let i = 0; i < byteString.length; i++)
            ia[i] = byteString.charCodeAt(i)
          
            return new Blob([ia], { type: mimeString })
    }

    save(){
        const file = this.DataURIToBlob(this.imgBase64);
        this.pagesService.snapshot(file, this.page.path, this.page.page_id).subscribe(value => {
            this.alertService.success('Snapshot enregistré avec succès.');
        });
    }

    removeBackslashes(content) {
        const str = content.replace(/\\/g, '');
        return this.sanitizer.bypassSecurityTrustHtml(str);
    }
}