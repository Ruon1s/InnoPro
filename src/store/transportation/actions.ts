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
                    query GetStops($lati: int, $long: int){ 
                      stopsByRadius(lat: $lati, lon: $long, radius: 250) {
                        edges{
                            node{
                                stop{
                                    gtfsId
                                    name
                                }
                                distance
                            }
                        }
                      }
                    }
                `;
        client.query({
            query: query,
            variables: {
                lati: latitude,
                long: longitude
            }
        })
            .then(result => console.log("DATAAA: " + JSON.stringify(result.data)));

        const toJSON = "await nearestStations";

        dispatch({type: FETCH_TRANSPORT, payload: toJSON});
    } catch (error) {
        console.log(`Fetch Transport error: ${error.message}`);
    }
};
