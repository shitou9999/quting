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
    TouchableOpacity,
    DeviceEventEmitter,
} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Input, ListRow, Button, Overlay, Label, Toast} from "../../components/teaset/index"
import {BindPlateView, UnbindPopView} from '../../components'
import {commonStyle} from '../../constants/commonStyle'
import * as meAction from '../../actions/me'
import {SFListView, LoadingModal, TitleBar} from "../../components/base"
import {Constants} from "../../constants/index"
import {Loading} from '../../utils/index'

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
        this.listener = DeviceEventEmitter.addListener(Constants.Emitter_BIND_REFRESH, msg => {
            this._onRefresh()
        })
        this._onRefresh()
    }

    componentWillUnmount() {
        if (this.listener) {
            this.listener.remove()
        }
    }

    _onRefresh = () => {
        this.props.meAction.getVehicleList(this.props.login.user.id)
            .then(response => {
                if (response.result) {
                    this.listView.setRefreshing(false)
                    this.listView.setData(response.data)
                } else {
                    this.listView.setRefreshing(false)
                }
            })
    }

    _getRequestUnbindCar = (plate, plateColor) => {
        Loading.showLoading()
        this.props.meAction.toRequestUnbindCar(this.props.login.user.id, plate, plateColor)
            .then(response => {
                Loading.disLoading()
                if (response.result) {
                    Toast.message('解绑成功')
                    this._onRefresh()
                } else {
                    Toast.message(response.msg)
                }
            })
    }

    _userClickItem = (itemCar) => {
        let tempFromPage = this.fromPage
        if (tempFromPage === 0) {
            this.props.navigation.goBack()
        } else if (tempFromPage === 1) {
            this.props.navigation.state.params.returnData(itemCar.plate, itemCar.plateColor)
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

    renderItem = (item) => {
        let data = item.item
        let index = item.index
        return (
            <BindPlateView plateColor={data.plateColor}
                           plate={data.plate}
                           approvalStatus={data.approvalStatus}
                           drivingLic={data.drivingLic}
                           owenerName={data.owenerName}
                           panorama={data.panorama}
                           reason={data.reason}
                           sysTime={data.sysTime}
                           vehNo={data.vehNo}
                           itemClick={this._userClickItem}
                           itemLongClick={this._userLongClick}
            />
        )
    };

    render() {
        let isShowAdd = this.state.addBtCar ? (
            <TouchableOpacity onPress={() => {
                this.props.navigation.navigate('BindCarPage')
            }}>
                <View style={{
                    height: 50,
                    backgroundColor: commonStyle.themeColor,
                    justifyContent: commonStyle.center,
                    marginTop: commonStyle.marginTop + 10
                }}>
                    <Text style={{fontSize: 20, color: commonStyle.white, alignSelf: commonStyle.center}}>添加车辆</Text>
                </View>
            </TouchableOpacity>
        ) : null
        return (
            <View style={{flex: 1}}>
                <TitleBar title={'车牌绑定'}/>
                <View style={{flex: 1}}>
                    <SFListView
                        ref={ref => {
                            this.listView = ref
                        }}
                        style={{height: gScreen.screen_height, width: gScreen.screen_width}}
                        showBackGround={true}
                        renderItem={this.renderItem}
                        onRefresh={this._onRefresh}
                        onLoad={this._onEndReached}/>
                </View>
                {isShowAdd}
                <LoadingModal ref={ref => global.loading = ref}/>
            </View>
        );
    }

}

const mapState = (state) => ({
    nav: state.nav,
    login: state.login,
    me: state.me,
})

const dispatchAction = (dispatch) => ({
    meAction: bindActionCreators(meAction, dispatch)
})

export default connect(mapState, dispatchAction)(UserBindCarPage)
