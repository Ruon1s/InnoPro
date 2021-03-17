import {Action} from "redux";
import {ThunkAction} from "redux-thunk";
import {RootState} from "..";
import {GET_LOCATION} from "./types";
import * as Location from 'expo-location';
import {LocationAccuracy} from "expo-location";
import {toggleLoading} from "../app/actions";


export const getLocation = (): ThunkAction<void, RootState, unknown, Action<string>> =>
    async dispatch => {
<<<<<<< HEAD
            try{
                let { status } = await Location.requestPermissionsAsync();
                if (status !== 'granted') {
                    console.log('Permission to access location was denied');
                    return;
                }
                await Location.watchPositionAsync({accuracy: LocationAccuracy.High, timeInterval: 10000, distanceInterval: 0.1},
                    (loc) => {
                        let i = 0;
                        i++;
                        console.log(i.toString() + loc.coords.latitude);
                        dispatch({ type: GET_LOCATION, payload: loc });
                    },
                )
            } catch(e) {
                console.log(e)
            }

};
=======
        try {
            let {status} = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            console.log('lati ' + location.coords.latitude + ' long ' + location.coords.longitude);

            const toJSON = location;

            dispatch({type: GET_LOCATION, payload: toJSON});
        } catch (e) {
            console.log(`location error: ${e.message}`);
        }


    }
>>>>>>> lauri
