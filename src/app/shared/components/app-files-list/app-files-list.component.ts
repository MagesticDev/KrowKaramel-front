import { Component, Input, OnInit } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { URL_API } from "src/app/core/const/api.constants";
import { uploadIcons } from "../app-upload-drop/svg/svg.component";


@Component({
    selector: 'app-files-list',
    templateUrl: './app-files-list.component.html',
    styleUrls: ['./app-files-list.component.scss']
})

export class AppFileListComponent extends uploadIcons implements OnInit {
    @Input() public files;

    constructor(protected iconRegistry: MatIconRegistry, protected sanitizer: DomSanitizer) {
        super(iconRegistry, sanitizer);
    }


    ngOnInit() { }
    formatBytes(bytes, decimals) {
        if (bytes === 0) {
            return '0 Bytes';
        }
        const k = 1024;
        const dm = decimals <= 0 ? 0 : decimals || 2;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    downloadFilePath(file) {
        return URL_API + '/' + file?.path;
    }
}