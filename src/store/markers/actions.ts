import {ThunkAction} from "redux-thunk";
import {RootState} from "../index";
import {Action} from "redux";
import {GET_MARKERS, MarkerType} from "./types";
import { setErrorMessage } from "../app/actions";
import { db } from "../../utils/firebaseConfig";

/**
 * all marker related actions
 */

let markers: MarkerType[] = [];
//const db = firebase.firestore();

/**
 * adds a new marker to firebase
 * @param values
 */
export const newMarker = async (values: MarkerType) => {
    //db.collection('markers').add({...values})
    db.markers.add({...values});
};


/**
 * listens to firebase for updates on the markers and puts them to redux state
 */
export const getMarkers = (): ThunkAction<void, RootState, unknown, Action<string>> =>
    async dispatch => {
        const query = db.markers;
        let i = 0;
        console.log('Outside');
        query.onSnapshot(querySnaphot => {
                markers = [];

                console.log(querySnaphot.docs.forEach(doc => {
                    i++;
                    console.log(i);
                    console.log(doc.data());
                    markers.push({...doc.data(), id: doc.id});
                }));
                console.log('array [3]' + markers[0].description);
                dispatch({type: GET_MARKERS, payload: {markers}});
            }
        );
    };

export const removeMarker = (
    id: string
): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {
    try {
        await db.markers.doc(id).delete();
    } catch (error) {
        dispatch(setErrorMessage(error.message, 5));
    }
}