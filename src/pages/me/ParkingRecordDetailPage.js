/**
 * Created by PVer on 2018/7/14.
 */
import React, {Component} from 'react'
import {Platform, StyleSheet, Text, View} from 'react-native'
import {bindActionCreators} from "redux"
import {Input, ListRow, Button, Overlay, Label, Toast} from "../../components/teaset/index"
import {RecordView, ItemDetailView} from "../../components"
import {SFListView, TitleBar} from "../../components/base"
import {userAction} from '../../actions/index'
import connect from "react-redux/es/connect/connect"

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

