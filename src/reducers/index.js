/**
 * Created by cyh on 2018/7/13.
 */
import {
    combineReducers
} from 'redux';
import nav, {STATE_KEY as NAV_STATE_KEY} from './nav'

import loginReducer from './login';
import meReducer from './me';
/***
 * Reducer配置中心
 * @type {{config}}
 */
const reducers = {};

const rootReducer = combineReducers({
    login: loginReducer,
    me: meReducer,
    [NAV_STATE_KEY]: nav
});


export default rootReducer


// export default getRootReduce = (navReducer) => {
//     return combineReducers({
//         ...reducers,
//         nav: navReducer
//     })
// }