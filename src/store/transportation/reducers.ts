import {FETCH_TRANSPORT, TransportActionTypes, TransportationState} from "./types"

const initialState: TransportationState = {
    "stations": {
        "stopsByRadius": {
            "edges": [
                {
                    "node": {
                        "stop": {
                            "gtfsId": '',
                            "name": ''
                        },
                        "distance": 0
                    }
                }
            ]
        }
    },
    "departures": {
        "stop": {
            "stoptimesWithoutPatterns": [
                {
                    "scheduledDeparture": 0,
                    "serviceDay": 0
                }
            ]
        },
    }
};

const reducer = (state = initialState, action: TransportActionTypes) => {
    switch (action.type) {
        case FETCH_TRANSPORT:
            return {...action.payload};
        default:
            return state;
    }
};
export default reducer;
