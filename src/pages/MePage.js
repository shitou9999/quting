/**
 * Created by cyh on 2018/7/12.
 */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Linking,
    View,
    BackHandler,
    ScrollView,
    StatusBar,
    DeviceEventEmitter
} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {ListRow, Overlay, Toast} from '../components/teaset'
import {BaseContainer} from "../components/base/index"
import {commonStyle} from '../constants/commonStyle'
import {meAction} from '../actions/index'
import {ShowUserDialogView, MeCenterView} from "../components/index"
import {images} from "../assets/index"
import {ViewUtil, checkPermission, LoadingUtils} from "../utils"
import {Constants} from '../constants/index'


class MePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            storageArr: [],
        }
    }

    componentDidMount() {
        gStorage.getAllDataForKey('AUTHENTICATION+STATUS', status => {
            this.setState({
                storageArr: status
            })
        })
        this.navListener = this.props.navigation.addListener('didFocus', () => {
            StatusBar.setBarStyle('light-content')//ios
            gDevice.android && StatusBar.setBackgroundColor('transparent')
        })
        this.walletListener = DeviceEventEmitter.addListener(Constants.Emitter_WALLET_REFRESH, () => {
            LoadingUtils.show()
            this.props.meAction.getQueryUerInfo(this.props.login.user.id)
                .then(response => {
                    LoadingUtils.hide()
                })
        })
        LoadingUtils.show()
        this.props.meAction.getQueryUerInfo(this.props.login.user.id)
            .then(response => {
                LoadingUtils.hide()
            })
    }

    componentWillUnmount() {
        this.navListener && this.navListener.remove()
        this.walletListener && this.walletListener.remove()
    }


    _show() {
        // let secs = 3;
        // ModalIndicator.show(`Close after ${secs} sec(s)`);
        // let timer = setInterval(() => {
        //     secs--;
        //     ModalIndicator.show(`Close after ${secs} sec(s)`);
        //     if (secs < 0) {
        //         clearInterval(timer);
        //         ModalIndicator.hide();
        //     }
        // }, 1000);
    }

    _showCallPhonePop = (type, modal, text) => {
        let overlayView = (
            <Overlay.PopView
                ref={v => this.overlayPopView = v}
                style={{alignItems: commonStyle.center, justifyContent: commonStyle.center}}
                type={type}
                modal={modal}>
                <ShowUserDialogView
                    title={'联系客服'}
                    content={`客服电话:${text}`}
                    yesText={'确定拨打'}
                    clickNo={() => {
                        this.overlayPopView && this.overlayPopView.close()
                    }}
                    clickYes={() => {
                        this.overlayPopView && this.overlayPopView.close()
                        Linking.canOpenURL(`tel:${text}`).then(supported => {
                            if (!supported) {
                                console.log('暂不支持拨打电话')
                            } else {
                                return Linking.openURL(`tel:${text}`)
                            }
                        }).catch(err => console.error('An error occurred', err))
                    }}/>
            </Overlay.PopView>
        );
        Overlay.show(overlayView)
    }

    _judgeNavigate = () => {
        // 0-审核中 1-审核通过 2-审核不通过
        const {navigation, me} = this.props
        let value = me.user_info.authenticationStatus
        if (parseInt(value) === 0) {
            navigation.navigate('AuthenticationDetailPage')
        } else if (parseInt(value) === 1) {
            navigation.navigate('AuthenticationDetailPage')
        } else if (parseInt(value) === 2) {
            navigation.navigate('AuthenticationDetailPage')
        } else {
            navigation.navigate('AuthenticationPage')
        }
    }

    render() {
        const {navigation, me} = this.props
        let userInfo = me.user_info
        let phone = userInfo.customerPhone
        let tempArr = this.state.storageArr || []
        return (
            <BaseContainer isHiddenNavBar={true} isTopNavigator={true}>
                <StatusBar
                    backgroundColor={commonStyle.clear}
                    translucent={true}
                />
                <ScrollView>
                    <View style={styles.rootView}>
                        <MeCenterView {...this.props}
                                      nickName={userInfo.nickName}
                                      overagePrice={userInfo.overagePrice}
                                      vehicleNum={userInfo.vehicleNum}
                                      userPic={userInfo.userPic}
                        />
                        <ListRow
                            title='实名认证'
                            style={{marginTop: commonStyle.marginTop}}
                            bottomSeparator="full"
                            detail={ViewUtil.getValue(tempArr, parseInt(userInfo.authenticationStatus), '未认证')}
                            icon={images.me_authentication}
                            onPress={() => {
                                this._judgeNavigate()
                            }}
                        />
                        <ListRow
                            title='停车记录'
                            bottomSeparator="full"
                            icon={images.me_record}
                            onPress={() => {
                                navigation.navigate('ParkingHistoryPage')
                            }}
                        />
                        <ListRow
                            title='我的订单'
                            bottomSeparator="full"
                            icon={images.me_dingdan}
                            onPress={() => {
                                navigation.navigate('UserOrderPage')
                            }}
                        />
                        <ListRow
                            title='欠费补缴'
                            bottomSeparator="full"
                            icon={images.me_overpay}
                            onPress={() => {
                                navigation.navigate('OverduePayPage')
                            }}
                        />
                        <ListRow
                            title='投诉建议'
                            bottomSeparator="full"
                            icon={images.me_jianyi}
                            onPress={() => {
                                navigation.navigate('ComplaintPage')
                            }}
                        />
                        <ListRow
                            title='客服电话'
                            bottomSeparator="full"
                            icon={images.me_phone}
                            onPress={() => {
                                checkPermission('callPhone').then(result => {
                                    if (result) {
                                        this._showCallPhonePop('zoomIn', false, phone)
                                    } else {
                                        Toast.message('您没有授权此应用拨打电话权限')
                                    }
                                })
                            }}
                        />
                    </View>
                </ScrollView>
            </BaseContainer>
        );
    }
}

const styles = StyleSheet.create({
    rootView: {
        flex: 1,
        flexWrap: 'wrap'
    },
})


const mapState = (state) => ({
    nav: state.nav,
    login: state.login,
    me: state.me,
})

const dispatchAction = (dispatch) => ({
    meAction: bindActionCreators(meAction, dispatch),
})

export default connect(mapState, dispatchAction)(MePage)
