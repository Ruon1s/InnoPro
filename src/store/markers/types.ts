import {UserState} from "../user/types";


export interface MarkerState {
    markers: {
        description: string;
        lon: number;
        lat: number;
        timestamp: string;
        color: string;
    }[];
}

export const GET_MARKERS = "GET_MARKERS";


interface GetMarkersActionType{
    type: typeof GET_MARKERS;
    payload: MarkerState;
}


export type MarkerActionTypes = GetMarkersActionType;
