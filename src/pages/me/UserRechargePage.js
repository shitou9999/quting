/**
 * Created by cyh on 2018/8/13.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TouchableOpacity, DeviceEventEmitter} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import RadioGroup from 'react-native-custom-radio-group'
import {commonStyle} from '../../constants/commonStyle'
import {BeeUtil, ViewUtil} from '../../utils/index'
import {userAction} from '../../actions/index'
import {BaseContainer, Pay} from "../../components/base/index"
import {Input, ListRow, Button, Label, Toast} from "../../components/teaset/index"
import {RadioButton as RadioButtonPay, RadioGroup as RadioGroupPay} from "react-native-flexi-radio-button";
import {images} from "../../assets";

class UserRechargePage extends Component {

    constructor(props) {
        super(props);
        // this.onSelect = this.onSelect.bind(this)
        this.state = {
            textPrice: '50',
            overagePrice: 0,
            selectIndex: 0,
        }
    }

    _selectMoney = (value) => {
        this.setState({
            textPrice: value,
        })
    }


    _onSelect = (index, value) => {
        this.setState({
            selectIndex: index,
        })
    }


    _userAliRecharge = () => {
        this.props.userAction.toAliRecharge(this.props.login.user.id, this.state.textPrice)
            .then(response => {
                if (response.result) {
                    Toast.message('生成支付宝充值订单成功')
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
                    Toast.message('生成支付宝充值订单失败')
                }
            })
    }


    _userWeChatRecharge = () => {
        this.props.userAction.toWeChatRecharge(this.props.login.user.id, this.state.textPrice)
            .then(response => {
                if (response.result) {
                    Toast.message('生成微信充值订单成功')
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
                    Toast.message('生成微信充值订单失败')
                }
            })
    }

    _userRecharge = () => {
        const {selectIndex, textPrice} = this.state
        if (parseFloat(textPrice) > 0) {
            if (selectIndex === 0) {
                this._userAliRecharge()
            } else if (selectIndex === 1) {
                this._userWeChatRecharge()
            }
        } else {
            Toast.message('充值金额需大于0元')
        }
    }

    render() {
        const {me} = this.props
        let overagePrice = me.user_info.overagePrice
        if (BeeUtil.isNotEmpty(overagePrice)) {
            this.overagePrice = overagePrice
        }
        const radioGroupList = [{
            label: '50元',
            value: '50'
        }, {
            label: '100元',
            value: '100'
        }, {
            label: '200元',
            value: '200'
        }, {
            label: '500元',
            value: '500'
        }];
        // buttonContainerStyle = {{flex:1,margin: 10, borderWidth: 1, borderColor: Color.whiteE}}
        // buttonContainerActiveStyle = {{backgroundColor: Color.yellowFCE}}

        return (
            <BaseContainer style={styles.container} title={'充值'}>
                <View style={{flex: 1}}>
                    <ListRow
                        style={{height: commonStyle.bottomBtnHeight}}
                        title='账号信息'
                        detail={this.overagePrice}
                        bottomSeparator='full'/>
                    <Input
                        style={styles.input}
                        size='lg'
                        value={this.state.textPrice}
                        placeholder='充值金额'
                        onChangeText={text => this.setState({textPrice: text})}
                    />

                    <RadioGroup
                        radioGroupList={radioGroupList}
                        initialValue={'50'}
                        containerStyle={{flexWrap: 'wrap'}}
                        buttonContainerStyle={{width: 80, margin: 4, borderWidth: 1, borderColor: commonStyle.orange}}
                        buttonContainerActiveStyle={{backgroundColor: commonStyle.orange}}
                        onChange={(value) => this._selectMoney(value)}
                        ref={e => this.RadioGroup = e}
                    />

                    <View style={{backgroundColor: '#E6E6E6', padding: commonStyle.padding}}>
                        <Label size='md' type='title' text='支付方式'/>
                    </View>
                    {/*<PayWayView onSelect={this._onSelect} isVisible={false}/>*/}
                    <View style={{backgroundColor: commonStyle.white}}>
                        <RadioGroupPay
                            thickness={2}
                            size={20}
                            selectedIndex={0}
                            onSelect={this._onSelect}>
                            <RadioButtonPay Button value="支付宝"
                                            style={{
                                                flexDirection: commonStyle.reverse,
                                                justifyContent: commonStyle.between,
                                                alignItems: commonStyle.center,
                                            }}>
                                <View style={{flexDirection: commonStyle.row, alignItems: commonStyle.center}}>
                                    <Image
                                        source={images.pay_ali_pay}
                                        resizeMode='contain'
                                        style={{width: 28, height: 28}}
                                    />
                                    <Label size='md' type='title' text='支付宝'
                                           style={{marginLeft: commonStyle.marginLeft}}/>
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
                                        source={images.pay_we_chat}
                                        resizeMode='contain'
                                        style={{width: 28, height: 28}}
                                    />
                                    <Label size='md' type='title' text='微信'
                                           style={{marginLeft: commonStyle.marginLeft}}/>
                                </View>
                            </RadioButtonPay>
                        </RadioGroupPay>
                    </View>
                </View>
                <Button title="立即充值"
                        size='lg'
                        style={{marginLeft: commonStyle.marginLeft, marginRight: commonStyle.marginRight}}
                        onPress={this._userRecharge}
                        type='primary'/>
            </BaseContainer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        flex: 1
    },
    input: {
        width: gScreen.screen_width,
        height: 50,
        borderColor: commonStyle.white,
        borderRadius: 0,
        marginTop: 5,
    },
});

const mapState = (state) => ({
    nav: state.nav,
    login: state.login,
    me: state.me,
    user: state.user
})

const dispatchAction = (dispatch) => ({
    userAction: bindActionCreators(userAction, dispatch),
})

export default connect(mapState, dispatchAction)(UserRechargePage)
