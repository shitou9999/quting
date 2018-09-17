/**
 * Created by cyh on 2018/8/13.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import Input from 'teaset/components/Input/Input'
import ListRow from 'teaset/components/ListRow/ListRow'
import Button from 'teaset/components/Button/Button'
import RadioGroup from 'react-native-custom-radio-group'
import Label from "teaset/components/Label/Label"
import Toast from 'teaset/components/Toast/Toast'
import {RadioGroup as RadioGroupPay, RadioButton as RadioButtonPay} from 'react-native-flexi-radio-button'
import {commonStyle} from '../../constants/commonStyle'
import BeeUtil from '../../utils/BeeUtil'
import * as HttpUtil from '../../net/HttpUtils'
import TitleBar from "../../components/TitleBar"
import Pay from '../../components/Pay'
import * as OrderUtil from '../../utils/OrderUtil'

class UserRechargePage extends Component {

    constructor(props) {
        super(props);
        this.onSelect = this.onSelect.bind(this)
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


    onSelect(index, value) {
        this.setState({
            selectIndex: index,
        })
    }

    //支付宝充值生成充值订单
    _userAliRecharge = () => {
        const {login} = this.props
        let service = '/recharge/zfb_order'
        let params = {
            "userId": login.user.id,
            "rechargeMoney": this.state.textPrice
        }
        HttpUtil.fetchRequest(service, 'POST', params)
            .then(json => {
                if (json.code === "000000") {
                    Toast.message('生成充值订单成功')
                    let order = json.data
                    let info = OrderUtil.getOrderInfo(order)
                    const payInfo = info + "&sign=\"" + order.sign + "\"&sign_type=\"" + order.sign_type + "\"";
                    Pay.onAliPay(payInfo)
                } else {
                    Toast.message('生成充值订单失败')
                }
            })
            .catch()
    }

    //微信充值生成充值订单
    _userWeChatRecharge = () => {
        const {login} = this.props
        let service = '/recharge/wx_order'
        let params = {
            "userId": login.user.id,
            "rechargeMoney": this.state.textPrice
        }
        HttpUtil.fetchRequest(service, 'POST', params)
            .then(json => {
                if (json.code === "000000") {
                    Toast.message('生成充值订单成功')
                    let order = json.data
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
                    Toast.message('生成充值订单失败')
                }
            })
            .catch()
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
            <View style={styles.container}>
                <TitleBar title={'充值'} navigation={this.props.navigation}/>
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
                    <View style={{backgroundColor: 'white'}}>
                        <RadioGroupPay
                            thickness={2}
                            size={20}
                            selectedIndex={0}
                            highlightColor='white'
                            onSelect={(index, value) => this.onSelect(index, value)}>
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
                                        source={require('../../assets/images/pay_we_chat.png')}
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
            </View>
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
    me: state.me
});

const dispatchAction = (dispatch) => ({
    // loginAction: bindActionCreators(loginActions, dispatch),
});

export default connect(mapState, dispatchAction)(UserRechargePage);