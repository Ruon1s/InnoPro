import Constants from 'expo-constants';
import firebase from 'firebase';
import {UserState} from '../store/user/types';

export const firebaseConfig = {
    apiKey: Constants.manifest.extra.apiKey,
    authDomain: Constants.manifest.extra.authDomain,
    databaseURL: Constants.manifest.extra.databaseURL,
    projectId: Constants.manifest.extra.projectId,
    storageBucket: Constants.manifest.extra.storageBucket,
    messagingSenderId: Constants.manifest.extra.messagingSenderId,
    appId: Constants.manifest.extra.appId,
    measurementId: Constants.manifest.extra.measurementId,
};

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

const converter = <T>() => ({
    toFirestore: (data: Partial<T>) => data,
    fromFirestore: (snapshot: firebase.firestore.QueryDocumentSnapshot) => snapshot.data() as T,
});

const dataPoint = <T>(collectionPath: string) => firebase.firestore().collection(collectionPath).withConverter(converter<T>());

export const db = {
    users: dataPoint<UserState>('users')
}
