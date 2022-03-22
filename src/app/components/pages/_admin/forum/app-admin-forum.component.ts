
import { Component, OnInit } from '@angular/core';
import { ICategorie } from 'src/app/core/models/forum/categorie.model';
import { IForum } from 'src/app/core/models/forum/forum.model';
import { IIndex } from 'src/app/core/models/forum/index.model';
import { IMain } from 'src/app/core/models/main.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { ForumService } from 'src/app/core/services/forum.service';
import { MainService } from 'src/app/core/services/main.service';

@Component({
    templateUrl: './app-admin-forum.component.html',
    styleUrls: ['../app-admin.component.scss', '../../forum/app-forum.component.scss']
})

export class AdminForumComponent implements OnInit {
    public forumIndex: IIndex;
    public forumCategories: ICategorie[];
    public forums: IForum[];
    public hasLoading = true;
    public titleModal = "Gestion / Ajouter des catégories";
    public main: IMain;
    
    constructor(private forumService: ForumService, private authService: AuthService, private mainService: MainService){
        this.mainService.getMainBase().subscribe(mainResult => {
            this.main = mainResult;
        });
    }
    
    ngOnInit() {
        this.hasLoading = true;
        this.forumService.indexForum().subscribe(forumIndex => {
            this.forumIndex = forumIndex;
            this.forumCategories = this.forumIndex.categories;
            this.hasLoading = false;
        });
    }

    openModalCategorie(){
        
    }

    drop(event){
        this.forumService.editCategorieForum(event);
    }

    newListCategorie(event){
        this.forumCategories = event.categories;
    }
}