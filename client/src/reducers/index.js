import {combineReducers} from 'redux';
import alert from './alert';
import auth from './auth';
import complaints from './complaints';
import users from './users';

export default combineReducers({
    alert,
    auth,
    complaints,
    users
});