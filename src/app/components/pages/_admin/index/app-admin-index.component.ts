import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IGlobalWeather } from 'src/app/core/models/weather/global.model';
import { IListWeather } from 'src/app/core/models/weather/list.model';
import { IWeather } from 'src/app/core/models/weather/weather.model';
import { WeatherService } from 'src/app/core/services/weather/weather.service';

@Component({
    templateUrl: './app-admin-index.component.html',
    styleUrls: ['../app-admin.component.scss', './app-admin-index.component.scss'],
    encapsulation: ViewEncapsulation.Emulated
})
export class AdminIndexComponent implements OnInit {
    public globalInfoWeather: IGlobalWeather;
    public weatherList: IListWeather[];
    constructor(private weatherService: WeatherService, public datepipe: DatePipe) { }
    ngOnInit() {
        this.weatherService.getWeather().subscribe((weather: IWeather) => {
            // this.weather = weather;
            this.weatherList = weather.list;
            this.globalInfoWeather = weather.global;
        })
    }    
}