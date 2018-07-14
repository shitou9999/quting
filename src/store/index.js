/**
 * Created by cyh on 2018/7/13.
 */
import {
    createStore,
    applyMiddleware
} from 'redux';
import thunkMiddleware from 'redux-thunk';
// import promiseMiddleware from 'redux-promise-middleware';
import loggerMiddleware from 'redux-logger';
import rootReducer from '../reducers/index';
import {navigationMiddleware} from '../AppWithNavigationState';


// 使用applyMiddleware挂载中间件
//中间件 传入createStore方法，就完成了store.dispatch()的功能增强
//中间件的次序有讲究 比如logger就一定要放在最后，否则输出结果会不正确
// let middleware = [navigationMiddleware, thunk, logger];

// const navReducer = createNavigationReducer(AppRouter);


const middlewares = []

middlewares.push(navigationMiddleware)
middlewares.push(thunkMiddleware)
// middlewares.push(promiseMiddleware())


if (__DEV__) {
    middlewares.push(loggerMiddleware)
}


const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore)

export function getStore() {
    return createStoreWithMiddleware(rootReducer)
}


//createStore() 的第二个参数是可选的, 用于设置 state 初始状态。这对开发同构应用时非常有用，
// import Store from './src/store/index';
// export default getStore = () => {
//     return createStore(
//         getRootReduce(navReducer),
//         undefined,
//         applyMiddleware(...middleware)
//     );
// }

