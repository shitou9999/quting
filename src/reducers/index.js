/**
 * Created by cyh on 2018/7/13.
 */
import {
    combineReducers
} from 'redux';

import navReducer from './nav'
import loginReducer from './login'
import meReducer from './me'
import homeReducer from './home'
import userReducer from './user'
import mapReducer from './map'
import authenticationReducer from './authentication'
import overdueReducer from './overdue'

/***
 * 通过dispatch对应的action来修改状态，而状态的修改由统一的reducer来处理
 * Reducer配置中心
 * @type {{config}}
 */
const reducers = {};

const rootReducer = combineReducers({
    login: loginReducer,
    me: meReducer,
    home: homeReducer,
    user: userReducer,
    map: mapReducer,
    authentication: authenticationReducer,
    overdue: overdueReducer,
    nav: navReducer
});


export default rootReducer


// export default getRootReduce = (navReducer) => {
//     return combineReducers({
//         ...reducers,
//         nav: navReducer
//     })
// }
