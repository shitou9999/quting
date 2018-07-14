/** @format */

import RootApp from './App';
import {name as appName} from './app.json';
import { AppRegistry,YellowBox} from 'react-native';


YellowBox.ignoreWarnings([
    'Warning: isMounted(...) is deprecated in plain JavaScript React classes',
    'Remote debugger is in a background tab which may cause apps to perform slowly',
    'Class RCTCxxModule was not exported.',
    'Module RCTImageLoader requires main queue setup since it overrides',
    'Debugger and device times have drifted by more than 60s.'
])

if(!__DEV__){
    global.console = {
        info: () => {},
        debug: () => {},
        error: () => {},
        log: () => {},
        warn: () => {}
    }
}


AppRegistry.registerComponent(appName, () => RootApp);
