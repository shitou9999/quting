/**
 * Created by guoshuyu on 2017/11/12.
 */
import React, {Component} from 'react';
import {Text, View, BackHandler, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
//这个组件比React Native 官方提供的Modal组件相比使用起来
//更舒服，有动人的弹出动画，渲染的背景比Modal要好，它是那种淡入淡出的，而Modal是生硬的推进的
import Modal from 'react-native-modalbox';
import Spinner from 'react-native-spinkit';

import Global from '../constants/global';


/**
 * 加载中Modal
 * 在ES6中，又新增加了4种，分别是：let，const，class和import。
 * 在let和const之间，优先使用const，尤其是只应该设置常量的全局环境
 * 我们一般推荐使用const来声明一个函数
 */
class LoadingModal extends Component {

    constructor(props) {
        super(props);
        this.onClose = this.onClose.bind(this);
        this.onShow = this.onShow.bind(this);
    }

    //执行一次，在初始化render之前执行，如果在这个方法内调用setState，render()知道state发生变化，并且只执行一次
    componentWillMount() {
    }

    //在初始化render之后只执行一次，在这个方法内，可以访问任何组件，componentDidMount()方法中的子组件
    // 在父组件之前执行，从这个函数开始，就可以和 JS 其他框架交互了，
    // 例如设置计时 setTimeout 或者 setInterval，或者发起网络请求
    componentDidMount() {
        if (this.refs.loginModal) {
            this.refs.loginModal.open();
        }
        this.handle = BackHandler.addEventListener('loaddingBack', this.onClose)
    }

    //当组件要被从界面上移除的时候，就会调用componentWillUnmount(),在这个函数中，
    // 可以做一些组件相关的清理工作，例如取消计时器、网络请求等
    componentWillUnmount() {
        if (this.handle) {
            this.handle.remove();
        }
    }

    onShow() {
        if (this.refs.loginModal) {
            this.refs.loginModal.open();
        }
    }

    onClose() {
        // Actions.pop();
        return true;
    }

    render() {
        // ref={"loginModal"}
        return (
            <Modal
                ref={(ref) => {
                    this.loginModal = ref;
                }}
                style={[{height: Global.SCREEN_HEIGHT, width: Global.SCREEN_WIDTH, backgroundColor: "#F0000000"}]}
                position={"center"}
                backButtonClose={false}
                swipeToClose={this.props.backExit}
                backdropOpacity={0.8}>
                <View style={[styles.centered, {flex: 1}]}>
                    <View>
                        <Spinner style={[styles.centered]}
                                 isVisible={true}
                                 size={50}
                                 type="9CubeGrid"
                                 color="#FFFFFF"/>
                        <Text style={styles.normalTextWhite}>{this.props.text}</Text>
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    centered: {
        //主轴和次轴均居中
        justifyContent: "center",
        alignItems: "center"
    },
    normalTextWhite: {
        color: '#FFFFFF',
        fontSize: 18,
    },
});


LoadingModal.propTypes = {
    text: PropTypes.string,
    backExit: PropTypes.bool,
};
LoadingModal.defaultProps = {
    text: '加载中...',
    backExit: true,
};

// 使用let声明的变量：

// 隶属于块级作用域，块级作用域外不可见
// 不存在“变量提升”
// 同一作用域内不得存在名称相同的变量
// 当声明为全局变量时不会作为全局对象的属性

//用于导出这个模块
export default LoadingModal;