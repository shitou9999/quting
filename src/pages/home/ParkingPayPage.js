/**
 * Created by cyh on 2018/7/12.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Alert, Image, DeviceEventEmitter} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Input, ListRow, Button, Overlay, Label, Toast} from "../../components/teaset/index"
import {BaseContainer} from "../../components/base/index"
import {commonStyle} from '../../constants/commonStyle'
import {homeAction} from '../../actions/index'
import {Pay} from '../../native/index'
import {BeeUtil, ViewUtil} from '../../utils/index'
import {ShowPwdDialogView, PayWayView} from "../../components/index"


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

    _showPasswordInputPop = (type, modal) => {
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
        this.props.homeAction.userOveragePay(this.props.login.user.id, this.recordCode, this.boPostpaidCode, value)
            .then(response => {
                if (response.result) {
                    Toast.message('钱包支付成功')
                    this.props.navigation.goBack()
                } else {
                    Toast.message(`钱包支付失败-${response.msg}`)
                }
            })
    }


    _userAliPay = () => {
        this.props.homeAction.userAliPay(this.props.login.user.id, this.recordCode, this.boPostpaidCode)
            .then(response => {
                if (response.result) {
                    Toast.message('生成结算订单成功')
                    let order = response.data
                    let info = ViewUtil.getOrderInfo(order)
                    const payInfo = info + "&sign=\"" + order.sign + "\"&sign_type=\"" + order.sign_type + "\""
                    Pay.onAliPay(payInfo)
                        .then(response => {
                            if (response.code === 200) {
                                Toast.message('支付宝支付成功')
                                this.props.navigation.goBack()
                            } else {
                                Toast.message(`支付宝支付失败-${response.msg}`)
                            }
                        })
                } else {
                    Toast.message('生成结算订单失败')
                }
            })
    }

    _userWeChatPay = () => {
        this.props.homeAction.userWeChatPay(this.props.login.user.id, this.recordCode, this.boPostpaidCode)
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
                    }).then(response => {
                        if (response.code === 200) {
                            Toast.message('微信支付成功')
                            this.props.navigation.goBack()
                        } else {
                            Toast.message(`微信支付失败-${response.msg}`)
                        }
                    })
                } else {
                    Toast.message('生成结算订单失败')
                }
            })
    }

    _onSelect = (index, value) => {
        this.setState({
            selectIndex: index,
        })
    }

    _userToPay = () => {
        const {selectIndex} = this.state
        if (selectIndex === 0) {
            this._showPasswordInputPop('zoomIn', false)
        } else if (selectIndex === 1) {
            this._userAliPay()
        } else if (selectIndex === 2) {
            this._userWeChatPay()
        }
    }


    render() {
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
                    <PayWayView onSelect={this._onSelect} isVisible={true}/>
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
