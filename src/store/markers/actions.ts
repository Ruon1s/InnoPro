import {ThunkAction} from "redux-thunk";
import {RootState} from "../index";
import {Action} from "redux";
import {MarkerType} from "../../types";
import firebase from 'firebase';
import 'firebase/firestore';
import {GET_MARKERS, MarkerState} from "./types";

/**
 * all marker related actions
 */

let markers: any[] = [];
const db = firebase.firestore();

/**
 * adds a new marker to firebase
 * @param values
 */
export const newMarker = async (values: MarkerType) => {
    db.collection('markers').add({...values})
};


/**
 * listens to firebase for updates on the markers and puts them to redux state
 */
export const getMarkers = (): ThunkAction<void, RootState, unknown, Action<string>> =>
    async dispatch => {
        const query = db.collection('markers');
        let i = 0;

        query.onSnapshot(querySnaphot => {
                console.log(querySnaphot.docs.forEach(doc => {
                    i++;
                    console.log(i);
                    console.log(doc.data());
                    markers.push(doc.data());
                }));
                console.log('array [3]' + markers[0].description);
                dispatch({type: GET_MARKERS, payload: {markers}});
            }
        );
    };

