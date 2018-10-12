import React, {Component} from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import PropTypes from 'prop-types'
import {NavigationEvents} from 'react-navigation'
import LoadingSpinner from "./LoadingSpinner"
import ErrorView from "./ErrorView"
import TitleBar from "./TitleBar"


class BaseContainer extends Component {

    static propTypes = {
        store: PropTypes.object,		// 页面中的mobx状态
        onErrorPress: PropTypes.func,	// 出错页面的点击事件
        navBar: PropTypes.any,			// 导航条
        children: PropTypes.any,

        style: PropTypes.any,			// 外层View样式
        navStyle: PropTypes.any,		// 导航条样式
        title: PropTypes.string,         //导航标题
        contentViewStyle: PropTypes.any,// 包裹层View样式

        isTopNavigator: PropTypes.bool,	// 是否是顶层页面
        isHiddenNavBar: PropTypes.bool,

        errorTitle: PropTypes.string,   //  错误页文本
        imageSource: PropTypes.string,  // 错误页图片
        errorStyle: PropTypes.string,   // 错误View样式

        bottomStyle: PropTypes.any,
        bottomBackgroundColor: PropTypes.string,
        bottomHeight: PropTypes.number,

        onWillFocus: PropTypes.func,
        onDidFocus: PropTypes.func,
        onWillBlur: PropTypes.func,
        onDidBlur: PropTypes.func,

        ...TitleBar.Props
    }

    static defaultProps = {}

    renderContent() {
        const {store, children, onErrorPress, errorTitle, imageSource, errorStyle} = this.props;
        if (!store) return children;
        const {isLoading, isError, errorInfo} = store;
        if (isLoading) {
            //loadingType: 'page','no'
            if (store.loadingType === 'page') {
                return <LoadingSpinner isVisible={store.isLoading}/>
            } else {
                return (
                    <View style={{flex: 1}}>
                        {children}
                        <LoadingSpinner isVisible={store.isLoading}/>
                    </View>);
            }
        }
        if (isError) return <ErrorView errorStyle={errorStyle} imageSource={imageSource}
                                       title={errorInfo.message}
                                       onErrorPress={onErrorPress}/>;
        // if (isError) return <LoadingSpinner isVisible={store.isLoading}/>;
        return children;
    }

    renderNavView() {
        const {navBar, isTopNavigator, navStyle, title, ...navProps} = this.props;
        let navView = null;
        if (typeof navBar === 'undefined') {
            // navView = <NavigatorBar {...navProps} style={navStyle} isTopNavigator={isTopNavigator} />;
            navView = <TitleBar title={title} {...navProps}/>;
        } else {
            navView = navBar;
        }
        return navView;
    }

    render() {
        const {style, contentViewStyle, isTopNavigator, isHiddenNavBar, onWillFocus, onDidFocus, onWillBlur, onDidBlur} = this.props;
        const backgroundColor = !isTopNavigator && gDevice.iphoneX ? 'red' : null;
        // const marginTop = !isHiddenNavBar ? gScreen.statusBarHeight + 44 : 0; //teset的navBarContentHeight

        return (
            <View style={[styles.container, style]}
                  forceInset={{bottom: 'never', top: 'never'}}
            >
                {!isHiddenNavBar && this.renderNavView()}
                {/*<View style={[styles.contentView, {marginTop, backgroundColor}, style, contentViewStyle]}>*/}
                <View style={[styles.contentView, {backgroundColor}, style, contentViewStyle]}>
                    {this.renderContent()}
                </View>
                <NavigationEvents
                    onWillFocus={onWillFocus}
                    onDidFocus={onDidFocus}
                    onWillBlur={onWillBlur}
                    onDidBlur={onDidBlur}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contentView: {
        flex: 1
    },
});

export default BaseContainer
