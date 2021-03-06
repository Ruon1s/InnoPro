import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import weatherReducer from './weather/reducers';
import locationReducer from './location/reducers';
import appReducer from './app/reducers';
import userReducer from './user/reducers';
import transportationReducer from './transportation/reducers';
import newsReducer from './news/reducer';
import announcementsReducer from './announcements/reducers';
import eventReducer from './events/reducers'
import markerReducer from './markers/reducers'


const rootReducer = combineReducers({
        weather: weatherReducer,
        location: locationReducer,
        app: appReducer,
        user: userReducer,
        transport: transportationReducer,
        events: eventReducer,
        markers: markerReducer,
        news: newsReducer,
        announcements: announcementsReducer,
    }
);

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(
    rootReducer,
    applyMiddleware(thunk),
);
