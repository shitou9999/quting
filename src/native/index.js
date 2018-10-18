import {Platform, NativeModules} from 'react-native'
// import {PushUtil} from '../../native/push'
import Pay from '../native/Pay'

const PushUtil = NativeModules.UMPushModule
const AnalyticsUtil = NativeModules.UMAnalyticsModule

export {
    Pay,
    PushUtil,
    AnalyticsUtil,
}
