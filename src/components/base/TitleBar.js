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
import {width, unitWidth, titleHeight, statusBarHeight} from '../../constants/AdapterUtil'
import {commonStyle} from "../../constants/commonStyle"
import {withNavigation} from 'react-navigation'

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

const TitleStyle = StyleSheet.create({
    titleBar: {
        width: gScreen.screen_width,
        height: titleHeight,
        backgroundColor: commonStyle.themeColor,
    },
    titleBarContent: {
        flexDirection: 'row',
        alignItems: 'center',
        width: gScreen.screen_width,
        justifyContent: 'space-between',
        height: titleHeight - statusBarHeight,
    },
    titleBarSearchContent: {
        flexDirection: 'row',
        alignItems: 'center',
        width: gScreen.screen_width,
        height: titleHeight - statusBarHeight,
    },
    searchLeftIcon: {
        width: unitWidth * 30,
        height: unitWidth * 38,
        resizeMode: 'stretch',
        marginLeft: unitWidth * 24,
        marginRight: unitWidth * 15
    },
    searchLeftText: {
        width: unitWidth * 140,
        fontSize: unitWidth * 30,
        color: "#ffffff",
    },

    searchBlock: {
        flexDirection: 'row',
        width: unitWidth * 500,
        height: unitWidth * 60,
        borderRadius: unitWidth * 30,
        backgroundColor: "white",
        alignItems: 'center',
        paddingLeft: unitWidth * 30,
        paddingRight: unitWidth * 30
    },

    searchIcon: {
        width: unitWidth * 40,
        height: unitWidth * 40,
        resizeMode: 'stretch',
        marginRight: unitWidth * 30
    },

    searchBarInput: {
        width: unitWidth * 350,
        height: unitWidth * 60,
        fontSize: unitWidth * 30,
        backgroundColor: 'transparent',
        alignItems: 'center',
        margin: 0,
        padding: 0
    },


    left: {
        width: unitWidth * 180,
        height: titleHeight,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: unitWidth * 10,
    },
    middle: {
        width: width - unitWidth * 360,
        height: titleHeight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    middleTitle: {
        fontSize: unitWidth * 40,
        color: "white",
        alignItems: 'center',
        justifyContent: 'center'
    },

    right: {
        width: unitWidth * 180,
        height: titleHeight,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight: unitWidth * 30,
    },

    leftText: {
        fontSize: unitWidth * 30,
        color: "white",
        alignItems: 'center',
        justifyContent: 'center'
    },
    // 左边字
    rightText: {
        fontSize: unitWidth * 30,
        color: "white",
        alignItems: 'center',
        justifyContent: 'center'
    },
    rightImage: {
        width: unitWidth * 60,
        height: unitWidth * 60,
        resizeMode: 'contain',
        marginLeft: unitWidth * 5
    },

    titleLeftImage: {
        width: unitWidth * 50,
        height: unitWidth * 35,
        marginRight: unitWidth * 5,
        resizeMode: 'contain'
    },

    homeTitleIcon: {
        width: unitWidth * 213,
        height: unitWidth * 52,
        resizeMode: 'stretch'
    },
    titleRightImage: {
        width: unitWidth * 65,
        height: unitWidth * 65,
        resizeMode: 'contain'
    },
    statusBar: {
        width: gScreen.screen_width,
        height: gScreen.statusBarHeight,
        backgroundColor: 'transparent'
    }
})
