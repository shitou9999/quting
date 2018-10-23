"use strict";

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    View,
    Image,
    StatusBar,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import {commonStyle} from "../../constants/commonStyle"
import {withNavigation} from 'react-navigation'
import {ScreenUtil} from '../../utils/index'

/**
 * withNavigation在任何页面或者组件中都能得到navigation对象
 */
//<TitleBar title={"意见反馈"} navigation={navigation}/>
class TitleBar extends Component {

    // title：中间的文字标题
// navigation：react-natvigation导航器 用于返回上个页面
// hideLeftArrow：是否隐藏左侧的返回按钮
// pressLeft：左侧按钮的点击事件
// pressRight：右侧按钮的点击事件
// -left：左侧按钮文字
// backgroundColor：背景色
// titleColor：标题的文字颜色
// right：右侧按钮的文字或者组件
// rightImage：右侧按钮的图标
// LeftImage：左侧按钮的图片
// barStyle：状态栏样式

    static propTypes = {
        title: PropTypes.string.isRequired,
        navigation: PropTypes.object,
        hideLeftArrow: PropTypes.bool,
        pressLeft: PropTypes.func,
        pressRight: PropTypes.func,
        left: PropTypes.string,
        backgroundColor: PropTypes.string,
        titleColor: PropTypes.string,
        right: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object,
        ]),
        rightImage: Image.propTypes.source,
        LeftImage: Image.propTypes.source,
        statusBarBgColor: PropTypes.string,
        barStyle: PropTypes.string,//状态栏文字的颜色default：黑色文字（默认）light-content：白色文字
    }

    static defaultProps = {
        title: "",
        hideLeftArrow: false,
        pressRight: () => {
        },
    }

    back() {
        if (this.props.pressLeft) {
            this.props.pressLeft()
            return
        }
        this.props.navigation.goBack()
    }

    render() {
        const {backgroundColor, titleColor} = this.props
        return (
            <View style={[TitleStyle.titleBar, backgroundColor ? {backgroundColor: backgroundColor} : null]}>
                {/*StatusBar.setBarStyle('light-content');//是设置为白色(仅IOS有效)*/}
                {/*StatusBar.setBarStyle('dark-content');//是设置为黑色(仅IOS有效)*/}
                {/*!IOS && StatusBar.setBackgroundColor('#6a51ae')//Android可以修改背景色*/}
                <StatusBar
                    backgroundColor={this.props.statusBarBgColor || "transparent"}
                    barStyle={this.props.barStyle || 'light-content'}
                    translucent={true}/>
                <View style={TitleStyle.statusBar}/>

                <View style={TitleStyle.titleBarContent}>
                    {this.props.hideLeftArrow ? (
                        <View style={TitleStyle.left}/>
                    ) : (
                        <TouchableOpacity activeOpacity={1} onPress={this.back.bind(this)}
                                          style={TitleStyle.left}>
                            <Image style={TitleStyle.titleLeftImage}
                                   source={require('../../assets/images/app_bar_back.png')}/>
                            {/*source={this.props.LeftImage|| Images.public.arrow_left_white}/>*/}
                            <Text style={TitleStyle.leftText}>{this.props.left}</Text>
                        </TouchableOpacity>
                    )}
                    <View style={TitleStyle.middle}>
                        <Text numberOfLines={1}
                              style={[TitleStyle.middleTitle, titleColor ? {color: titleColor} : null]}>{this.props.title}</Text>
                    </View>
                    {this.renderRight()}
                </View>
            </View>
        );
    }

    renderRight() {
        if (!this.props.right && !this.props.rightImage) {
            return <View style={TitleStyle.right}/>
        }
        return (
            <TouchableOpacity activeOpacity={1} style={TitleStyle.right}
                              onPress={() => {
                                  this.props.pressRight()
                              }}>
                {typeof this.props.right == 'object' ? (this.props.right) : (
                    <Text style={TitleStyle.rightText}>{this.props.right}</Text>
                )}
                {this.props.rightImage ? (
                    <Image style={TitleStyle.rightImage} source={this.props.rightImage}/>
                ) : (null)}
            </TouchableOpacity>
        )
    }
}

export default withNavigation(TitleBar)

let statusBarHeight = gScreen.statusBarHeight
let titleBarHeight = ScreenUtil.autoHeight(160)


const TitleStyle = StyleSheet.create({
    titleBar: {
        width: gScreen.screen_width,
        height: titleBarHeight,
        backgroundColor: commonStyle.themeColor,
    },
    titleBarContent: {
        flexDirection: 'row',
        alignItems: 'center',
        width: gScreen.screen_width,
        justifyContent: 'space-between',
        height: titleBarHeight - statusBarHeight,
    },
    titleBarSearchContent: {
        flexDirection: 'row',
        alignItems: 'center',
        width: gScreen.screen_width,
        height: titleBarHeight - statusBarHeight,
    },
    searchLeftIcon: {
        width: ScreenUtil.autoWidth(30),
        height: ScreenUtil.autoHeight(38),
        resizeMode: 'stretch',
        marginLeft: ScreenUtil.autoWidth(24),
        marginRight: ScreenUtil.autoWidth(15)
    },
    searchLeftText: {
        width: ScreenUtil.autoWidth(140),
        fontSize: FONT(18),
        color: "#ffffff",
    },

    searchBlock: {
        flexDirection: 'row',
        width: ScreenUtil.autoWidth(500),
        height: ScreenUtil.autoHeight(60),
        borderRadius: ScreenUtil.scaleSize(30),
        backgroundColor: "white",
        alignItems: 'center',
        paddingLeft: ScreenUtil.autoWidth(30),
        paddingRight: ScreenUtil.autoWidth(30),
    },

    searchIcon: {
        width: ScreenUtil.autoWidth(40),
        height: ScreenUtil.autoHeight(40),
        resizeMode: 'stretch',
        marginRight: ScreenUtil.autoWidth(30),
    },

    searchBarInput: {
        width: ScreenUtil.autoWidth(350),
        height: ScreenUtil.autoHeight(60),
        fontSize: FONT(18),
        backgroundColor: 'transparent',
        alignItems: 'center',
        margin: 0,
        padding: 0
    },


    left: {
        width: ScreenUtil.autoWidth(180),
        height: titleBarHeight,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: ScreenUtil.autoWidth(10),
    },
    middle: {
        width: gScreen.screen_width - ScreenUtil.autoWidth(360),
        height: titleBarHeight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    middleTitle: {
        fontSize: FONT(18),
        color: "white",
        alignItems: 'center',
        justifyContent: 'center'
    },

    right: {
        width: ScreenUtil.autoWidth(180),
        height: titleBarHeight,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight: ScreenUtil.autoWidth(30),
    },

    leftText: {
        fontSize: FONT(18),
        color: "white",
        alignItems: 'center',
        justifyContent: 'center'
    },
    // 左边字
    rightText: {
        fontSize: FONT(18),
        color: "white",
        alignItems: 'center',
        justifyContent: 'center'
    },
    rightImage: {
        width: ScreenUtil.autoWidth(60),
        height: ScreenUtil.autoHeight(60),
        resizeMode: 'contain',
        marginLeft: ScreenUtil.autoWidth(5),
    },

    titleLeftImage: {
        width: ScreenUtil.autoWidth(50),
        height: ScreenUtil.autoHeight(35),
        marginRight: ScreenUtil.autoWidth(5),
        resizeMode: 'contain'
    },

    homeTitleIcon: {
        width: ScreenUtil.autoWidth(213),
        height: ScreenUtil.autoHeight(52),
        resizeMode: 'stretch'
    },
    titleRightImage: {
        width: ScreenUtil.autoWidth(65),
        height: ScreenUtil.autoWidth(65),
        resizeMode: 'contain'
    },
    statusBar: {
        width: gScreen.screen_width,
        height: gScreen.statusBarHeight,
        backgroundColor: 'transparent'
    }
})
