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

class UserOrderView extends Component {

    constructor(props) {
        super(props);
        this.storageMap = new Map()
        this.state = {
            storageArr: [],
            isShowCancleOrPayBt: false
        }
    }

    componentWillMount() {
        gStorage.storage.getAllDataForKey('BO+ORDER+STATUS', status => {
            this.setState({
                storageArr: status
            })
        });
        if (this.props.orderStatus === 0) {
            this.setState({
                isShowCancleOrPayBt: true
            })
        }
    }

    getValue(key) {
        console.log('=============================')
        let tempArr = this.state.storageArr || []
        let searchValue;
        for (let i = 0; i < tempArr.length; i++) {
            let tempKey = tempArr[i].key
            if (key === tempKey) {
                searchValue = tempArr[i].value
                break
            }
        }
        return searchValue
    }

    _cancelOrder = () => {

    }

    _deleteOrder = () => {

    }

    _payOrder = () => {

    }

    render() {
        const {
            actualMoney, chargeDeductionMoney, couponDeductionMoney, createTime, invalidTime,
            name, orderStatus, payableMoney, plate, plateColor, timeOrCode, type, id
        } = this.props;

        //timeOrCode;// (integer, optional): 停车时长（分）/月卡种类编号,
        //type;// (string, optional): 订单类型：1-停车场场内支付 2-会员卡支付
        let typeComponent = type === 1 ? (<View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Label size='md' text='停车时长' type='detail'/>
            <Label size='md' text={timeOrCode} type='detail'/>
        </View>) : (
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Label size='md' text='月卡编号' type='detail'/>
                <Label size='md' text={timeOrCode} type='detail'/>
            </View>
        )
        let chargeDeductionComponent = chargeDeductionMoney > 0 ? (
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Label size='md' text='充电抵扣' type='detail'/>
                <Label size='md' text={id} type='detail'/>
            </View>) : null
        let couponDeductionComponent = couponDeductionMoney > 0 ? (
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Label size='md' text='优惠券抵扣' type='detail'/>
                <Label size='md' text={id} type='detail'/>
            </View>) : null
        //是否显示bt
        let bottomBtComponent = this.state.isShowCancleOrPayBt ? (
            <View style={{flexDirection:'row'}}>
                <View style={{marginRight:5}}>
                    <Button title="取消订单" size='sm' onPress={()=>{
                        this.props.cancelOrder()
                    }}/>
                </View>
                <View>
                    <Button title="付款" size='sm' style={{backgroundColor:'blue'}} onPress={()=>{
                        this.props.payOrder()
                    }}/>
                </View>
            </View>
        ) : null
        return (
            <View style={{
                padding:10,
                backgroundColor: 'white',
                borderRadius:5,
                margin:5
            }}>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row'}}>
                        <Image source={{uri: 'https://www.baidu.com/img/bd_logo1.png'}}
                               style={{width: 20, height: 20}}
                        />
                        <Label size='md' text={plate} type='title'/>
                    </View>
                    <Label size='md' text={this.getValue(orderStatus)} type='title'/>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Label size='md' text='购买月卡会员' type='title'/>
                    <Label size='md' text={`￥${payableMoney}`} type='title'/>
                </View>
                {typeComponent}
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Label size='md' text='创建时间' type='detail'/>
                    <Label size='md' text={createTime} type='detail'/>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Label size='md' text='订单编号' type='detail'/>
                    <Label size='md' text={id} type='detail'/>
                </View>
                {chargeDeductionComponent}
                {couponDeductionComponent}
                <View style={{flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
                    <Label size='md' text='实付:' type='title'/>
                    <Label size='md' text={orderStatus === 0 ? 0.0 : actualMoney} type='title'/>
                </View>
                <View style={{flexDirection:'row',justifyContent:'flex-end',marginTop:10}}>
                    <View style={{marginRight:5}}>
                        <Button title="删除订单" size='sm' onPress={()=>{
                            this.props.deleteOrder(id,type)
                        }}/>
                    </View>
                    {bottomBtComponent}
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

// id (integer, optional): 订单编号,
//     plate (string, optional): 车牌号码,
//     plateColor (string, optional): 车牌颜色：数据字典(dclot)——PLATE_COLOR,
//     orderStatus (string, optional): 订单状态：数据字典(dclot)——BO_ORDER_STATUS,
//     name (string, optional): 停车场名称/购买停车月卡,
//     payableMoney (number, optional): 应付金额(元),
//     chargeDeductionMoney (number, optional): 充电抵扣金额（元）,
// couponDeductionMoney (number, optional): 优惠券抵扣金额(元),
//     actualMoney (number, optional): 实付金额（元）,
// timeOrCode (integer, optional): 停车时长（分）/月卡种类编号,
//     createTime (string, optional): 订单生成时间：格式——YYYY-MM-DD HH:mm:ss,
//     invalidTime (string, optional): 月卡失效时间：格式——YYYY-MM-DD,
//     type (string, optional): 订单类型：1-停车场场内支付 2-会员卡支付

UserOrderView.propTypes = {
    actualMoney: PropTypes.number.isRequired,
    chargeDeductionMoney: PropTypes.number.isRequired,
    couponDeductionMoney: PropTypes.number.isRequired,
    createTime: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    invalidTime: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    orderStatus: PropTypes.string.isRequired,
    payableMoney: PropTypes.number.isRequired,
    plate: PropTypes.string.isRequired,
    plateColor: PropTypes.string.isRequired,
    timeOrCode: PropTypes.number.isRequired,
    typ: PropTypes.string.isRequired,
    cancelOrder: PropTypes.func.isRequired,
    payOrder: PropTypes.func.isRequired,
    deleteOrder: PropTypes.func.isRequired,
}

UserOrderView.defaultProps = {
    actualMoney: 0,
    chargeDeductionMoney: 0,
    couponDeductionMoney: 0,
    createTime: "",
    id: 0,
    invalidTime: "",
    name: "",
    orderStatus: "",
    payableMoney: 0,
    plate: "",
    plateColor: "0",
    timeOrCode: 0,
    typ: "1",
}


export default UserOrderView