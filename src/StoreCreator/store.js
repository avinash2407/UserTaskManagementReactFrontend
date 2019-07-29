import { createStore, applyMiddleware } from 'redux';
import baseReducer from '../Reducers';
import thunkMiddleware from 'redux-thunk';

export const store = createStore(baseReducer, applyMiddleware(thunkMiddleware));

export default store;
