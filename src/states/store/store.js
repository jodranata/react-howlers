import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/reducerRoot';

const middlewares = [thunk];

const store = createStore(
  rootReducer,
  undefined,
  applyMiddleware(...middlewares)
);

export default store;
