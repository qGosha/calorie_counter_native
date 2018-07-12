import { combineReducers } from 'redux';
import { auth } from './auth';
import { dash } from './dashboard';
import { foodSearch } from './food_search';
import { basket } from './basket';
import { foodLog } from './food_log';
import { dates } from './date_picker';

const rootReducer = combineReducers({auth, dash, dates, foodSearch, basket, foodLog});

export default rootReducer;
