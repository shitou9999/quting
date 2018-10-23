import {TextInput, Text, TouchableOpacity, YellowBox, StatusBar} from 'react-native'
import {addCustomProps} from "../utils/index"
import {Theme} from 'teaset'

Theme.set({
    btnPrimaryColor: '#00A1EA',
    btnPrimaryBorderColor: '#00A1EA'
})

/**
 * 更改三个文件控件字体大小随系统改变的属性,如果想更改其它第三方的默认属性也可以这样改
 */
// addCustomProps(Text, {allowFontScaling: false});
// addCustomProps(TextInput, {allowFontScaling: false});
// addCustomProps(Label, {allowFontScaling: false});
addCustomProps(TouchableOpacity, {activeOpacity: 0.7});
// addCustomProps(ListRow, {activeOpacity: 0.7});
// addCustomProps(Button, {activeOpacity: 0.7});

YellowBox.ignoreWarnings([
    'Warning: isMounted(...) is deprecated in plain JavaScript React classes',
    'Remote debugger is in a background tab which may cause apps to perform slowly',
    'Class RCTCxxModule was not exported.',
    'Module RCTImageLoader requires main queue setup since it overrides',
    'Debugger and device times have drifted by more than 60s.'
])

YellowBox.ignoreWarnings(['Require cycle:'])

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
