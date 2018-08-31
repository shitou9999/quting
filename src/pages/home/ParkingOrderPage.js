/**
 * Created by cyh on 2018/7/12.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Alert, ScrollView,} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Label from 'teaset/components/Label/Label'
import Button from 'teaset/components/Button/Button'
import ListRow from 'teaset/components/ListRow/ListRow'
import Toast from 'teaset/components/Toast/Toast'

import * as homeActions from '../../actions/home'
import * as HttpUtil from '../../net/HttpUtils'

class ParkingOrderPage extends Component {

    constructor(props) {
        super(props);
        this.name = ''
        this.plate = ''
        this.recordCode = ''
        this.state = {
            alreadyPayMoney: 0
        }
    }

    componentDidMount() {
        this.name = this.props.navigation.getParam('name')
        this.plate = this.props.navigation.getParam('plate')
        this.recordCode = this.props.navigation.getParam('recordCode')
        let alreadyPayMoney = this.props.navigation.getParam('alreadyPayMoney')
        this.setState({
            alreadyPayMoney: alreadyPayMoney
        })
        this._getRequestParkingPre()
    }


    _getRequestParkingPre = () => {
        let userId = '1100000000073'
        let recordCode = this.recordCode
        this.props.getRequestParkingPre(userId, recordCode)
    }

    /**
     * 生成业务订单
     * @returns
     */
    _createBusiness = () => {
        const {navigation} = this.props;
        navigation.navigate('ParkingPayPage', {
            recordCode: this.recordCode,
            couponCode: '',
        })
        let service = '/pay_parklot/business'
        let params = {
            "userId": 1100000000073,
            "recordCode": this.recordCode,
            "couponCode": ""
        }
        HttpUtil.fetchRequest(service, 'POST', params)
            .then(json => {
                if (json.code === "000000") {
                    Toast.message('生成业务订单成功')
                    let data = json.data
                    navigation.navigate('ParkingPayPage', {
                        boPkinCode: data.boPkinCode,//场内付费-付费业务订单编号,
                        payMoney: data.payMoney,
                    })
                } else {
                    Toast.message('生成业务订单失败')
                }
            })
            .catch()
    }

    render() {
        const {navigation, home} = this.props
        const {alreadyPayMoney} = this.state
        //返回undefined时字符串拼接直接显示undefined
        let payFee = home.bo_parking_pre_dto.payFee === undefined ? 0 : home.bo_parking_pre_dto.payFee
        return (
            <View style={{flex:1}}>
                <ScrollView style={styles.container}>
                    <View>
                        <View style={{marginBottom:10,marginTop:10,marginLeft:5,marginBottom:10}}>
                            <Label size='md' type='detail' text='停车信息'/>
                        </View>
                        <ListRow title='停车点' detail={<Label text={this.name} type='title' />} topSeparator='full'/>
                        <ListRow title='车牌号码' detail={<Label text={this.plate} type='title' />} topSeparator='full'/>
                        <ListRow title='计费开始时间'
                                 detail={<Label text={home.bo_parking_pre_dto.chargeStartTime} type='title' />}
                                 topSeparator='full'/>
                        <ListRow title='计费结束时间'
                                 detail={<Label text={home.bo_parking_pre_dto.chargeEndTime} type='title' />}
                                 topSeparator='full'/>
                        <ListRow title='计费时长' detail={<Label text={home.bo_parking_pre_dto.parkingTime} type='title' />}
                                 topSeparator='full'/>
                        <View style={{marginTop:10,marginBottom:10,marginLeft:5}}>
                            <Label size='md' type='detail' text='收费信息'/>
                        </View>
                        <ListRow title='停车费' detail={<Label text={`${payFee}元`} type='title' />}
                                 topSeparator='full'/>
                        <ListRow title='优惠券' detail={<Label text={`${home.user_coupon_list.length}张可用`} type='title' />}
                                 topSeparator='full' onPress={()=>{

                                 }}/>
                        <ListRow title='已付金额' detail={<Label text={`${alreadyPayMoney}元`} type='title' />}
                                 topSeparator='full'/>
                        <ListRow title='应付金额'
                                 detail={<Label text={`${payFee}元`} type='title' />}
                                 topSeparator='full'/>
                    </View>
                </ScrollView>
                <Button title="提交订单"
                        size='lg'
                        style={{margin:10}}
                        onPress={this._createBusiness}
                        type='primary'/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

const mapState = (state) => ({
    nav: state.nav,
    home: state.home,
});

const dispatchAction = (dispatch) => ({
    getRequestParkingPre: (userId, recordCode) => dispatch(homeActions.getRequestParkingPre(userId, recordCode))
    // loginAction: bindActionCreators(loginActions, dispatch),
});

export default connect(mapState, dispatchAction)(ParkingOrderPage)