
import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { IPage } from 'src/app/core/models/pagesBuilder/page.model';
import { PagesService } from 'src/app/core/services/pages/page.service';



@Component({
    selector: "app-index-pages",
    templateUrl: './app-admin-list-index-pages.component.html',
    styleUrls: ['./app-admin-list-index-pages.component.scss']
})
export class AdminPageBuilderListPagesComponent implements OnInit {
    
    public columns = ['Capture', 'Lien', 'Titre', 'Description', 'Créer', 'Auteur', 'Status', 'Actions'];
    public filterColumns = ['capture', 'path', 'title', 'description', 'created_date', 'author', 'is_published', 'actions'];
    public attrColumn = ['created_date', 'is_published', 'path', 'capture'];
    public hasEdit: boolean = false;
    public pages: IPage[];

    @Output() public editAndNewPage = new EventEmitter<boolean>();

    constructor(private pagesService: PagesService){}
    ngOnInit() {
        this.pagesService.getPages().subscribe(pages => {
            this.pages = pages;
        })
        // console.log(('Index pages opened');
    }

    isPublished(value){
        if(value === 1){
            return '<span class="active">Publié</span>'; 
        }

        return '<span class="active">Non publié</span>';
    }

    hasEditAndNewPage(value){
        this.editAndNewPage.emit(value);
    }
}