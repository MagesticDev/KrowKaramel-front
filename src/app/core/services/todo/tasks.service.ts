import { HttpClient, HttpHeaders, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { ITasks } from "../../models/todo/tasks.model";
import { BackendResult } from "../calendar.service";


@Injectable({ providedIn: 'root' })
export class TasksService { 
    public resourceUrl = '/api/admin/todo/tasks';

    constructor(private http: HttpClient) {
    }

    getTasksList(): Observable<ITasks[]> {
       return this.http.get<ITasks[]>(`${this.resourceUrl}`);
    }

    updateTask(task: ITasks) {
        return this.http.put<ITasks[]>(`${this.resourceUrl}`, task);
    }

    addTask(task: ITasks) {
        return this.http.post<ITasks>(`${this.resourceUrl}`, JSON.stringify({'addCard': task}), { headers: new HttpHeaders({'Content-Type': 'application/json'}), observe: 'response' }).pipe(map(edited => {
            return edited;
        }));
    }
}