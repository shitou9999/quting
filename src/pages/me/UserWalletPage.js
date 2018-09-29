/**
 * Created by cyh on 2018/7/12.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, Alert, Switch, ImageBackground} from 'react-native'
import {connect} from 'react-redux'
import ListRow from 'teaset/components/ListRow/ListRow'
import Toast from 'teaset/components/Toast/Toast'
import Label from "teaset/components/Label/Label"
import Overlay from 'teaset/components/Overlay/Overlay'
import ShowPwdDialogView from "../../components/ShowPwdDialogView"
import {commonStyle} from '../../constants/commonStyle'
import * as meActions from '../../actions/me'
import BaseContainer from "../../components/BaseContainer"


class UserWalletPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            animated: false
        }
    }

    componentDidMount() {
        this._showPasswordInputPop()
    }

    _showPasswordInputPop = (type, modal, text) => {
        const {login} = this.props
        let overlayView = (
            <Overlay.PopView
                ref={v => this.overlayPopView = v}
                style={{alignItems: commonStyle.center, justifyContent: commonStyle.center}}
                type={type}
                modal={modal}>
                <ShowPwdDialogView
                    title={'请设置支付密码'}
                    isVisible={false}
                    clickNo={() => {
                        this.overlayPopView && this.overlayPopView.close()
                    }}
                    clickYes={() => {
                        this.overlayPopView && this.overlayPopView.close()
                    }}
                    clickSubmit={(value) => {
                        this.overlayPopView && this.overlayPopView.close()
                        this.props.toRequestPayPwd(login.user.id, value)
                    }}
                />
            </Overlay.PopView>
        );
        Overlay.show(overlayView);
    }


    render() {
        const {navigation, login, me} = this.props
        let rightImg = require('../../assets/images/me_pay_detail.png')
        return (
            <BaseContainer style={styles.container}
                           title={'钱包'}
                           rightImage={rightImg}
                           pressRight={() => {
                               navigation.navigate('PayDetailPage')
                           }}>
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
                            onValueChange={value => {
                                this.setState({animated: value})
                                this.props.toRequestAutoPay(login.user.id, this.state.animated)
                            }}/>
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
                        navigation.navigate('ResetPwdPage')
                    }}
                />
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
});

const dispatchAction = (dispatch) => ({
    toRequestPayPwd: (userId, payPwd) => dispatch(meActions.toRequestPayPwd(userId, payPwd)),
    toRequestAutoPay: (userId, isAuto) => dispatch(meActions.toRequestAutoPay(userId, isAuto))
    // loginAction: bindActionCreators(loginActions, dispatch)
});

export default connect(mapState, dispatchAction)(UserWalletPage)
