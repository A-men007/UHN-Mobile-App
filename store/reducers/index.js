import { combineReducers } from 'redux';
import TimerReducer from './TimerReducer';

export default combineReducers({
    timer: TimerReducer,
});