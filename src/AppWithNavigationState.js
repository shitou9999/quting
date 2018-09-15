/**
 * Created by cyh on 2018/7/12.
 */
import React from 'react';
import {
    reduxifyNavigator,
    createReactNavigationReduxMiddleware
} from 'react-navigation-redux-helpers';
import {connect} from 'react-redux';
import RootStackNavigator from './router/app';

// const navReducer = createNavigationReducer(AppRouter);

// Note: createReactNavigationReduxMiddleware must be run before reduxifyNavigator
export const navigationMiddleware = createReactNavigationReduxMiddleware(
    "root",
    state => state.nav
);

const ReduxifyApp = reduxifyNavigator(RootStackNavigator, "root");

const mapStateToProps = (state) => ({
    state: state.nav
});

// 根组件连接状态
export const AppWithNavigationState = connect(mapStateToProps)(ReduxifyApp);



