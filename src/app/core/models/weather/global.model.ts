import { DecimalPipe } from "@angular/common";

export interface IGlobalWeather {
    cod?: number;
    message?: number;
    cnt?: number;
    city?: ICity;
}

export interface ICity {
    id?: number;
    name?: string;
    coord?: ICoord;
    country?: string;
    population?: number;
    timezone?: number;
    sunrise?: number;
    sunset?: number;
}

export interface ICoord {
    lat?: DecimalPipe;
    lon?: DecimalPipe;
}

export class GlobalWeather implements IGlobalWeather {
    constructor(
        public cod?: number,
        public message?: number,
        public cnt?: number,
        public city?: ICity
    ) {}
}