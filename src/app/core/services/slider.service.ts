import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ISlider } from "../models/slider.model";

@Injectable({ providedIn: 'root' })
export class SliderService {
    public resourceUrl = '/api/slider';
    constructor(private http: HttpClient) {}
    public getSlider(): Observable<ISlider[]> {
        return this.http.get<ISlider[]>(`${this.resourceUrl}`); 
    }
}