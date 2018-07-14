/**
 * Created by cyh on 2018/7/13.
 */
import {
    combineReducers
} from 'redux';
import nav, {STATE_KEY as NAV_STATE_KEY} from './nav'


const rootReducer = combineReducers({
    [NAV_STATE_KEY]: nav
})



export default rootReducer

/***
 * Reducer配置中心
 * @type {{config}}
 */
const reducers = {

};


// export default getRootReduce = (navReducer) => {
//     return combineReducers({
//         ...reducers,
//         nav: navReducer
//     })
// }