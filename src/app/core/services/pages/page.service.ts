import { HttpClient, HttpEvent, HttpParams, HttpRequest, HttpEventType, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IPage } from "../../models/pagesBuilder/page.model";
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IDocumentFile } from "../../models/pagesBuilder/documents.model";


@Injectable({
    providedIn: 'root'
})

export class PagesService {
    public resourceUrl = '/api';
    progressInfos = [];
    message = '';
    private page: IPage = {};
    private documents: IDocumentFile;

    constructor(private http: HttpClient) { }
    getPage(param: string): Observable<IPage> {
        return this.http.get<IPage>(`${this.resourceUrl}/pages/page/${param}`);
    }

    getPages(): Observable<IPage[]> {
        return this.http.get<IPage[]>(`${this.resourceUrl}/pages/listpages`);
    }

    snapshot(snapshot, path, idPage) {
        let formData: FormData = new FormData();
        formData.append('snapshot', snapshot);
        formData.append('path', path);
        formData.append('idPage', idPage);
        return this.http.post(`${this.resourceUrl}/pages/snapshot`, formData);
    }

    saveInformations(data): Observable<any> {
        let formData: FormData = new FormData();
        formData.append('informations', JSON.stringify(data));
        return this.http.post(`${this.resourceUrl}/pages/new`, formData);
    }

    updateInformations(data) {
        return this.http.put(`${this.resourceUrl}/pages/update`, data);
    }

    updatePage(content: string, id: Number) {
        return this.http.put(`${this.resourceUrl}/pages/update/${id}/content`, content);
    }

    upload(id, documents) {
        if (documents) {
            const file = documents;
            const formData = new FormData();
            for (let i = 0; i < file.length; i++) {
                if (!file[i].id) {
                    formData.append("documents[]", file[i]);
                }
            }
            
            return this.http.post(`${this.resourceUrl}/pages/update/${id}/files`, formData);
        } else {
            return;
        }
    }


    deleteDocuments(id: number, file: IDocumentFile) {
        return this.http.delete(`${this.resourceUrl}/pages/update/${id}/delete/file/${file.id}`).subscribe();
    }
}