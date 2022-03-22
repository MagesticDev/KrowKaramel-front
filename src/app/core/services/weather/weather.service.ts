import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable  } from 'rxjs';
import { Router } from '@angular/router';
import { IWeather } from '../../models/weather/weather.model';



@Injectable({
    providedIn: 'root'
})

export class WeatherService {

    public resourceUrl = '/api/admin/weather';

    constructor(private http: HttpClient, public router: Router) { }

    public getWeather(): Observable<IWeather> {
        return this.http.get<IWeather>(`${this.resourceUrl}`);
    }

}