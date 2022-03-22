import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { IMessage, ITicketMessage } from "../models/support/support-message.model";
import { ITicket } from "../models/support/support.model";


@Injectable({ providedIn: 'root' })
export class SupportService {
    public resourceUrl = '/api/support/';
    constructor(private http: HttpClient) {}
    public ticketList(): Observable<ITicket[]> {
        return this.http.get<ITicket[]>(`${this.resourceUrl}/index`); 
    }

    public ticketView(id: number): Observable<ITicketMessage> {
        return this.http.get<ITicketMessage>(`${this.resourceUrl}/view/${id}`); 
    }

    public post(id: number, text: string){
        return this.http.post<ITicketMessage>(`${this.resourceUrl}/view/${id}`, {text}).pipe(map(newResponse => {
            return newResponse;
        }));
    }
}