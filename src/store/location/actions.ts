import {Action} from "redux";
import {ThunkAction} from "redux-thunk";
import {RootState} from "..";
import {GET_LOCATION} from "./types";
import * as Location from 'expo-location';
import {LocationAccuracy} from "expo-location";
import {toggleLoading} from "../app/actions";

/**
 *  All actions for location
 **/


/**
 * Listens to location with expo-location and each time it updates it sets the location state in redux
 */
export const getLocation = (): ThunkAction<void, RootState, unknown, Action<string>> =>
    async dispatch => {
        try {
            let {status} = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }
            await Location.watchPositionAsync({
                    accuracy: LocationAccuracy.High,
                    timeInterval: 10000,
                    distanceInterval: 0.1
                },
                (loc) => {
                    let i = 0;
                    i++;
                    dispatch({type: GET_LOCATION, payload: loc});
                },
            )
        } catch (e) {
            console.log(e)
        }

    };
