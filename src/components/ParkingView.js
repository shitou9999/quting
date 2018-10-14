/**
 * Created by PVer on 2018/8/19.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Alert, Image, TouchableOpacity,} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import {Input, ListRow, Button, Overlay, Label, Toast} from "../components/teaset/index"
import {Divide} from "./base/index"
import {commonStyle} from '../constants/commonStyle'
import * as DateUtil from '../utils/DateUtil'
import {images} from "../assets/index";


class ParkingView extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        let {plate, name, payMoney, time} = this.props
        return (
            <View style={{
                height: 150,
                padding: commonStyle.padding,
                backgroundColor: commonStyle.white,
            }}>
                <View style={{
                    justifyContent: commonStyle.between,
                    alignItems: commonStyle.center,
                    flexDirection: commonStyle.row,
                    marginBottom: commonStyle.marginBottom,
                }}>
                    <View style={{flexDirection: commonStyle.row, alignItems: commonStyle.center}}>
                        <Image source={images.home_car}
                               resizeMode='contain'
                               style={styles.avatar}
                        />
                        <Label style={{marginLeft: 5}} size='md' type='title' text={plate}/>
                    </View>
                    <Label size='md' type='detail' text='切换车辆' onPress={() => {
                        this.props.switchCar && this.props.switchCar()
                    }}/>
                </View>
                <Divide orientation={'horizontal'} color={commonStyle.lineColor} width={commonStyle.lineHeight}/>
                <View
                    style={{
                        justifyContent: commonStyle.between,
                        alignItems: commonStyle.center,
                        flexDirection: commonStyle.row,
                        marginTop: commonStyle.marginTop,
                    }}>
                    <View>
                        <View style={{flexDirection: commonStyle.row}}>
                            <Label size='md' type='title' text={`停车地点:${name}`}/>
                        </View>
                        <View style={{flexDirection: commonStyle.row}}>
                            <Label size='md' type='title' text='停车时长: '/>
                            <Label size='md' type='title' text={DateUtil.goMilliSecondToDate(time)}/>
                        </View>
                        <View style={{flexDirection: commonStyle.row}}>
                            <Label size='md' type='title' text='停车费用: '/>
                            <Label size='md' type='title' text={`${payMoney}元`}/>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => {
                        this.props.userPay && this.props.userPay()
                    }}>
                        <View style={{
                            justifyContent: commonStyle.center,
                            alignItems: commonStyle.center
                        }}>
                            <Image source={images.home_pay}
                                   resizeMode='contain'
                                   style={{width: 40, height: 40}}
                            />
                            <Label style={{marginTop: 5}} size='md' type='title' text='支付'/>
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
    },
    avatar: {
        borderRadius: 50,
        width: 40,
        height: 40
    }
});

//this.props.onPressItem && this.props.onPressItem();

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
ParkingView.propTypes = {
    plate: PropTypes.string,
    name: PropTypes.string,
    payMoney: PropTypes.number,
    time: PropTypes.number,
    type: PropTypes.number,
    switchCar: PropTypes.func,
    userPay: PropTypes.func,
    vipType: PropTypes.string,
};


export default ParkingView
