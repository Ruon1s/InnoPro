import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import weatherReducer from './weather/reducers';
import locationReducer from './location/reducers';
import transportationReducer from './transportation/reducers'

const rootReducer = combineReducers({
  weather: weatherReducer,
  location: locationReducer,
  transport: transportationReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk),
);
