import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import appFormReducer from './actions';

import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'appForm',
  storage: storage,
  whitelist: ['appForm'], // which reducer want to store
};

const rootReducer = combineReducers({
  appForm: appFormReducer,
});

const pReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(
  pReducer,
  composeWithDevTools(applyMiddleware(thunk, logger))
);
const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export { persistor, store };
export default store;
