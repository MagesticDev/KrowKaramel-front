import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IPodcast } from "../models/podcast/podcast.model";
import { ISlider } from "../models/slider.model";

@Injectable({ providedIn: 'root' })
export class PodcastService {
    public resourceUrl = '/api/podcast/';
    constructor(private http: HttpClient) {}
    public podcastList(): Observable<IPodcast[]> {
        return this.http.get<IPodcast[]>(`${this.resourceUrl}/index`); 
    }
}