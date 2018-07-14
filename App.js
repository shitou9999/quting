/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {Component} from 'react';
import {AppWithNavigationState} from './src/AppWithNavigationState';
import {Provider} from "react-redux";
import {getStore} from './src/store/index';
const store = getStore();

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <AppWithNavigationState/>
            </Provider>
        );
    }
}


