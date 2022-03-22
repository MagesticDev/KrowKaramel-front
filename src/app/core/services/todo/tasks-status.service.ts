import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ITasksStatus } from "../../models/todo/tasksStatus.model";

@Injectable({ providedIn: 'root' })
export class TasksStatusService { 
    public resourceUrl = '/api/admin/todo/tasks-status';

    constructor(private http: HttpClient) {
    }

    getTasksStatus(): Observable<ITasksStatus[]> {
       return this.http.get<ITasksStatus[]>(`${this.resourceUrl}`);
    }
}