import React from 'react'
import {Dimensions, PixelRatio, StyleSheet, Platform} from 'react-native'
import {isIphoneX, getStatusBarHeight} from 'react-native-iphone-x-helper'

let {height, width} = Dimensions.get('window');

// 系统是IOS
global.IOS = (Platform.OS === 'ios');

// 系统是IOS, 并且手机为 iphoneX:
global.iphoneX = isIphoneX();

// 系统是安卓
global.ANDROID = (Platform.OS === 'android');

// android 和 iOS 版本
global.ANDROIDANDIOSAPI = Platform.Version;

// 状态栏安全区高度
global.STATUSBARHEIGHT_SAFE = getStatusBarHeight(true);
// 状态栏非安全区高度
global.STATUSBARHEIGHT_UNSAFE = getStatusBarHeight(false);

// 获取屏幕宽度
global.SCREEN_WIDTH = width;
// 获取屏幕高度
global.SCREEN_HEIGHT = height;

// 获取屏幕分辨率(即该设备的像素密度)
global.PixelRatio = PixelRatio.get();

// 最小线宽
global.pixel = 1 / PixelRatio.get();

// 最小线宽
global.hairlineWidth = StyleSheet.hairlineWidth;





