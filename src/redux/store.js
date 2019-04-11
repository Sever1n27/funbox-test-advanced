import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import ReduxThunk from 'redux-thunk';

import rootReducer from './reducer';

const logger = createLogger({
  collapsed: true
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk, logger));

if (process.env.NODE_ENV === 'development') {
  window.store = store;
}
export default store;
