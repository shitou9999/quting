/**
 * Created by cyh on 2018/7/12.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Alert,} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {UltimateListView} from "react-native-ultimate-listview"
import {Input, ListRow, Button, Overlay, Label, Toast} from "../../components/teaset/index"
import {UserOrderView} from '../../components'
import {EmptyView} from '../../components/base'
import * as HttpUtil from '../../net/HttpUtils'
import {userAction} from '../../actions/index'

class OrderAllPage extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }


    /***
     * 分页查询所有订单-道路
     * @private
     */
    onFetch = async (page = 1, startFetch, abortFetch) => {
        try {
            const {login} = this.props
            let userId = login.user.id
            let start = 0
            let pageLimit = 10
            //GET /me/order/road/list/detail
            //GET /me/order/lot/list/monthcard
            //GET /me/order/lot/list/detail
            let service = `/me/order/road/list/detail?userId=${userId}&start=${start}&length=10&`
            HttpUtil.fetchRequest(service)
                .then(json => {
                    let allData = json.data
                    let newData = []
                    newData = allData
                    if (newData && newData.length > 0) {
                        startFetch(newData, pageLimit)
                    } else {
                        abortFetch()
                        startFetch([], pageLimit)
                    }
                })
                .catch(err => {
                })
        } catch (err) {
            abortFetch()
            console.log(err)
        }
    };

    _cancelOrder = (boCode, recordSrc, orderType) => {
        this.props.userAction.toCancelOrder(boCode, recordSrc, orderType)
            .then(response => {
                if (response.result) {
                    Toast.message('订单取消成功')
                    let newData = this.flatList.getRows()
                    for (let i = 0; i < newData.length; i++) {
                        let item = newData[i]
                        if (boCode === item.code) {
                            //*************订单置为取消*************
                            item.orderStatus = '11'
                        }
                    }
                    this.flatList.updateDataSource(newData)
                } else {
                    Toast.message('订单取消失败')
                }
            })
    }

    _deleteOrder = (obPostpaidCode, recordSrc, orderType) => {
        this.props.userAction.toDeleteOrder(obPostpaidCode, recordSrc, orderType)
            .then(response => {
                if (response.result) {
                    Toast.message('订单删除成功')
                    let newData = this.flatList.getRows()
                    for (let i = 0; i < newData.length; i++) {
                        let item = newData[i]
                        if (obPostpaidCode === item.code) {
                            //splice(index,len,[item])注释：该方法会改变原始数组
                            newData.splice(i, 1)
                        }
                    }
                    console.log(newData)
                    this.flatList.updateDataSource(newData)
                } else {
                    Toast.message('订单删除失败')
                }
            })
    }


    _payOrder = (code, payMoney, recordCode) => {
        const {navigation} = this.props
        navigation.navigate('ParkingPayPage', {
            boPostpaidCode: code,//后付费业务订单编号,
            payMoney: payMoney,//元
            recordCode: recordCode,
        })
    }

    //父组件传递的，是作用域为父组件自身的函数
    renderItem = (item, index, separator) => {
        return (
            <UserOrderView code={item.code}
                           plate={item.plate}
                           plateColor={item.plateColor}
                           orderStatus={item.orderStatus}
                           address={item.address}
                           payableFee={item.payableFee}
                           actualParkTm={item.actualParkTm}
                           createTime={item.createTime}
                           recordSrc={item.recordSrc}
                           orderType={item.orderType}
                           payMoney={item.payMoney}
                           couponMoney={item.couponMoney}
                           recordCode={item.recordCode}
                           payOrder={this._payOrder}
                           cancelOrder={this._cancelOrder}
                           deleteOrder={this._deleteOrder}
            />
        )
    }

    //updateDataSource(rows)如果您想修改或更新您的数据源，您可以生成一个新的数组并将其传递给这个方法。然后ListView将自动重新运行。

    render() {
        const {navigation} = this.props
        return (
            <View>
                <UltimateListView
                    ref={(ref) => this.flatList = ref}
                    onFetch={this.onFetch}
                    refreshableMode="basic"
                    keyExtractor={(item, index) => `${index} - ${item}`}
                    item={this.renderItem}
                    displayDate
                    arrowImageStyle={{width: 20, height: 20, resizeMode: 'contain'}}
                    emptyView={this._renderEmptyView}
                />
            </View>
        );
    }

    _renderEmptyView = () => {
        return <EmptyView/>
    }

}


const mapState = (state) => ({
    nav: state.nav,
    login: state.login,
    me: state.me,
});

const dispatchAction = (dispatch) => ({
    userAction: bindActionCreators(userAction, dispatch)
});

export default connect(mapState, dispatchAction)(OrderAllPage)
