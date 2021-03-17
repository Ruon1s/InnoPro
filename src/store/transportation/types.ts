export interface TransportationState {
    "data": {
        "stopsByRadius": {
            "edges": [
                {
                    "node": {
                        "stop": {
                            "name": string
                        },
                        "distance": number
                    }
                }
            ]
        }
    }
}

export const FETCH_TRANSPORT = "FETCH_TRANSPORT";

interface FetchTransportAction {
    type: typeof FETCH_TRANSPORT;
    payload: TransportationState;
}

export type TransportActionTypes = FetchTransportAction;
