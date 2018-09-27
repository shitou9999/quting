/**
 * Created by PVer on 2018/8/19.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Alert, Image} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import Label from 'teaset/components/Label/Label'
import Button from 'teaset/components/Button/Button'
import {commonStyle} from '../constants/commonStyle'
import * as ViewUtil from '../utils/ViewUtil'
import * as DateUtil from '../utils/DateUtil'

class UserOrderView extends Component {

    static propTypes = {
        code: PropTypes.string,//订单编号
        plate: PropTypes.string,
        plateColor: PropTypes.string,
        orderStatus: PropTypes.string,
        address: PropTypes.string,
        payableFee: PropTypes.number,
        actualParkTm: PropTypes.string,
        createTime: PropTypes.string,
        recordSrc: PropTypes.string,
        orderType: PropTypes.number,
        payMoney: PropTypes.number,
        couponMoney: PropTypes.number,
        recordCode: PropTypes.string,

        cancelOrder: PropTypes.func,
        payOrder: PropTypes.func,
        deleteOrder: PropTypes.func,
    }

    static defaultProps = {
        code: 0,//订单编号
        plate: "",
        plateColor: "0",
        orderStatus: "",
        address: "",
        payableFee: 0,
        actualParkTm: "0",//停车时长 分钟
        createTime: "",
        recordSrc: "",//停车记录来源 道路0  停车场1
        orderType: 0,//订单类型：orderType：1-停车 2-月卡
        payMoney: 0,
        couponMoney: 0,
        recordCode: '',
    }

    constructor(props) {
        super(props);
        this.state = {
            storageArr: [],
        }
    }

    componentDidMount() {
        gStorage.getAllDataForKey('BO+ORDER+STATUS', status => {
            this.setState({
                storageArr: status
            })
        });
    }


    render() {
        let {
            code, plate, plateColor, orderStatus, address, payableFee, actualParkTm,
            createTime, recordSrc, orderType, payMoney, couponMoney, recordCode
        } = this.props
        //orderType：1-停车 2-月卡
        let typeComponent = parseInt(orderType) === 1 ? (
            <View style={styles.itemStyle}>
                <Label size='md' text='停车时长' type='detail'/>
                <Label size='md' text={DateUtil.goMinute2DayHourMinute(actualParkTm)} type='detail'/>
            </View>) : (
            <View style={styles.itemStyle}>
                <Label size='md' text='订单编号' type='detail'/>
                <Label size='md' text={code} type='detail'/>
            </View>
        )
        // let chargeDeductionComponent = chargeDeductionMoney > 0 ? (
        //     <View style={styles.itemStyle}>
        //         <Label size='md' text='充电抵扣' type='detail'/>
        //         <Label size='md' text={code} type='detail'/>
        //     </View>) : null
        let couponDeductionComponent = couponMoney > 0 ? (
            <View style={styles.itemStyle}>
                <Label size='md' text='优惠券抵扣' type='detail'/>
                <Label size='md' text={code} type='detail'/>
            </View>) : null
        //是否显示bt-- //订单状态 0-待支付 10-已成功 11-已取消 12-已关闭
        let bottomBtComponent = parseInt(orderStatus) === 0 ? (
                <View style={{flexDirection: commonStyle.row}}>
                    <View style={{marginRight: 5}}>
                        <Button title="取消订单" size='sm'
                                onPress={() => {
                                    this.props.cancelOrder && this.props.cancelOrder(code, recordSrc, orderType)
                                }}/>
                    </View>
                    <View>
                        <Button title="付款" size='sm'
                                style={{backgroundColor: commonStyle.blue}}
                                onPress={() => {
                                    this.props.payOrder() && this.props.payOrder(code, payMoney, recordCode)
                                }}/>
                    </View>
                </View>
            ) :
            <View style={{marginRight: 5}}>
                <Button title="删除订单" size='sm'
                        onPress={() => {
                            this.props.deleteOrder && this.props.deleteOrder(code, recordSrc, orderType)
                        }}/>
            </View>

        return (
            <View style={{
                padding: commonStyle.padding,
                backgroundColor: commonStyle.white,
                borderRadius: 5,
                margin: 5
            }}>
                <View style={styles.itemStyle}>
                    <View style={{flexDirection: commonStyle.row, alignItems: commonStyle.center}}>
                        {ViewUtil.renderPlate(plateColor)}
                        <Label size='md' text={plate} type='title'/>
                    </View>
                    <Label size='md' text={ViewUtil.getValue(this.state.storageArr, parseInt(orderStatus), '***')}
                           type='title'/>
                </View>
                <View style={styles.itemStyle}>
                    <View style={{flexDirection: commonStyle.row, alignItems: commonStyle.center}}>
                        <Label size='md' text={address} type='title'/>
                    </View>
                    <Label size='md'
                           text={`￥${payableFee}`}
                           type='title'/>
                </View>
                {/*<View style={styles.itemStyle}>*/}
                {/*<Label size='md' text='购买月卡会员' type='title'/>*/}
                {/*<Label size='md' text={`￥${payableMoney}`} type='title'/>*/}
                {/*</View>*/}
                {typeComponent}
                <View style={styles.itemStyle}>
                    <Label size='md' text='创建时间' type='detail'/>
                    <Label size='md' text={createTime} type='detail'/>
                </View>
                <View style={styles.itemStyle}>
                    <Label size='md' text='订单编号' type='detail'/>
                    <Label size='md' text={code} type='detail'/>
                </View>
                {/*{chargeDeductionComponent}*/}
                {couponDeductionComponent}
                <View style={{
                    flexDirection: commonStyle.row,
                    justifyContent: commonStyle.end,
                    alignItems: commonStyle.center
                }}>
                    <Label size='md' text='实付:' type='title'/>
                    <Label size='md'
                           text={parseInt(orderStatus) === 0 || parseInt(orderStatus) === 12 ? 0.0 : payMoney}
                           type='title'/>
                </View>
                <View style={{
                    flexDirection: commonStyle.row,
                    justifyContent: commonStyle.end,
                    marginTop: commonStyle.marginTop
                }}>
                    {bottomBtComponent}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    itemStyle: {
        flexDirection: commonStyle.row,
        justifyContent: commonStyle.between
    }
});

export default UserOrderView
