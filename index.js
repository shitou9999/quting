/** @format */

import {name as appName} from './app.json'
import {AppRegistry, YellowBox} from 'react-native'
//该全局文件的倒入只需一次，且需要在其他文件声明之前
import './src/constants/Config'
import './src/constants/Global'
import {Initializer} from 'react-native-baidumap-sdk'
import RootApp from './App'

Initializer.init('juBhn3zkUi3YIeHa9dCb3CurfiNxMFT0').catch(e => console.error(e))


AppRegistry.registerComponent(appName, () => RootApp);
