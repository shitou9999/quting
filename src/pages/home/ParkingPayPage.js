/**
 * Created by cyh on 2018/7/12.
 */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Alert,
    Image
} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Label from 'teaset/components/Label/Label'
import Button from 'teaset/components/Button/Button'
import Toast from 'teaset/components/Toast/Toast'
import {RadioGroup as RadioGroupPay, RadioButton as RadioButtonPay} from 'react-native-flexi-radio-button'

import * as HttpUtil from '../../net/HttpUtils'

class ParkingPayPage extends Component {

    constructor(props) {
        super(props);
        this.boPkinCode = ''
        this.payMoney = 0
        this.state = {
            selectIndex: 0,
        }
    }

    componentDidMount() {
        this.boPkinCode = this.props.navigation.getParam('boPkinCode')
        this.payMoney = this.props.navigation.getParam('payMoney')
    }

    _userOveragePay = () => {
        let service = '/pay_parklot/overage'
        let params = {
            "userId": 0,
            "boPkinCode": "",
            "payPwd": ""
        }
        HttpUtil.fetchRequest(service, 'POST', params)
            .then(json => {
                if (json.code === "000000") {
                    Toast.message('钱包支付成功')

                } else {
                    Toast.message('钱包支付失败')
                }
            })
            .catch()
    }

    //支付宝支付生成场内付费订单
    _userAliPay = () => {
        let service = '/pay_parklot/zfb_order'
        let params = {
            "userId": 0,
            "boPkinCode": ""
        }
        HttpUtil.fetchRequest(service, 'POST', params)
            .then(json => {
                if (json.code === "000000") {
                    Toast.message('生成结算订单成功')

                } else {
                    Toast.message('生成结算订单失败')
                }
            })
            .catch()
    }

    _userWeChatPay = () => {
        let service = '/pay_parklot/wx_order'
        let params = {
            "userId": 0,
            "boPkinCode": ""
        }
        HttpUtil.fetchRequest(service, 'POST', params)
            .then(json => {
                if (json.code === "000000") {
                    Toast.message('生成结算订单成功')

                } else {
                    Toast.message('生成结算订单失败')
                }
            })
            .catch()
    }

    onSelect(index, value) {
        this.setState({
            selectIndex: index,
        })
    }

    _userToPay = () => {
        const {selectIndex} = this.state
        if (selectIndex === 0) {
            this._userOveragePay()
        } else if (selectIndex === 1) {
            this._userAliPay()
        } else if (selectIndex === 2) {
            this._userWeChatPay()
        }
    }


    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <View style={{flex:1}}>
                    <View style={{height:150,justifyContent:'center',alignItems:'center',backgroundColor:'white'}}>
                        <Label size='md' text='应缴金额(元)' type='detail'/>
                        <Label size='xl' text='0.0' type='detail'/>
                    </View>
                    <View style={{margin:10}}>
                        <Label size='md' text='付款方式' type='title'/>
                    </View>
                    <View style={{backgroundColor:'white'}}>
                        <RadioGroupPay
                            thickness={2}
                            size={20}
                            selectedIndex={0}
                            onSelect={(index, value) => this.onSelect(index, value)}>
                            <RadioButtonPay Button value="钱包"
                                            style={{
                                            flexDirection: 'row-reverse',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Image
                                        source={{uri: 'https://www.baidu.com/img/bd_logo1.png'}}
                                        style={{width: 28, height: 28}}
                                    />
                                    <Label size='md' type='title' text='钱包' style={{marginLeft: 10}}/>
                                </View>
                            </RadioButtonPay>
                            <RadioButtonPay Button value="支付宝"
                                            style={{
                                            flexDirection: 'row-reverse',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Image
                                        source={{uri: 'https://www.baidu.com/img/bd_logo1.png'}}
                                        style={{width: 28, height: 28}}
                                    />
                                    <Label size='md' type='title' text='支付宝' style={{marginLeft: 10}}/>
                                </View>
                            </RadioButtonPay>
                            <RadioButtonPay Button value="微信"
                                            style={{
                                            flexDirection: 'row-reverse',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}>
                                <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                                    <Image
                                        source={{uri: 'https://www.baidu.com/img/bd_logo1.png'}}
                                        style={{width: 28, height: 28}}
                                    />
                                    <Label size='md' type='title' text='微信' style={{marginLeft: 10}}/>
                                </View>
                            </RadioButtonPay>
                        </RadioGroupPay>

                    </View>
                </View>
                <Button title="立即支付"
                        size='lg'
                        style={{margin:10}}
                        onPress={this._userToPay}
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
});

const dispatchAction = (dispatch) => ({
    // login: (user, pwd) => dispatch(userActions.login(user, pwd))
    // loginAction: bindActionCreators(loginActions, dispatch),
});

export default connect(mapState, dispatchAction)(ParkingPayPage)