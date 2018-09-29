/**
 * Created by cyh on 2018/7/12.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Alert, Image, TouchableOpacity, ScrollView} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Label from 'teaset/components/Label/Label'
import ListRow from 'teaset/components/ListRow/ListRow'
import Button from 'teaset/components/Button/Button'
import Toast from 'teaset/components/Toast/Toast'
import TitleBar from "../../components/base/TitleBar"

import * as HttpUtil from '../../net/HttpUtils'
import {commonStyle} from '../../constants/commonStyle'


class BuyCardNextTwoPage extends Component {

    constructor(props) {
        super(props);
        this.owenerName = ''
        this.plate = ''
        this.plateColor = ''
        this.cardCode = ''
        this.validTime = ''

        this.price = 0
        this.range = ''
    }

    componentDidMount() {
        const {navigation} = this.props
        this.owenerName = navigation.getParam('owenerName')
        this.plate = navigation.getParam('plate')
        this.plateColor = navigation.getParam('plateColor')
        this.cardCode = navigation.getParam('cardCode')
        this.validTime = navigation.getParam('validTime')

        this.price = navigation.getParam('price')
        this.range = navigation.getParam('range')
    }

    // boCardCode (integer, optional): 会员卡业务订单编号,
    // payMoney (number, optional): 会员卡支付金额（元）,
    // invalidTime (string, optional): 结束时间：YYYY-MM-DD
    /**
     * 生成业务订单
     * @private
     */
    _createOrder = () => {
        const {login} = this.props
        let service = '/card/business'
        let params = {
            "userId": login.user.id,
            "owenerName": this.owenerName,
            "plate": this.plate,
            "plateColor": this.plateColor,
            "cardCode": this.cardCode,
            "validTime": this.validTime,
        }
        HttpUtil.fetchRequest(service, 'POST', params)
            .then(json => {
                if (json.code === "000000") {
                    Toast.message('生成业务订单成功')
                    let data = json.data
                    this.props.navigation.navigate('BuyCardNextPayPage', {
                        boCardCode: data.boCardCode,
                        payMoney: data.payMoney,
                        invalidTime: data.invalidTime
                    })
                } else {
                    Toast.message(json.msg)
                }
            })
            .catch()
    }

    render() {
        const {navigation} = this.props;
        return (
            <View style={{flex: 1}}>
                <TitleBar title={'购买月卡'} navigation={this.props.navigation}/>
                <ScrollView style={styles.container}>
                    <View>
                        <View style={{
                            marginBottom: commonStyle.marginBottom,
                            marginTop: commonStyle.marginTop,
                            marginLeft: commonStyle.marginLeft
                        }}>
                            <Label size='md' type='detail' text='月卡信息'/>
                        </View>
                        <ListRow title='月卡编号' detail={<Label text={this.cardCode} type='title'/>} topSeparator='full'/>
                        <ListRow title='停车场' detail={<Label text={this.range} type='title' numberOfLines={3}/>}
                                 topSeparator='full'/>
                        <ListRow title='车牌号码' detail={<Label text={this.plate} type='title'/>} topSeparator='full'/>
                        <ListRow title='生效时间' detail={<Label text={this.validTime} type='title'/>}
                                 topSeparator='full'/>
                        <View style={{
                            marginBottom: commonStyle.marginBottom,
                            marginTop: commonStyle.marginTop,
                            marginLeft: commonStyle.marginLeft
                        }}>
                            <Label size='md' type='detail' text='收费信息'/>
                        </View>
                        <ListRow title='月卡金额' detail={<Label text={`${this.price}元`} type='title'/>}
                                 topSeparator='full'/>
                        <ListRow title='应付金额' detail={<Label text={`￥${this.price}`} type='title'/>}
                                 topSeparator='full'/>
                    </View>
                </ScrollView>
                <Button title="提交订单"
                        size='lg'
                        style={{margin: commonStyle.margin}}
                        onPress={this._createOrder}
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
    login: state.login,
    me: state.me,
});

const dispatchAction = (dispatch) => ({
    // login: (user, pwd) => dispatch(userActions.login(user, pwd))
    // loginAction: bindActionCreators(loginActions, dispatch),
});

export default connect(mapState, dispatchAction)(BuyCardNextTwoPage)
