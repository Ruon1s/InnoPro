export interface TransportationState {
    "stations": {
        "stopsByRadius": {
            "edges": [
                {
                    "node": {
                        "stop": {
                            "gtfsId": string,
                            "name": string
                        },
                        "distance": number
                    }
                }
            ]
        }
    },
    "departures": {
        "stop": {
            "stoptimesWithoutPatterns": [
                {
                    "scheduledDeparture": number,
                    "serviceDay": number
                }
            ]
        },
    }
}

export const FETCH_TRANSPORT = "FETCH_TRANSPORT";

interface FetchTransportAction {
    type: typeof FETCH_TRANSPORT;
    payload: TransportationState;
}

export type TransportActionTypes = FetchTransportAction;
