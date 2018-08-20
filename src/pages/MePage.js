/**
 * Created by cyh on 2018/7/12.
 */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import ListRow from 'teaset/components/ListRow/ListRow';
import ModalIndicator from 'teaset/components/ModalIndicator/ModalIndicator';
import Toast from 'teaset/components/Toast/Toast';
import Overlay from 'teaset/components/Overlay/Overlay';
import Button from 'teaset/components/Button/Button';
import Label from "teaset/components/Label/Label"
import MeCenterView from '../components/MeCenterView'

import * as meActions from '../actions/me';


class MePage extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentWillMount() {
        // this._show();
    }

    // Alert.alert('提示', '用户名或密码错误', [{
    //     text: '确定', onPress: () => {
    //     }
    // }], {cancelable: false})
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
        const {login} = this.props;
        this.props.getQueryUerInfo(login.user.id, () => {
            Toast.message("99999999999999")
        }, (error) => {
            Toast.message(error)
        })
    }

    _showCallPhonePop = (type, modal, text) => {
        let overlayView = (
            <Overlay.PopView
                ref={v => this.overlayPopView = v}
                style={{alignItems: 'center', justifyContent: 'center'}}
                type={type}
                modal={modal}>
                <View
                    style={{
                        backgroundColor: 'white',
                        minWidth: 260,
                        borderRadius: 5,
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                    <View
                        style={{
                            backgroundColor: 'blue',
                            height: 50,
                            width: 260,
                            borderTopLeftRadius: 5,
                            borderTopRightRadius: 5,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <Text style={{fontSize: 20}}>联系客服</Text>
                    </View>
                    <View style={{height: 50, backgroundColor: 'red', alignItems: 'center', justifyContent: 'center'}}>
                        <Text>客服电话15669961385:{text}</Text>
                    </View>
                    <View style={{flexDirection: 'row', height: 50}}>
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
        const {navigation} = this.props;
        return (
            <ScrollView style={styles.scrollView}>
                <View style={styles.rootView}>
                    <MeCenterView navigation={navigation}/>
                    <ListRow
                        title='停车记录'
                        bottomSeparator="full"
                        icon={require('../assets/images/test.png')}
                        onPress={() => {
                            navigation.navigate('ParkingHistoryPage')
                        }}
                    />
                    <ListRow
                        title='我的订单'
                        bottomSeparator="full"
                        icon={require('../assets/images/test.png')}
                        onPress={() => {
                            navigation.navigate('UserOrderPage')
                        }}
                    />
                    <ListRow
                        title='投诉建议'
                        bottomSeparator="full"
                        icon={require('../assets/images/test.png')}
                        onPress={() => {
                            navigation.navigate('ComplaintPage')
                        }}
                    />
                    <ListRow
                        title='客服电话'
                        bottomSeparator="full"
                        icon={require('../assets/images/test.png')}
                        onPress={() => {
                            this._showCallPhonePop('zoomIn', false, 'Pop zoom in')
                        }}
                    />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    rootView: {
        flex: 1,
        flexWrap: 'wrap'
    },
});


const mapState = (state) => ({
    nav: state.nav,
    login: state.login,
    meUserInfo: state.me,
});

const dispatchAction = (dispatch) => ({
    getQueryUerInfo: (userId, callSucc, callFail) => dispatch(meActions.getQueryUerInfo(userId, callSucc, callFail))
    // loginAction: bindActionCreators(loginActions, dispatch),
});

export default connect(mapState, dispatchAction)(MePage);
