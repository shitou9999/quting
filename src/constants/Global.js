/**
 * 设置一些全局变量，global需慎用
 */
import React from 'react'
import {Dimensions, PixelRatio, StyleSheet, StatusBar, Platform} from 'react-native'
import {isIphoneX, getStatusBarHeight} from 'react-native-iphone-x-helper'
import {storage} from '../utils/storage'

const {width, height} = Dimensions.get('window')
// 获取屏幕分辨率(即该设备的像素密度)
const pixelRatio = PixelRatio.get()
let fontScale = PixelRatio.getFontScale()  //返回字体大小缩放比例

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


//苹果刘海屏开始，出了一个SafeArea的概念，带刘海设计的iphone，顶部导航的高度由原来的64，变成了88，
// 因为状态栏的高度由原来的20变成了44；底部导航栏的高度由原来的49，变成了83。
const statusBarHeight = (IOS ? (iphoneX ? 44 : 20) : StatusBar.currentHeight);
// 状态栏安全区高度
const STATUS_BAR_HEIGHT_SAFE = getStatusBarHeight(true);
// 状态栏非安全区高度
const STATUS_BAR_HEIGHT_UNSAFE = getStatusBarHeight(false);

global.gScreen = {
    screen_width: width,
    screen_height: height,
    statusBarHeight: statusBarHeight,
    onePixelRatio: 1 / pixelRatio,
    resolution: PixelRatio,
    statusBar_safe: STATUS_BAR_HEIGHT_SAFE,
    statusBar_unsafe: STATUS_BAR_HEIGHT_UNSAFE,
    deviceHeight: IOS ? height : height - 24,
}

// 最小线宽(像素)
const pixel = 1 / pixelRatio;
// 最小线宽
const hairlineWidth = StyleSheet.hairlineWidth;

//pixel size
const pixelSize = (function () {
    let pixelRatio = pixelRatio;
    if (pixelRatio >= 3) return 0.333;
    else if (pixelRatio >= 2) return 0.5;
    else return 1;
})();

global.gLine = {
    minLine: pixel,
    hairLine: hairlineWidth,
}


//像素密度
const defaultPixel = 2;
//iphone6的像素密度
const defaultWidth = Platform.OS === 'ios' ? 750 : 720
const defaultHeight = Platform.OS === 'ios' ? 1334 : 1280
//px转换成dp
const w2 = defaultWidth / defaultPixel;
const h2 = defaultHeight / defaultPixel;
const scale = Math.min(height / h2, width / w2);   //获取缩放比例

/**
 * 设置text为sp
 * 字体大小适配，例如我的设计稿字体大小是17pt->setSpText(17)
 * @param size sp
 * return number dp
 */
export function setSpText(size) {
    // size = size/pixelRatio;
    size = Math.round((size * scale + 0.5) * pixelRatio / fontScale)
    return size / pixelRatio
}


export function scaleSize(size) {
    size = Math.round(size * scale + 0.5)
    return size / defaultPixel
}


global.FONT = setSpText;
global.SCALE = scaleSize;
