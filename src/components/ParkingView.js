/**
 * Created by PVer on 2018/8/19.
 */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Alert,
    Image,
    TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import Label from 'teaset/components/Label/Label'
import Toast from 'teaset/components/Toast/Toast'
import NoCarView from './NoCarView'
import NoParkingCarView from './NoParkingCarView'


import * as HttpUtil from '../net/HttpUtils'

class ParkingView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            parkingList: [],
        }
    }

    componentDidMount() {
        this._getRequestParkingRecordCache()
    }

    componentWillMount() {

    }

    // recordCode (string, optional): 停车记录编号,
    // parklotRecordId (string, optional): 停车场停车记录Id,
    // code (string, optional): 编号,
    // name (string, optional): 名称,
    // berthCode (string, optional): 泊位编号,
    // plate (string, optional): 车牌号码,
    // plateColor (string, optional): 车牌颜色:数据字典--PLATE_COLOR,
    // alreadPayMoney (number, optional): 已付金额(元),
    // alreadPayMoneyTime (string, optional): 已付时间，格式：yyyy-MM-dd HH:mm:ss,
    // payMoney (number, optional): 应付金额(元）,
    // chargeStartTime (string, optional): 计费开始时间，格式：yyyy-MM-dd HH:mm:ss,
    // time (integer, optional): 停车时间:毫秒数,
    // recordStatus (string, optional): 停车记录状态（道路停车）1-驶入 2-已取证 30-预付 31-后付 40-未取证驶离 41-已结算 数据字典（dcroad平台）--RECORD_STATUS 停车记录状态（停车场停车）----,
    // description (string, optional): 收费规则描述,
    // vipType (string, optional): 会员类别:数据字典(dclot平台)--VIP_TYPE,
    // type (integer, optional): 停车场类型：0-路内(道路) 1-路外(停车场)

    /**
     * 当前停车记录
     * @private
     */
    _getRequestParkingRecordCache = () => {
        let service = `/parking_record/cache?userId=1100000000029`
        HttpUtil.fetchRequest(service, 'GET')
            .then(json => {
                if (json.code === "000000") {
                    this.setState({
                        parkingList: json.data,
                    })
                } else {
                    Toast.message(json.msg)
                }
            })
            .catch(err => {
            })
    };

    _switchCar = () => {
        const {navigation} = this.props;
        navigation.navigate('SwitchCarPage')
    }

    _userPay = () => {
        const {navigation} = this.props;
        navigation.navigate('ParkingOrderPage')
    }

    render() {
        const {navigation} = this.props;
        let list = this.parkingList;
        if (list && list.size > 0) {

        }else{

        }
        return (
            <View style={{
                padding:10,
                backgroundColor: 'yellow',
            }}>
                <View style={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image source={{uri: 'https://www.baidu.com/img/bd_logo1.png'}}
                               style={{width: 60, height: 60}}
                        />
                        <Label style={{marginLeft: 5}} size='md' type='title' text='浙12345'/>
                    </View>
                    <Label size='md' type='detail' text='切换车辆' onPress={this._switchCar}/>
                </View>
                <View style={{justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
                    <View>
                        <Label size='md' type='detail' text='停车地点:33333333333330'/>
                        <Label size='md' type='detail' text='停车时长'/>
                        <Label size='md' type='detail' text='应付金额11111'/>
                    </View>
                    <TouchableOpacity onPress={this._userPay}>
                        <View style={{justifyContent: 'center'}}>
                            <Image source={{uri: 'https://www.baidu.com/img/bd_logo1.png'}}
                                   style={{width: 40, height: 40}}
                            />
                            <Label style={{marginTop: 5}} size='md' type='detail' text='支付'/>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});

ParkingView.propTypes = {
    navigation: PropTypes.object.isRequired,
};


ParkingView.defaultProps = {
    userName: ' ',
};

export default ParkingView