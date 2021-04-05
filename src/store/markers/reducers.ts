import {GET_MARKERS, MarkerActionTypes, MarkerState} from "./types";

// initial state for markers if they're not found
const initialState: MarkerState = {
    markers: [
        {
            description: 'initial',
            lon: 0,
            lat: 0,
            timestamp: '00.00.00',
            color: 'red',
        },
    ]
};

/**
 * basic redux reducer, returns an array of marker objects
 */

const reducer = (state = initialState, action: MarkerActionTypes) => {
    switch (action.type) {
        case GET_MARKERS:
            return action.payload;
        default:
            return state;
    }
};

export default reducer;
