import {GET_LOCATION, LocationActionTypes, LocationState, SET_CITY_NAME} from "./types"

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
    city: ''
};

/**
 * basic redux reducer. Returns object from the state.
 * @param state
 * @param action
 */
const reducer = (state = initialState, action: LocationActionTypes) => {
    switch (action.type) {
        case GET_LOCATION:
            return {
                ...state,
                ...action.payload
            };
        case SET_CITY_NAME:
            return {
                ...state,
                city: action.payload,
            }
        default:
            return state;
    }
}

export default reducer;
