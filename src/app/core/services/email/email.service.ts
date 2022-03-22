import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ITasksPriority } from "../../models/todo/tasksPriority.model";


@Injectable({ providedIn: 'root' })
export class EmailService { 
    public resourceUrl = '/api/email';
    constructor(private http: HttpClient) {
    }

    getEmailList(pageId, folderName): Observable<any[]> {
       return this.http.get<any[]>(`${this.resourceUrl}/index/folder/${folderName}/page/${pageId}`);
    }

    getFoldersList(): Observable<any[]> {
        return this.http.get<any[]>(`${this.resourceUrl}/folders`);
     }
}