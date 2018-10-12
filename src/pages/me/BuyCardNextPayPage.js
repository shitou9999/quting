/**
 * Created by cyh on 2018/7/12.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Alert, Image, TouchableOpacity,} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Label from 'teaset/components/Label/Label'
import Button from 'teaset/components/Button/Button'
import Toast from 'teaset/components/Toast/Toast'
import {RadioGroup as RadioGroupPay, RadioButton as RadioButtonPay} from 'react-native-flexi-radio-button'
import {commonStyle} from '../../constants/commonStyle'
import TitleBar from "../../components/base/TitleBar"
import Pay from '../../components/base/Pay'
import * as OrderUtil from "../../utils/OrderUtil"
import userAction from '../../actions/user'
import Overlay from "teaset/components/Overlay/Overlay"
import ShowPwdDialogView from "../../components/ShowPwdDialogView"

class BuyCardNextPayPage extends Component {

    constructor(props) {
        super(props);
        this.boCardCode = ''
        this.payMoney = '0'
        this.invalidTime = ''
        this.state = {
            selectIndex: 0,
        }
    }

    // boCardCode (integer, optional): 会员卡业务订单编号,
    // payMoney (number, optional): 会员卡支付金额（元）,
    // invalidTime (string, optional): 结束时间：YYYY-MM-DD

    componentDidMount() {
        const {navigation} = this.props
        this.boCardCode = navigation.getParam('boCardCode')
        this.payMoney = navigation.getParam('payMoney')
        this.invalidTime = navigation.getParam('invalidTime')
    }

    onSelect(index, value) {
        this.setState({
            selectIndex: index,
        })
    }

    _showPasswordInputPop = (type, modal, text) => {
        let overlayView = (
            <Overlay.PopView
                ref={v => this.overlayPopView = v}
                style={{alignItems: commonStyle.center, justifyContent: commonStyle.center}}
                type={type}
                modal={modal}>
                <ShowPwdDialogView
                    title={'请输入支付密码'}
                    isVisible={false}
                    clickNo={() => {
                        this.overlayPopView && this.overlayPopView.close()
                    }}
                    clickYes={() => {
                        this.overlayPopView && this.overlayPopView.close()
                    }}
                    clickSubmit={(value) => {
                        this.overlayPopView && this.overlayPopView.close()
                        this._userOveragePay(value)
                    }}
                />
            </Overlay.PopView>
        );
        Overlay.show(overlayView);
    }

    _userOveragePay = (value) => {
        this.props.userAction.userCardOveragePay(this.props.login.user.id, this.boCardCode, value)
            .then(response => {
                if (response.result) {
                    Toast.message('钱包支付成功')
                    this.props.navigation.goBack('MouthCardPage')
                } else {
                    Toast.message('钱包支付失败-' + response.msg)
                }
            })
    }


    _userAliPay = () => {
        this.props.userAction.userCardAliPay(this.props.login.user.id, this.boCardCode)
            .then(response => {
                if (response.result) {
                    Toast.message('生成订单成功')
                    let order = response.data
                    let info = OrderUtil.getOrderInfo(order)
                    const payInfo = info + "&sign=\"" + order.sign + "\"&sign_type=\"" + order.sign_type + "\""
                    Pay.onAliPay(payInfo)
                } else {
                    Toast.message('生成订单失败-' + response.msg)
                }
            })
    }

    _userWeChatPay = () => {
        this.props.userAction.userCardWeChatPay(this.props.login.user.id, this.boCardCode)
            .then(response => {
                if (response.result) {
                    Toast.message('生成订单成功')
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
                    Toast.message('生成订单失败-' + response.msg)
                }
            })
    }

    _userToPay = () => {
        const {selectIndex} = this.state
        let tempMoney = this.payMoney
        if (parseInt(tempMoney) > 0) {
            if (selectIndex === 0) {
                this._showPasswordInputPop()
            } else if (selectIndex === 1) {
                this._userAliPay()
            } else if (selectIndex === 2) {
                this._userWeChatPay()
            }
        } else {
            Toast.message('支付金额需大于0元')
        }
    }

    render() {
        const {navigation} = this.props
        return (
            <View style={styles.container}>
                <TitleBar title={'缴费'} navigation={navigation}/>
                <View style={{
                    marginTop: commonStyle.marginTop,
                    marginLeft: commonStyle.marginLeft,
                    marginBottom: commonStyle.marginBottom
                }}>
                    <Label size='md' type='detail' text='付款方式'/>
                </View>

                <View style={{backgroundColor: commonStyle.white}}>
                    <RadioGroupPay
                        thickness={2}
                        size={20}
                        selectedIndex={0}
                        highlightColor='white'
                        onSelect={(index, value) => this.onSelect(index, value)}>
                        <RadioButtonPay Button value="钱包"
                                        style={{
                                            flexDirection: commonStyle.reverse,
                                            justifyContent: commonStyle.between,
                                            alignItems: commonStyle.center,
                                        }}>
                            <View style={{flexDirection: commonStyle.row, alignItems: commonStyle.center}}>
                                <Image
                                    source={require('../../assets/images/pay_wallet_pay.png')}
                                    resizeMode='contain'
                                    style={{width: 28, height: 28}}
                                />
                                <Label size='md' type='title' text='钱包' style={{marginLeft: commonStyle.marginLeft}}/>
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
                                <Label size='md' type='title' text='支付宝' style={{marginLeft: commonStyle.marginLeft}}/>
                            </View>
                        </RadioButtonPay>
                        <RadioButtonPay Button value="微信"
                                        style={{
                                            flexDirection: commonStyle.reverse,
                                            justifyContent: commonStyle.between,
                                            alignItems: commonStyle.center,
                                        }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                                <Image
                                    source={require('../../assets/images/pay_we_chat.png')}
                                    resizeMode='contain'
                                    style={{width: 28, height: 28}}
                                />
                                <Label size='md' type='title' text='微信' style={{marginLeft: commonStyle.marginLeft}}/>
                            </View>
                        </RadioButtonPay>
                    </RadioGroupPay>
                </View>

                <View style={{
                    flexDirection: commonStyle.row,
                    marginLeft: commonStyle.marginLeft,
                    marginTop: commonStyle.marginTop
                }}>
                    <Label size='md' type='title' text='月卡有效期至'/>
                    <Label size='md' type='title' text={this.invalidTime}/>
                </View>
                <Button title={`${this.payMoney}元  确认支付`}
                        size='lg'
                        style={{margin: commonStyle.margin, marginTop: 50}}
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
    login: state.login,
    me: state.me,
});

const dispatchAction = (dispatch) => ({
    // login: (user, pwd) => dispatch(userActions.login(user, pwd))
    userAction: bindActionCreators(userAction, dispatch)
});

export default connect(mapState, dispatchAction)(BuyCardNextPayPage)
