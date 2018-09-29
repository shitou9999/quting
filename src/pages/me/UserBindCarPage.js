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
    Image,
    TouchableWithoutFeedback,
    DeviceEventEmitter,
} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Toast from 'teaset/components/Toast/Toast'
import Button from 'teaset/components/Button/Button'
import Label from 'teaset/components/Label/Label'
import Overlay from 'teaset/components/Overlay/Overlay'
import {UltimateListView} from "react-native-ultimate-listview"
import BindPlateView from '../../components/BindPlateView'
import UnbindPopView from '../../components/UnbindPopView'
import EmptyView from "../../components/base/EmptyView"
import BaseContainer from "../../components/BaseContainer"

import * as HttpUtil from '../../net/HttpUtils'
import {commonStyle} from '../../constants/commonStyle'
import * as meAction from '../../actions/me'



/**
 * 车牌绑定
 */
class UserBindCarPage extends Component {

    //fromPage 0表示  1购买月卡选择(有返回值)  2 我的 车牌
    constructor(props) {
        super(props);
        this.fromPage = 0
        this.state = {
            addBtCar: true,
        }
    }

    componentDidMount() {
        this.fromPage = this.props.navigation.getParam('fromPage')
        this.listener = DeviceEventEmitter.addListener('bind', msg => {
            this.flatList.onRefresh()
        })
    }

    componentWillUnmount() {
        if (this.listener) {
            this.listener.remove()
        }
    }

    onFetch = async (page = 1, startFetch, abortFetch) => {
        try {
            const {login} = this.props
            let userId = login.user.id;
            let service = `/vehicle/list?userId=${userId}`
            let pageLimit = 10;
            HttpUtil.fetchRequest(service, 'GET')
                .then(json => {
                    if (json.code === "000000") {
                        let allData = json.data;
                        let newData = []
                        newData = allData;
                        startFetch(newData, pageLimit)
                    } else {
                        Toast.message(json.msg)
                    }
                })
                .catch(err => {
                })
        } catch (err) {
            abortFetch();
            console.log(err);
        }
    };

    _getRequestUnbindCar = (plate, plateColor) => {
        const {login} = this.props
        let service = '/vehicle/unbind'
        let params = {
            "userId": login.user.id,
            "plate": plate,
            "plateColor": plateColor
        };
        HttpUtil.fetchRequest(service, 'POST', params)
            .then(json => {
                if (json.code === "000000") {
                    Toast.message('解绑成功')
                } else {
                    Toast.message(json.msg)
                }
            })
            .catch(err => {
            })
    };

    _userClickItem = (itemCar) => {
        let plate = itemCar.plate
        let plateColor = itemCar.plateColor
        let tempFromPage = this.fromPage
        if (tempFromPage === 0) {
            this.props.navigation.goBack()
        } else if (tempFromPage === 1) {
            this.props.navigation.state.params.returnData(plate, plateColor)
            this.props.navigation.goBack()
        } else if (tempFromPage === 2) {
            // 0-未认证 1-审核中 2-已通过 3-未通过（数据字典(member平台)：APPROVAL_STATUS）
            let approvalStatus = itemCar.approvalStatus
            if (parseInt(approvalStatus) === 2 || parseInt(approvalStatus) === 1) {
                this.props.navigation.navigate('CarDetailPage', {itemCar: itemCar})
            } else {
                this.props.navigation.navigate('CarApprovalPage', {itemCar: itemCar})
            }
        }
    }

    _userLongClick = (plate, plateColor) => {
        this._showUnbindPop('zoomIn', false, plate, plateColor)
    }

    _showUnbindPop = (type, modal, plate, plateColor) => {
        let overlayView = (
            <Overlay.PopView
                ref={v => this.overlayPopView = v}
                style={{alignItems: commonStyle.center, justifyContent: commonStyle.center}}
                type={type}
                modal={modal}>
                <UnbindPopView
                    userUnbindCar={() => {
                        this.overlayPopView && this.overlayPopView.close()
                        this._getRequestUnbindCar(plate, plateColor)
                    }}
                    userClose={() => {
                        this.overlayPopView && this.overlayPopView.close()
                    }}/>
            </Overlay.PopView>
        );
        Overlay.show(overlayView);
    }

    renderItem = (item, index, separator) => {
        return (
            <BindPlateView plateColor={item.plateColor}
                           plate={item.plate}
                           approvalStatus={item.approvalStatus}
                           drivingLic={item.drivingLic}
                           owenerName={item.owenerName}
                           panorama={item.panorama}
                           reason={item.reason}
                           sysTime={item.sysTime}
                           vehNo={item.vehNo}
                           itemClick={this._userClickItem}
                           itemLongClick={this._userLongClick}
            />
        )
    };

    render() {
        const {navigation} = this.props;
        let isShowAdd = this.state.addBtCar ? (
            <TouchableWithoutFeedback onPress={() => {
                navigation.navigate('BindCarPage')
            }}>
                <View style={{
                    height: 50,
                    backgroundColor: commonStyle.themeColor,
                    justifyContent: commonStyle.center
                }}>
                    <Text style={{fontSize: 20, color: commonStyle.white, alignSelf: commonStyle.center}}>添加车辆</Text>
                </View>
            </TouchableWithoutFeedback>
        ) : null
        return (
            <BaseContainer title={'车牌绑定'}>
                <View style={{flex: 1}}>
                    <UltimateListView
                        ref={(ref) => this.flatList = ref}
                        onFetch={this.onFetch}
                        refreshableMode="basic" //basic or advanced
                        keyExtractor={(item, index) => `${index} - ${item}`}
                        item={this.renderItem}  //this takes two params (item, index)
                        displayDate
                        arrowImageStyle={{width: 20, height: 20, resizeMode: 'contain'}}
                        emptyView={this._renderEmptyView}
                    />
                </View>
                {isShowAdd}
            </BaseContainer>
        );
    }

    _renderEmptyView = () => {
        return <EmptyView/>
    }

}

const mapState = (state) => ({
    nav: state.nav,
    login: state.login,
    me: state.me,
});

const dispatchAction = (dispatch) => ({
    toRequestUnbindCar: (userId, plate, plateColor) => dispatch(meAction.toRequestUnbindCar(userId, plate, plateColor))
    // loginAction: bindActionCreators(loginActions, dispatch)
});

export default connect(mapState, dispatchAction)(UserBindCarPage)
