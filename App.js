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
import {getStore} from './src/store/index'
// import CodePush from 'react-native-code-push'
const store = getStore()

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <AppWithNavigationState/>
            </Provider>
        );
    }
}

// let codePushOptions = { checkFrequency: CodePush.CheckFrequency.MANUAL };
//
// App = CodePush(codePushOptions)(App);
