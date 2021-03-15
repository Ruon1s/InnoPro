import {Action} from "redux";
import {ThunkAction} from "redux-thunk";
import {RootState} from "..";
import {FETCH_TRANSPORT} from "./types";
import {useQuery,gql} from "@apollo/client";


export const fetchTransport = (
    lat: number,
    lon: number
): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {
    try {
        const endpoint = 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql';
        const NEAREST_STATION_QUERY = gql;


        const toJSON = "await nearestStations";

        dispatch({type: FETCH_TRANSPORT, payload: toJSON});
    } catch (error) {
        console.log(`Fetch Transport error: ${error.message}`);
    }
};
