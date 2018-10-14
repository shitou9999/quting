/**
 * Created by cyh on 2018/7/12.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, BackHandler, View, DeviceEventEmitter} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {ViewPageComponent, NoParkingCarView, NoCarView, HomeMapView, ParkingView} from '../components/index'
import {Toast, Overlay} from '../components/teaset/index'
import * as homeAction from '../actions/home'
import * as mapAction from "../actions/map"
import CodePush from 'react-native-code-push'
import * as Constants from "../constants/Constants"


let codePushOptions = {
//设置检查更新的频率
//ON_APP_RESUME APP恢复到前台的时候
//ON_APP_START APP开启的时候
//MANUAL 手动检查
    checkFrequency: CodePush.CheckFrequency.ON_APP_START
}


class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userBindCarList: [],
            userParkingList: [],
            parkingBen: {},
        }
    }

    //如果有更新的提示
    syncImmediate() {
        //CodePush会帮我们自动完成检查更新，下载，安装等一系列操作，
        //下载和安装都是静默的，即用户不可见
        CodePush.sync({
                //安装模式
                //ON_NEXT_RESUME 下次恢复到前台时
                //ON_NEXT_RESTART 下一次重启时
                //IMMEDIATE 马上更新
                installMode: CodePush.InstallMode.IMMEDIATE,
                // deploymentKey: CODE_PUSH_PRODUCTION_KEY, 部署key，指定你要查询更新的部署秘钥，有默认值
                //对话框 可选的，更新的对话框，默认是null,
                // 在检查更新时会弹出提示对话框
                updateDialog: {
                    //是否显示更新描述，默认false
                    appendReleaseDescription: true,
                    //更新描述的前缀。 默认为"Description"
                    descriptionPrefix: "\n\n更新内容：\n",
                    //强制更新按钮文字，默认为continue
                    mandatoryContinueButtonLabel: "立即更新",
                    //强制更新时的信息. 默认为"An update is available that must be installed."
                    mandatoryUpdateMessage: "本次为强制更新,必须更新后才能使用",
                    //非强制更新时，按钮文字,默认为"ignore"
                    optionalIgnoreButtonLabel: '稍后',
                    //非强制更新时，确认按钮文字. 默认为"Install"
                    optionalInstallButtonLabel: '后台更新',
                    //非强制更新时，检查到更新的消息文本
                    optionalUpdateMessage: '有新版本了，是否更新？',
                    //Alert窗口的标题
                    title: '更新提示'
                },
            },
        );
    }

    componentWillMount() {
        CodePush.disallowRestart();//禁止重启
        this.syncImmediate(); //开始检查更新
    }

    componentDidMount() {
        CodePush.allowRestart();//在加载完了，允许重启
        this._getRequestParkingRecordCache()
        this.subscription = DeviceEventEmitter.addListener(Constants.Emitter_SELECT_REFRESH, (item) => {
            this.setState({
                parkingBen: item
            })
        })
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
    }

    componentWillUnmount() {
        if (this.subscription) {
            this.subscription.remove()
        }
        this.backHandler && this.backHandler.remove()
    }

    onBackAndroid = () => {
        let {navigation} = this.props
        let isFocused = navigation.isFocused()
        if (isFocused) {
            if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
                //最近2秒内按过back键，可以退出应用。
                BackHandler.exitApp()
                return false
            }
            this.lastBackPressed = Date.now()
            Toast.message('再按一次退出应用')
            return true
        } else {
            navigation.pop()
            return true
        }
    }


    _getRequestUserCar = () => {
        this.props.homeAction.getRequestUserCar(this.props.login.user.id)
            .then(response => {
                if (response.result) {
                    let dataList = response.data
                    this.setState({
                        userBindCarList: dataList,
                    })
                } else {
                    Toast.message(response.msg)
                }
            })
    }


    _getRequestParkingRecordCache = () => {
        this.props.homeAction.getRequestParkingRecordCache(this.props.login.user.id)
            .then(response => {
                this._getRequestUserCar()
                if (response.result) {
                    let dataList = response.data
                    if (dataList && dataList.length > 0) {
                        this.setState({
                            userParkingList: dataList,
                            parkingBen: dataList[0]
                        })
                    }
                } else {
                    Toast.message(response.msg)
                }
            })
    }

    _switchCar = () => {
        this.props.navigation.navigate('SwitchCarPage', {parkingList: this.state.userParkingList})
    }

    _userPay = () => {
        this.props.navigation.navigate('ParkingOrderPage', {
            parkingBen: this.state.parkingBen,
        })
    }


    render() {
        const {navigation} = this.props;
        //深拷贝->是否拷贝到基础数据类型( 数组，对象的话需要逐个赋值才可以)
        //= 赋值  == 比较（1='1'） === 全等（值和类型）
        let userParkingList = this.state.userParkingList
        let userBindCarList = this.state.userBindCarList
        let parkingBen = {}
        for (let i = 0; i < userParkingList.length; i++) {
            parkingBen.plate = userParkingList[0].plate
            parkingBen.name = userParkingList[0].name
            parkingBen.payMoney = userParkingList[0].payMoney
            parkingBen.time = userParkingList[0].time
        }
        console.log(parkingBen)
        //有绑定有进行中
        let parkingView = <ParkingView {...this.state.parkingBen}
                                       switchCar={this._switchCar}
                                       userPay={this._userPay}/>
        //无绑定车辆
        let noParkingCarView = <NoParkingCarView navigation={navigation}/>
        //无进行中
        let noCarView = <NoCarView/>
        let userParing = (userParkingList && userParkingList.length > 0) ? parkingView : noCarView
        let isBindCar = (userBindCarList && userBindCarList.length > 0) ? userParing : noParkingCarView
        return (
            <View>
                <View style={{height: 180}}>
                    <ViewPageComponent/>
                </View>
                {isBindCar}
                <HomeMapView {...this.props}/>
            </View>
        );
    }
}


const mapState = (state) => ({
    nav: state.nav,
    login: state.login,
    me: state.me,
})

const dispatchAction = (dispatch) => ({
    // getQueryUerInfo: (userId) => dispatch(meActions.getQueryUerInfo(userId))
    homeAction: bindActionCreators(homeAction, dispatch),
    mapAction: bindActionCreators(mapAction, dispatch),
})

export default connect(mapState, dispatchAction)(HomePage)
