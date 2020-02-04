import { combineReducers } from 'redux';
import UserReducer from './reducerUsers';
import DataReducer from './reducerData';
import UIReducer from './reducerUI';

const rootReducer = combineReducers({
  userState: UserReducer,
  dataState: DataReducer,
  UIState: UIReducer
});

export default rootReducer;
