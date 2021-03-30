import {UserState} from "../user/types";

/**
 * typing for the state of markers, An array of marker objects
 */
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


interface GetMarkersActionType {
    type: typeof GET_MARKERS;
    payload: MarkerState;
}


export type MarkerActionTypes = GetMarkersActionType;
