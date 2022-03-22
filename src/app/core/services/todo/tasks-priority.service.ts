import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ITasksPriority } from "../../models/todo/tasksPriority.model";


@Injectable({ providedIn: 'root' })
export class TasksPriorityService { 
    public resourceUrl = '/api/admin/todo/tasks-priority';

    constructor(private http: HttpClient) {
    }

    getTasksPriority(): Observable<ITasksPriority[]> {
       return this.http.get<ITasksPriority[]>(`${this.resourceUrl}`);
    }
}