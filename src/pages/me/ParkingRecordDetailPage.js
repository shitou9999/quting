/**
 * Created by PVer on 2018/7/14.
 */
import React, {Component} from 'react'
import {Platform, StyleSheet, Text, View} from 'react-native'
import Toast from 'teaset/components/Toast/Toast'
import TitleBar from "../../components/base/TitleBar"
import * as HttpUtil from '../../net/HttpUtils'
import {commonStyle} from '../../constants/commonStyle'
import RecordView from "../../components/RecordView"
import {SFListView} from "../../components/base/SFListView"
import {bindActionCreators} from "redux"
import userAction from "../../actions/user"
import connect from "react-redux/es/connect/connect"
import ItemDetailView from "../../components/ItemDetailView"

class ParkingRecordDetailPage extends Component {

    constructor(props) {
        super(props);
        this.item = {}
        this.state = {}
    }

    componentDidMount() {
        this.item = this.props.navigation.getParam('item')
        this._onRefresh()
    }

    _onRefresh = () => {
        this.props.userAction.getParkingDetail(this.props.login.user.id, this.item.recordCode)
            .then(response => {
                if (response.result) {
                    this.listView.setRefreshing(false)
                    this.listView.setData(response.data)
                } else {
                    this.listView.setRefreshing(false)
                }
            })
    }


    renderItem = (item) => {
        let data = item.item
        let index = item.index
        return (
            <ItemDetailView payMoney={data.payMoney} opTime={data.opTime} orderType={data.orderType}/>
        )
    }

    render() {
        return (
            <View>
                <TitleBar title={'停车记录详情'}/>
                <RecordView parklotName={this.item.parklotName}
                            plate={this.item.plate}
                            plateColor={this.item.plateColor}
                            inTime={this.item.inTime}
                            outTime={this.item.outTime}
                            inPic={this.item.inPic}
                            outPic={this.item.outPic}
                />
                <SFListView
                    ref={ref => {
                        this.listView = ref
                    }}
                    showBackGround={true}
                    renderItem={this.renderItem}
                    onRefresh={this._onRefresh}
                    onLoad={this._onEndReached}/>
            </View>
        )
    }
}


const mapState = (state) => ({
    nav: state.nav,
    login: state.login,
    me: state.me,
})

const dispatchAction = (dispatch) => ({
    userAction: bindActionCreators(userAction, dispatch),
})

export default connect(mapState, dispatchAction)(ParkingRecordDetailPage)

