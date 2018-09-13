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

import * as HttpUtil from '../../net/HttpUtils'
import {commonStyle} from '../../constants/commonStyle'

class BuyCardNextPayPage extends Component {

    constructor(props) {
        super(props);
        this.boCardCode = ''
        this.payMoney = ''
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

    _userOveragePay = () => {
        const {login, me} = this.props
        let service = '/card/overage'
        let params = {
            "userId": login.user.id,
            "boCardCode": this.boCardCode,
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
        const {login} = this.props
        let service = '/card/zfb_order'
        let params = {
            "userId": login.user.id,
            "boCardCode": this.boCardCode
        }
        HttpUtil.fetchRequest(service, 'POST', params)
            .then(json => {
                if (json.code === "000000") {
                    Toast.message('生成订单成功')

                } else {
                    Toast.message('生成订单失败')
                }
            })
            .catch()
    }

    _userWeChatPay = () => {
        const {login} = this.props
        let service = '/card/wx_order'
        let params = {
            "userId": login.user.id,
            "boPkinCode": this.boCardCode
        }
        HttpUtil.fetchRequest(service, 'POST', params)
            .then(json => {
                if (json.code === "000000") {
                    Toast.message('生成订单成功')

                } else {
                    Toast.message('生成订单失败')
                }
            })
            .catch()
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
                <View style={{marginTop:commonStyle.marginTop,marginLeft:commonStyle.marginLeft,marginBottom:commonStyle.marginBottom}}>
                    <Label size='md' type='detail' text='付款方式'/>
                </View>

                <View style={{backgroundColor:commonStyle.white}}>
                    <RadioGroupPay
                        thickness={2}
                        size={20}
                        selectedIndex={0}
                        highlightColor='#ccc8b9'
                        onSelect={(index, value) => this.onSelect(index, value)}>
                        <RadioButtonPay Button value="钱包"
                                        style={{
                                            flexDirection: commonStyle.reverse,
                                            justifyContent: commonStyle.between,
                                            alignItems: commonStyle.center,
                                        }}>
                            <View style={{flexDirection: commonStyle.row, alignItems: commonStyle.center}}>
                                <Image
                                    source={{uri: 'https://www.baidu.com/img/bd_logo1.png'}}
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
                                    source={{uri: 'https://www.baidu.com/img/bd_logo1.png'}}
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

                <View style={{flexDirection:commonStyle.row,marginLeft:commonStyle.marginLeft,marginTop:commonStyle.marginTop}}>
                    <Label size='md' type='title' text='月卡有效期至'/>
                    <Label size='md' type='title' text={this.invalidTime}/>
                </View>
                <Button title="10元   确认支付"
                        size='lg'
                        style={{margin:10,marginTop:50}}
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
    // loginAction: bindActionCreators(loginActions, dispatch),
    // userAction: bindActionCreators(userActions, dispatch)
});

export default connect(mapState, dispatchAction)(BuyCardNextPayPage)