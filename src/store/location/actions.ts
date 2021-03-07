import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "..";
import {GET_LOCATION} from "./types";
import * as Location from 'expo-location';


export const getLocation = () : ThunkAction<void, RootState, unknown, Action<string>> =>
    async dispatch => {
    try{
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return;
        }
        let location = await Location.getCurrentPositionAsync({});
        console.log('long' + location.coords.longitude + 'lati' + location.coords.latitude + 'uwuu');

        const toJSON = location;

        dispatch({ type: GET_LOCATION, payload: toJSON });
    } catch(e){
        console.log(`location error: ${e.message}`);
    }


}
