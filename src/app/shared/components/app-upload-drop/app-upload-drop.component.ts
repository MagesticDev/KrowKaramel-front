import { Component, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IDocumentFile } from '../../../core/models/pagesBuilder/documents.model';
import { uploadIcons } from './svg/svg.component'
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from '@angular/platform-browser';
import { ModalService } from 'src/app/core/services/modal.service';
import { take } from 'rxjs';


@Component({
    selector: 'app-upload-drop',
    templateUrl: './app-upload-drop.component.html',
    styleUrls: ['./app-upload-drop.component.scss']
})
export class AppUploadDropComponent extends uploadIcons implements OnChanges {
    files: any[] = [];
    private _filesList: IDocumentFile[];
    private countNewFile = 0;
    public isReadOnly = false;

    @Output() btnSaveDisabled = new EventEmitter<Boolean>();
    @Output() getFileDeleted = new EventEmitter<IDocumentFile>();

    get filesList(): IDocumentFile[] {
        return this._filesList;
    }

    @Input() set filesList(value: IDocumentFile[]) {
        if (value) {
            this.countNewFile = value.length;
            this.files = value;
            this._filesList = value;
        }
    }

    @Output() filesUpload = new EventEmitter<FileList[]>()
    private fileUpload: FileList[] = [];

    constructor(protected iconRegistry: MatIconRegistry, protected sanitizer: DomSanitizer, private modalService: ModalService) {
        super(iconRegistry, sanitizer);
    }

    ngOnChanges(changes: SimpleChanges): void {
        // console.log(changes);
    }

    /**
     * on file drop handler
     */
    onFileDropped($event) {
        this.prepareFilesList($event);
    }

    /**
     * handle file from browsing
     */
    fileBrowseHandler(files) {
        this.prepareFilesList(files);
    }

    closeResult = '';

    /**
     * Delete file from files list
     * @param index (File index)
     */
    deleteFile(file: IDocumentFile, index: number) {
        this.modalService.confirm(
            'Suppression d\'un élement.',
            'Etes-vous sûr que vous voulez supprimer ' + file.name + ' ?',
            'Ce fichier sera définitivement supprimé.',
            'Cette opération ne pourra pas être annulée.'
        ).pipe(
            take(1) // take() manages unsubscription for us
        ).subscribe(result => {
            if (result) {
                this.files.splice(index, 1);
                this.fileUpload.splice(index, 1);
                this.countNewFile = this.countNewFile - 1;
                this.getFileDeleted.emit(file);
                this.filesUpload.emit(this.files);
            }
        });
    }

    /**
     * Simulate the upload process
     */
    uploadFilesSimulator(index: number) {
        setTimeout(() => {
            if (index === this.files.length) {
                this.filesUpload.emit(this.files);
                this.btnSaveDisabled.emit(false);
                this.isReadOnly = false;
                return;
            } else {
                let index = this.countNewFile;
                const progressInterval = setInterval(() => {
                    if (this.files[index].progress === 100) {
                        clearInterval(progressInterval);
                        this.fileUpload.push(this.files[index]);
                        this.countNewFile = this.countNewFile + 1;
                        this.uploadFilesSimulator(index + 1);
                    } else {
                        this.files[index].progress += 5;
                    }
                }, 50 /*200*/);
            }
        }, 1000);
    }

    /**
     * Convert Files list to normal array list
     * @param files (Files List)
     */
    prepareFilesList(files: Array<any>) {
        if (files.length > 0) {
            // this.files = null;
            // let fileUpload: FileList[] = [];
            for (const item of files) {
                item.progress = 0;
                const ext = item.name.split('.').pop();
                item.ext = ext;
                this.files.push(item);
            }
            this.isReadOnly = true;
            this.btnSaveDisabled.emit(true);
            this.uploadFilesSimulator(0);
        }
    }

    /**
     * format bytes
     * @param bytes (File size in bytes)
     * @param decimals (Decimals point)
     */
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

    fileInputClick = (event) => {
        // Open file dialog
        if (!this.isReadOnly) {
            return true;
        }
        // Do not open file dialog
        else {
            event.preventDefault();
            event.stopPropagation();
            return false;
        }
    }
}
