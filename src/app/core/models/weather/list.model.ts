import { DecimalPipe } from "@angular/common";

export interface IListWeather {
    dt?: number;
    main?: {
        // "temp": 17.74,
        // "feels_like": 17.61,
        // "temp_min": 17.74,
        // "temp_max": 20,
        // "pressure": 1013,
        // "sea_level": 1013,
        // "grnd_level": 1002,
        // "humidity": 78,
        // "temp_kf": -2.26
    };
    weather?: [
        // {
        //     "id": 803,
        //     "main": "Clouds",
        //     "description": "nuageux",
        //     "icon": "04d"
        // }
    ];
    clouds?: {
        // "all": 83
    };
    wind?: {
        // "speed": 3.77,
        // "deg": 152,
        // "gust": 4.49
    };
    visibility?: number;
    pop?: DecimalPipe;
    sys?: {
        // "pod": "d"
    };
    dt_txt?: Date;
}

export class ListWeather implements IListWeather {
    constructor(
        public dt?: number,
        public main?: {
            // "temp": 17.74,
            // "feels_like": 17.61,
            // "temp_min": 17.74,
            // "temp_max": 20,
            // "pressure": 1013,
            // "sea_level": 1013,
            // "grnd_level": 1002,
            // "humidity": 78,
            // "temp_kf": -2.26
        },
        public weather?: [
            // {
            //     "id": 803,
            //     "main": "Clouds",
            //     "description": "nuageux",
            //     "icon": "04d"
            // }
        ],
        public clouds?: {
            // "all": 83
        },
        public wind?: {
            // "speed": 3.77,
            // "deg": 152,
            // "gust": 4.49
        },
        public visibility?: number,
        public pop?: DecimalPipe,
        public sys?: {
            // "pod": "d"
        },
        public dt_txt?: Date
    ) {}
}