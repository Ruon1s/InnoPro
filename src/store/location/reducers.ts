import {GET_LOCATION, LocationActionTypes, LocationState} from "./types"

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
const reducer = (state = initialState, action: LocationActionTypes) => {
    switch (action.type) {
        case GET_LOCATION:
            return {...action.payload};
        default:
            return state;
    }
}

export default reducer;
