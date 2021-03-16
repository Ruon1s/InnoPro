import {Action} from "redux";
import {ThunkAction} from "redux-thunk";
import {RootState} from "..";
import {FETCH_TRANSPORT} from "./types";
import {ApolloClient, InMemoryCache, gql} from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql',
    cache: new InMemoryCache()
});

export const fetchTransport = (
    latitude: number,
    longitude: number
): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {
    try {
        const query = gql`
                    query GetStops($lat: Float!, $lon: Float!){ 
                          stopsByRadius(lat: $lat, lon: $lon, radius: 1000) {
                                edges{
                                    node{
                                        stop{
                                            name
                                        }
                                        distance
                                    }
                                }
                          }
                    }`;
        const nearestStations = client.query({
            query: query,
            variables: {
                lat: parseFloat(latitude.toString()),
                lon: parseFloat(longitude.toString())
            }
        });
            //.then(result => console.log("DATAAA: " + JSON.stringify(result.data.stopsByRadius)));

        const data = await nearestStations;

        dispatch({type: FETCH_TRANSPORT, payload: data});
    } catch (error) {
        console.log(`Fetch Transport error: ${error.message}`);
    }
};
