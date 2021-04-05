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
        const queryStations = gql`
                    query GetStops($lat: Float!, $lon: Float!){ 
                          stopsByRadius(lat: $lat, lon: $lon, radius: 1000) {
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
                    }`;
        const nearestStations = client.query({
            query: queryStations,
            variables: {
                lat: parseFloat(latitude.toString()),
                lon: parseFloat(longitude.toString())
            }
        });

        const stations = await nearestStations;
        const station = JSON.stringify(stations.data.stopsByRadius.edges[0].node.stop.gtfsId).replace(/"/g, '');

        const queryDepartures = gql`
                    query GetDepartures($station: String!){ 
                          stop(id: $station) {
                              stoptimesWithoutPatterns(numberOfDepartures:1) {
                              scheduledDeparture
                              serviceDay
                            }
                          }    
                    }`;

        const departingLines = client.query({
            query: queryDepartures,
            variables: {
                station: station
            }
        });

        const departures = await departingLines


        let data = {stations: stations.data, departures: departures.data};

        //console.log("Data: " + JSON.stringify(data));

        dispatch({type: FETCH_TRANSPORT, payload: data});
    } catch (error) {
        console.log(`Fetch Transport error: ${error.message}`);
    }
};
