import {ThunkAction} from "redux-thunk";
import {RootState} from "../index";
import {Action} from "redux";
import {GET_MARKERS, MarkerType} from "./types";
import { setNotificationMessage } from "../app/actions";
import { db } from "../../utils/firebaseConfig";
import { NotificationTypes } from "../app/types";

/**
 * all marker related actions
 */

let markers: MarkerType[] = [];
//const db = firebase.firestore();

/**
 * adds a new marker to firebase
 * @param values
 */
export const newMarker = (
    values: MarkerType
): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {
    try {
        //db.collection('markers').add({...values})
        await db.markers.add({...values});

        dispatch(setNotificationMessage('New marker added!', NotificationTypes.Success, 5));
    } catch (error) {
        dispatch(setNotificationMessage(error.message, NotificationTypes.Error, 5));
    }
};


/**
 * listens to firebase for updates on the markers and puts them to redux state
 */
export const getMarkers = (): ThunkAction<void, RootState, unknown, Action<string>> =>
    async dispatch => {
        const query = db.markers;
        let i = 0;

        query.onSnapshot(querySnaphot => {
                markers = [];

                console.log(querySnaphot.docs.forEach(doc => {
                    i++;
                    console.log(i);
                    console.log(doc.data());
                    markers.push({...doc.data(), id: doc.id});
                }));
                //console.log('array [3]' + markers[0].description);
                dispatch({type: GET_MARKERS, payload: {markers}});
            }
        );
    };

export const removeMarker = (
    id: string
): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {
    try {
        await db.markers.doc(id).delete();
        dispatch(setNotificationMessage('Marker removed!', NotificationTypes.Success, 5));
    } catch (error) {
        dispatch(setNotificationMessage(error.message, NotificationTypes.Error, 5));
    }
}