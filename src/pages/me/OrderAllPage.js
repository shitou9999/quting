/**
 * Created by cyh on 2018/7/12.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Alert,} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {UltimateListView} from "react-native-ultimate-listview"
import UserOrderView from '../../components/UserOrderView'

import * as HttpUtil from '../../net/HttpUtils'
import {commonStyle} from '../../constants/commonStyle'
/**
 * 全部
 */
class OrderAllPage extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }


    componentWillMount() {

    }

    /***
     * 分页查询所有订单
     * @private
     */
    onFetch = async(page = 1, startFetch, abortFetch) => {
        try {
            let userId = '1100000000073'
            let start = 0
            let pageLimit = 10;
            let service = `/app/order?userId=${userId}&start=${start}&length=10&`;
            HttpUtil.fetchRequest(service, 'GET')
                .then(json => {
                    let allData = json.data;
                    let newData = []
                    newData = allData;
                    startFetch(newData, pageLimit);
                })
                .catch(err => {
                })
        } catch (err) {
            abortFetch(); //如果遇到网络错误，手动停止刷新或分页
            console.log(err);
        }
    };

    _cancelOrder = () => {

    }

    _deleteOrder = (id, type) => {

    }

    _payOrder = () => {

    }

    renderItem = (item, index, separator) => {
        return (
            <UserOrderView plate={item.plate} actualMoney={item.actualMoney}
                           chargeDeductionMoney={item.chargeDeductionMoney}
                           couponDeductionMoney={item.couponDeductionMoney}
                           createTime={item.createTime} id={item.id} invalidTime={item.invalidTime} name={item.name}
                           orderStatus={item.orderStatus} payableMoney={item.payableMoney}
                           plateColor={item.plateColor} timeOrCode={item.timeOrCode} typ={item.type}
                           payOrder={this._payOrder()}
                           cancelOrder={this._cancelOrder()}
                           deleteOrder={this._deleteOrder()}
            />
        )
    }

    render() {
        const {navigation} = this.props;
        return (
            <View >
                <UltimateListView
                    ref={(ref) => this.flatList = ref}
                    onFetch={this.onFetch}
                    refreshableMode="basic"
                    keyExtractor={(item, index) => `${index} - ${item}`}
                    item={this.renderItem}
                    displayDate
                    arrowImageStyle={{ width: 20, height: 20, resizeMode: 'contain' }}
                    emptyView={this._renderEmptyView}
                />
            </View>
        );
    }

    _renderEmptyView = () => {
        return <Text>我是没数据</Text>
    }

}


const mapState = (state) => ({
    nav: state.nav,
    login: state.login,
    me: state.me,
});

const dispatchAction = (dispatch) => ({
    // login: (user, pwd) => dispatch(userActions.login(user, pwd))
    // loginAction: bindActionCreators(loginActions, dispatch)
});

export default connect(mapState, dispatchAction)(OrderAllPage)