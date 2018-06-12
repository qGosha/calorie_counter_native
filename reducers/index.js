import { combineReducers } from 'redux';
import { auth } from './auth';
import { dash } from './dashboard';
import { foodSearch } from './food_search';
import { basket } from './basket';
import { modal } from './modal';
import { foodLog } from './food_log';
import { dates } from './date_picker';

const rootReducer = combineReducers({ dash, auth, foodSearch, basket, modal, foodLog, dates});

export default rootReducer;
