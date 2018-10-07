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
import BaseContainer from "../../components/BaseContainer"

import {commonStyle} from '../../constants/commonStyle'
import * as homeAction from '../../actions/home'
import Pay from '../../components/base/Pay'
import * as OrderUtil from "../../utils/OrderUtil"


class ParkingPayPage extends Component {

    constructor(props) {
        super(props);
        this.boPostpaidCode = ''
        this.recordCode = ''
        this.payMoney = 0
        this.state = {
            selectIndex: 0,
        }
    }

    componentDidMount() {
        this.boPostpaidCode = this.props.navigation.getParam('boPostpaidCode')
        this.recordCode = this.props.navigation.getParam('recordCode')
        this.payMoney = this.props.navigation.getParam('payMoney')
    }

    _userOveragePay = () => {
        const {login} = this.props
        this.props.homeAction.userOveragePay(login.user.id, this.recordCode, this.boPostpaidCode, '123457')
            .then(response => {
                if (response.result) {
                    Toast.message('钱包支付成功')
                } else {
                    Toast.message(`钱包支付失败-${response.msg}`)
                }
            })
    }


    _userAliPay = () => {
        const {login} = this.props
        this.props.homeAction.userAliPay(login.user.id, this.recordCode, this.boPostpaidCode)
            .then(response => {
                if (response.result) {
                    Toast.message('生成结算订单成功')
                    let order = response.data
                    let info = OrderUtil.getOrderInfo(order)
                    const payInfo = info + "&sign=\"" + order.sign + "\"&sign_type=\"" + order.sign_type + "\""
                    Pay.onAliPay(payInfo)
                } else {
                    Toast.message('生成结算订单失败')
                }
            })
    }

    _userWeChatPay = () => {
        const {login} = this.props
        this.props.homeAction.userWeChatPay(login.user.id, this.recordCode, this.boPostpaidCode)
            .then(response => {
                if (response.data) {
                    Toast.message('生成结算订单成功')
                    let order = response.data
                    Pay.onWxPay({
                        appid: order.appid,
                        partnerid: order.partnerid,
                        noncestr: order.noncestr,
                        timestamp: order.timestamp,
                        prepayid: order.prepayid,
                        package: order.packages,
                        sign: order.sign,
                    })
                } else {
                    Toast.message('生成结算订单失败')
                }
            })
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
        const {navigation} = this.props
        return (
            <BaseContainer title={'支付'}>
                <View style={{flex: 1}}>
                    <View
                        style={{
                            height: 150,
                            justifyContent: commonStyle.center,
                            alignItems: commonStyle.center,
                            backgroundColor: commonStyle.white
                        }}>
                        <Label size='md' text='应缴金额(元)' type='detail'/>
                        <Label size='xl' text={this.payMoney} type='detail'/>
                    </View>
                    <View style={{margin: commonStyle.margin}}>
                        <Label size='md' text='付款方式' type='title'/>
                    </View>
                    <View style={{backgroundColor: commonStyle.white}}>
                        <RadioGroupPay
                            thickness={2}
                            size={20}
                            selectedIndex={0}
                            onSelect={(index, value) => this.onSelect(index, value)}>
                            <RadioButtonPay Button value="钱包"
                                            style={{
                                                flexDirection: commonStyle.reverse,
                                                justifyContent: commonStyle.between,
                                                alignItems: commonStyle.center,
                                            }}>
                                <View style={{flexDirection: commonStyle.row, alignItems: commonStyle.center}}>
                                    <Image
                                        source={require('../../assets/images/pay_wallet.png')}
                                        resizeMode='contain'
                                        style={{width: 28, height: 28}}
                                    />
                                    <Label size='md' type='title' text='钱包' style={{marginLeft: 10}}/>
                                </View>
                            </RadioButtonPay>
                            <RadioButtonPay Button value="支付宝"
                                            style={{
                                                flexDirection: commonStyle.reverse,
                                                justifyContent: commonStyle.between,
                                                alignItems: commonStyle.center,
                                            }}>
                                <View style={{flexDirection: commonStyle.row, alignItems: commonStyle.center}}>
                                    <Image
                                        source={require('../../assets/images/pay_ali_pay.png')}
                                        resizeMode='contain'
                                        style={{width: 28, height: 28}}
                                    />
                                    <Label size='md' type='title' text='支付宝' style={{marginLeft: 10}}/>
                                </View>
                            </RadioButtonPay>
                            <RadioButtonPay Button value="微信"
                                            style={{
                                                flexDirection: commonStyle.reverse,
                                                justifyContent: commonStyle.between,
                                                alignItems: commonStyle.center,
                                            }}>
                                <View style={{
                                    flexDirection: commonStyle.row,
                                    alignItems: commonStyle.center,
                                }}>
                                    <Image
                                        source={require('../../assets/images/pay_we_chat.png')}
                                        resizeMode='contain'
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
                        style={{margin: commonStyle.margin}}
                        onPress={this._userToPay}
                        type='primary'/>
            </BaseContainer>
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
    home: state.home
})

const dispatchAction = (dispatch) => ({
    homeAction: bindActionCreators(homeAction, dispatch),
})

export default connect(mapState, dispatchAction)(ParkingPayPage)
