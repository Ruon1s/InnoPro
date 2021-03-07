import {FETCH_WEATHER, WeatherState} from "../weather/types";

export interface LocationState {
    coords : {
        latitude: number;
        longitude: number;
        altitude: number | null;
        accuracy: number | null;
        altitudeAccuracy: number | null;
        heading: number | null;
        speed: number | null;
    }
    timestamp: number;
};

export const GET_LOCATION = "GET_LOCATION";

interface GetLocationAction {
    type: typeof GET_LOCATION;
    payload: LocationState;
};

export type LocationActionTypes = GetLocationAction;
