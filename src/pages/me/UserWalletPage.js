/**
 * Created by cyh on 2018/7/12.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, Alert, Switch, ImageBackground} from 'react-native'
import {connect} from 'react-redux'
import ListRow from 'teaset/components/ListRow/ListRow'
import Toast from 'teaset/components/Toast/Toast'
import Label from "teaset/components/Label/Label"
import Button from 'teaset/components/Button/Button'
import Overlay from 'teaset/components/Overlay/Overlay'
import PasswordInput from '../../components/PasswordInput'
import TitleBar from "../../components/TitleBar"

import * as HttpUtil from '../../net/HttpUtils'
import {commonStyle} from '../../constants/commonStyle'


class UserWalletPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            animated: false
        }
    }

    /**
     * 设置自动支付
     * @private
     */
    _getRequestAutoPay = () => {
        let service = '/overage/is_auto'
        let params = {
            "userId": this.props.me.user_info.userId,
            "isAuto": ""
        }
        HttpUtil.fetchRequest(service, 'POST', params)
            .then(json => {
                if (json.code === "000000") {
                    Toast.message('设置自动支付成功');
                } else {
                    Toast.message(json.msg)
                }
            })
            .catch(err => {
            })
    }

    /**
     * 设置支付密码
     * @private
     */
    _getRequestPayPwd = () => {
        let service = '/member/set_pay_pwd'
        let params = {
            "userId": this.props.me.user_info.userId,
            "payPwd": ""
        }
        HttpUtil.fetchRequest(service, 'POST', params)
            .then(json => {
                if (json.code === "000000") {
                    Toast.message('设置成功');
                } else {
                    Toast.message(json.msg)
                }
            })
            .catch(err => {
            })
    }

    _showPasswordInputPop = (type, modal, text) => {
        let overlayView = (
            <Overlay.PopView
                ref={v => this.overlayPopView = v}
                style={{alignItems: commonStyle.center, justifyContent: commonStyle.center}}
                type={type}
                modal={modal}>
                <View
                    style={{
                        backgroundColor: commonStyle.white,
                        minWidth: 260,
                        borderRadius: 5,
                        justifyContent: commonStyle.between,
                        alignItems: commonStyle.center
                    }}>
                    <View
                        style={{
                            backgroundColor: 'blue',
                            height: 50,
                            width: 260,
                            borderTopLeftRadius: 5,
                            borderTopRightRadius: 5,
                            justifyContent: commonStyle.center,
                            alignItems: commonStyle.center
                        }}>
                        <Text style={{fontSize: 20}}>请输入密码</Text>
                    </View>
                    <PasswordInput maxLength={6}
                                   style={{marginLeft: commonStyle.marginLeft, marginRight: commonStyle.marginRight}}
                                   onChange={(value) => {
                                       console.log('输入的密码：', value)
                                   }}
                                   onSubmit={(value) => {
                                       console.log('密码为:' + value)
                                   }}
                    />
                    <View style={{flexDirection: commonStyle.row, height: 50}}>
                        <Button title='取消' type='link'
                                style={{flex: 1}}
                                onPress={() => {
                                    this.overlayPopView && this.overlayPopView.close()
                                }}/>
                        <Button title='确定拨打' type='link'
                                style={{flex: 1}}
                                onPress={() => {
                                    this.overlayPopView && this.overlayPopView.close()
                                }}/>
                    </View>
                </View>
            </Overlay.PopView>
        );
        Overlay.show(overlayView);
    }


    render() {
        const {navigation, me} = this.props;
        let rightImg = require('../../assets/images/me_pay_detail.png')
        return (
            <View style={styles.container}>
                <TitleBar title={'钱包'}
                          navigation={this.props.navigation}
                          rightImage={rightImg}
                          pressRight={() => {
                              navigation.navigate('PayDetailPage')
                          }}/>
                <ImageBackground
                    style={{height: 150, backgroundColor: "rgba(254,200,46,0)"}}
                    source={require('../../assets/images/me_wallet_bg.png')}
                >
                    <View style={{
                        height: 150,
                        justifyContent: commonStyle.center,
                        alignItems: commonStyle.center
                    }}>
                        <Label size='md' type='title' style={{color: commonStyle.white}} text='余额'/>
                        <Label size='lg' type='title' style={{color: commonStyle.white}}
                               text={me.user_info.overagePrice}/>
                        <Label size='md' type='title' style={{color: commonStyle.white}} text='支付停车费时优先使用'/>
                    </View>
                </ImageBackground>

                <ListRow
                    title='自动付费(停车后自动用钱包缴费)'
                    icon={require('../../assets/images/me_auto_pay.png')}
                    detail={
                        <Switch
                            value={this.state.animated}
                            onValueChange={value => this.setState({animated: value})}/>
                    }
                />
                <ListRow
                    title='充值'
                    icon={require('../../assets/images/me_charge.png')}
                    onPress={() => {
                        navigation.navigate('UserRechargePage')
                    }}
                />
                <ListRow
                    title='优惠券'
                    icon={require('../../assets/images/me_coupon.png')}
                    onPress={() => {
                        navigation.navigate('CouponPage')
                    }}
                />
                <ListRow
                    title='月卡'
                    icon={require('../../assets/images/me_mouth_card.png')}
                    onPress={() => {
                        navigation.navigate('MouthCardPage')
                    }}
                />
                <ListRow
                    style={{marginTop: commonStyle.marginTop}}
                    title='重置支付密码'
                    icon={require('../../assets/images/me_reset_pwd.png')}
                    onPress={() => {
                        // navigation.navigate('ResetPwdPage')
                        this._showPasswordInputPop('zoomIn', false, 'Pop zoom in')
                    }}
                />

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
    // loginAction: bindActionCreators(loginActions, dispatch)
});

export default connect(mapState, dispatchAction)(UserWalletPage)