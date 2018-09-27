/**
 * Created by cyh on 2018/7/12.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, BackHandler, View, DeviceEventEmitter} from 'react-native';
import {connect} from 'react-redux'
import ViewPageComponent from '../components/ViewPageComponent'
import Toast from 'teaset/components/Toast/Toast'
import ParkingView from '../components/ParkingView'
import NoParkingCarView from '../components/NoParkingCarView'
import NoCarView from '../components/NoCarView'
import BannerView from '../components/BannerView'

import * as HttpUtil from '../net/HttpUtils'

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userBindCarList: [],
            userParkingList: [],
            parkingBen: {},
        }
    }

    componentDidMount() {
        this._getRequestParkingRecordCache()
        this.subscription = DeviceEventEmitter.addListener('refresh', (item) => {
            this.setState({
                parkingBen: item
            })
        })
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    }

    componentWillUnmount() {
        if (this.subscription) {
            this.subscription.remove();
        }
        this.backHandler && this.backHandler.remove();
    }


    onBackAndroid = () => {
        let {navigation} = this.props
        if (navigation.isFocused()) {
            if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
                //最近2秒内按过back键，可以退出应用。
                // BackHandler.exitApp()
                return false
            }
            this.lastBackPressed = Date.now()
            Toast.message('再按一次退出应用')
            return true
        }
        return false
        // if (this.props && this.props.navigation) {
        //     this.props.navigator.pop();
        // }
    };


    /**
     * 查询车辆信息
     * @private
     */
    _getRequestUserCar = () => {
        let userId = this.props.login.user.id
        let service = `/vehicle/list?userId=${userId}`
        HttpUtil.fetchRequest(service, 'GET')
            .then(json => {
                if (json.code === "000000") {
                    let dataList = json.data
                    this.setState({
                        userBindCarList: dataList,
                    })
                } else {
                    Toast.message(json.msg)
                }
            })
            .catch(err => {
            })
    }

    /**
     * 当前停车记录
     * @private
     */
    _getRequestParkingRecordCache = () => {
        let userId = this.props.login.user.id
        let service = `/parking_record/cache?userId=${userId}`
        HttpUtil.fetchRequest(service, 'GET')
            .then(json => {
                this._getRequestUserCar()
                if (json.code === "000000") {
                    let dataList = json.data
                    if (dataList && dataList.length > 0) {
                        this.setState({
                            userParkingList: dataList,
                            parkingBen: dataList[0]
                        })
                    }
                } else {
                    Toast.message(json.msg)
                }
            })
            .catch(err => {
            })
    };

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

            </View>
        );
    }
}


const mapState = (state) => ({
    nav: state.nav,
    login: state.login,
    me: state.me,
});

const dispatchAction = (dispatch) => ({
    // getQueryUerInfo: (userId, callSucc, callFail) => dispatch(meActions.getQueryUerInfo(userId, callSucc, callFail))
    // loginAction: bindActionCreators(loginActions, dispatch),
});

export default connect(mapState, dispatchAction)(HomePage)
