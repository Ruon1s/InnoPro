import {GET_LOCATION, LocationActionTypes, LocationState} from "./types"

//initial state if location hasn't been found
const initialState: LocationState = {
    coords: {
        latitude: 0,
        longitude: 0,
        altitude: null,
        accuracy: null,
        altitudeAccuracy: null,
        heading: null,
        speed: null,
    },
    timestamp: 0,
};

/**
 * basic redux reducer. Returns object from the state.
 * @param state
 * @param action
 */
const reducer = (state = initialState, action: LocationActionTypes) => {
    switch (action.type) {
        case GET_LOCATION:
            return {...action.payload};
        default:
            return state;
    }
}

export default reducer;
