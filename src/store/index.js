/**
 * Created by cyh on 2018/7/13.
 */
import {createStore, applyMiddleware} from 'redux';
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
//配置了redux-thunk这个中间件的情况下，你发起的任何action方法，都会走thunk这个中间件
middlewares.push(thunkMiddleware)
// middlewares.push(promiseMiddleware())
if (__DEV__) {
    middlewares.push(loggerMiddleware)
}

//中间件就是把store.dispatch进行改造，在发出 Action 和执行 Reducer 这两步之间，添加了其他功能
const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore)

export const getStore = () => {
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

