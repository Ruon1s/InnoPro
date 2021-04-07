import {Action} from "redux";
import {ThunkAction} from "redux-thunk";
import {RootState} from "..";
import {GET_LOCATION, SET_CITY_NAME} from "./types";
import * as Location from 'expo-location';
import {LocationAccuracy} from "expo-location";
import {setNotificationMessage, toggleLoading} from "../app/actions";
import { NotificationTypes } from "../app/types";

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


export const getCurrentLocationName = (
    latitude: number, 
    longitude: number
): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {
    try {
        const address = await Location.reverseGeocodeAsync({ latitude, longitude });
        if (address.length > 0 && address[0].city !== undefined) {
            dispatch({ type: SET_CITY_NAME, payload: address[0].city });
        }
    } catch (error) {
        dispatch(setNotificationMessage(error.message, NotificationTypes.Error, 5));
    }
}