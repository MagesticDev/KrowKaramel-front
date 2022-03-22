import { IGlobalWeather } from "./global.model";
import { IListWeather } from "./list.model";

export interface IWeather {
    global?: IGlobalWeather;
    list?: IListWeather[];
}

export class Weather implements IWeather {
    constructor(
        public global?: IGlobalWeather,
        public list?: IListWeather[],
    ) {}
}