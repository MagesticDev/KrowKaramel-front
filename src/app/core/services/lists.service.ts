import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IListAdmin } from "../models/lists.model";


@Injectable({
    providedIn: 'root'
})

export class ListsService {
    public resourceUrl = '/api';
    
    constructor(private http: HttpClient) {}
    getAdminList(): Observable<IListAdmin[]> {
        return this.http.get<IListAdmin[]>(`${this.resourceUrl}/admin/list-admin`);
     }
}