/** @format */

import {name as appName} from './app.json'
import {AppRegistry, YellowBox} from 'react-native'
//该全局文件的倒入只需一次，且需要在其他文件声明之前
import './src/constants/Global'
import {Initializer} from 'react-native-baidumap-sdk'
import RootApp from './App'
Initializer.init('juBhn3zkUi3YIeHa9dCb3CurfiNxMFT0').catch(e => console.error(e))

YellowBox.ignoreWarnings([
    'Warning: isMounted(...) is deprecated in plain JavaScript React classes',
    'Remote debugger is in a background tab which may cause apps to perform slowly',
    'Class RCTCxxModule was not exported.',
    'Module RCTImageLoader requires main queue setup since it overrides',
    'Debugger and device times have drifted by more than 60s.'
])

if (!__DEV__) {
    global.console = {
        info: () => {
        },
        debug: () => {
        },
        error: () => {
        },
        log: () => {
        },
        warn: () => {
        }
    }
}


AppRegistry.registerComponent(appName, () => RootApp);
