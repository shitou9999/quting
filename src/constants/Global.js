import React from 'react'
import {Dimensions, PixelRatio, StyleSheet, StatusBar, Platform} from 'react-native'
import {isIphoneX, getStatusBarHeight} from 'react-native-iphone-x-helper'
import {storage} from '../utils/storage'

const {width, height} = Dimensions.get('window');
// 系统是OS
const OS = Platform.OS;
// 系统是IOS
const IOS = (Platform.OS === 'ios');
// 系统是IOS, 并且手机为 iphoneX:
const iphoneX = isIphoneX();
// const isIPhoneX = (ios && height == 812 && width == 375);
// 系统是安卓
const ANDROID = (Platform.OS === 'android');
// android 和 iOS 版本
const ANDROID_AND_IOS_API = Platform.Version;

global.gStorage = storage
// global.gStorage = {
//     storage: storage
// }

global.gDevice = {
    ios: IOS,
    android: ANDROID,
    iphoneX: iphoneX,
    version: ANDROID_AND_IOS_API,
}

// 获取屏幕宽度
const SCREEN_WIDTH = width;
// 获取屏幕高度
const SCREEN_HEIGHT = height;
// 获取屏幕分辨率(即该设备的像素密度)
// const PixelRatio = PixelRatio.get();
const statusBarHeight = (IOS ? (iphoneX ? 44 : 20) : StatusBar.currentHeight);
// 状态栏安全区高度
const STATUS_BAR_HEIGHT_SAFE = getStatusBarHeight(true);
// 状态栏非安全区高度
const STATUS_BAR_HEIGHT_UNSAFE = getStatusBarHeight(false);

global.gScreen = {
    screen_width: width,
    screen_height: height,
    statusBarHeight: statusBarHeight,
    onePixelRatio: 1 / PixelRatio.get(),
    resolution: PixelRatio,
    statusBar_safe: STATUS_BAR_HEIGHT_SAFE,
    statusBar_unsafe: STATUS_BAR_HEIGHT_UNSAFE,
    deviceHeight:IOS ? height : height - 24,
}

// 最小线宽(像素)
const pixel = 1 / PixelRatio.get();
// 最小线宽
const hairlineWidth = StyleSheet.hairlineWidth;

//pixel size
const pixelSize = (function() {
    let pixelRatio = PixelRatio.get();
    if (pixelRatio >= 3) return 0.333;
    else if (pixelRatio >= 2) return 0.5;
    else return 1;
})();

global.gLine = {
    minLine: pixel,
    hairLine: hairlineWidth,
}






