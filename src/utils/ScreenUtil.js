/**
 * 屏幕适配
 * @type {number}
 */
import {
    PixelRatio,
    Dimensions,
    Platform,
    AsyncStorage
} from 'react-native';

const {width, height} = Dimensions.get('window')

//像素密度
const defaultPixel = 2;
//iphone6的像素密度
const defaultWidth = Platform.OS === 'ios' ? 750 : 720
const defaultHeight = Platform.OS === 'ios' ? 1334 : 1280
//px转换成dp
const w2 = defaultWidth / defaultPixel;
const h2 = defaultHeight / defaultPixel;
const scale = Math.min(height / h2, width / w2);   //获取缩放比例
// 获取屏幕分辨率(即该设备的像素密度)
const pixelRatio = PixelRatio.get()
const fontScale = PixelRatio.getFontScale()

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

//缩放比例
const _scaleWidth = width / 750
const _scaleHeight = height / 1334

/**
 * 宽度适配,缩放size , 默认根据宽度适配，纵向也可以使用此方法
 * 横向的尺寸直接使用此方法
 * 如：width ,paddingHorizontal ,paddingLeft ,paddingRight ,marginHorizontal ,marginLeft ,marginRight
 * @param size 设计图的尺寸
 * @returns {number}
 */
export function autoWidth(size) {
    return _scaleWidth * size
}


/**
 * 高度适配, 纵向的尺寸使用此方法应该会更趋近于设计稿
 * 如：height ,paddingVertical ,paddingTop ,paddingBottom ,marginVertical ,marginTop ,marginBottom
 * @param size 设计图的尺寸
 * @returns {number}
 */
export function autoHeight(size) {
    return _scaleHeight * size
}


