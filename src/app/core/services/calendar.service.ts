import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {DayPilot} from "daypilot-pro-angular";
import {HttpClient} from "@angular/common/http";
import EventData = DayPilot.EventData;

@Injectable()
export class CalendarService {

  public resourceUrl = '/api/calendar';

  constructor(private http: HttpClient) {
  }

  
  getEvents(start: DayPilot.Date, end: DayPilot.Date): Observable<EventData[]> {
    return this.http.post(`${this.resourceUrl}/backend_events`, {start: start, end: end}) as Observable<EventData[]>;
  }

  createEvent(params: CreateEventParams): Observable<BackendResult> {
    return this.http.post(`${this.resourceUrl}/backend_create`, params) as Observable<BackendResult>;
  }

  deleteEvent(id: string): Observable<BackendResult> {
    return this.http.post(`${this.resourceUrl}/backend_delete`, {id: id}) as Observable<BackendResult>;
  }

  moveEvent(params: MoveEventParams): Observable<BackendResult> {
    return this.http.post(`${this.resourceUrl}/backend_move`, params) as Observable<BackendResult>;
  }
}

export interface CreateEventParams {
  id?: string | number;
  start: string;
  end: string;
  text: string;
}

export interface MoveEventParams {
  id: string | number;
  newStart: string;
  newEnd: string;
}

export interface BackendResult {
  id: string | number;
  result: string;
  message: string;
}

