export interface WeatherState {
    coord: {
        lon: number;
        lat: number;
    };
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    }[];
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
    };
    visibility: number;
    wind: {
        speed: number;
        deg: number;
    };
    clouds: {
        all: number;
    };
    sys: {
        type: number;
        id: number;
        message: number;
        country: string;
        sunrise: number;
        sunset: number;
    };
    name: string;
};

export const FETCH_WEATHER = "FETCH_WEATHER";

interface FetchWeatherAction {
    type: typeof FETCH_WEATHER;
    payload: WeatherState;
};

export type WeatherActionTypes = FetchWeatherAction;
