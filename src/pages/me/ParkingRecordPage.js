/**
 * Created by PVer on 2018/7/14.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {RecordView} from '../../components'
import userAction from '../../actions/user'
import {SFListView, EmptyView} from "../../components/base"

class ParkingRecordPage extends Component {

    constructor(props) {
        super(props);
        this.pageStart = 0
        this.state = {}
    }


    componentDidMount() {
        this._onRefresh()
    }

    _onRefresh = () => {
        this.props.userAction.getSectionHis(this.props.login.user.id, 0, 10)
            .then(response => {
                if (response.result) {
                    this.listView.setRefreshing(false)
                    this.listView.setData(response.data)
                } else {
                    this.listView.setRefreshing(false)
                }
            })
    }


    _onEndReached = () => {
        this.start += 10
        this.props.userAction.getSectionHis(this.props.login.user.id, this.pageStart, 10)
            .then(response => {
                if (response.result) {
                    this.listView.addData(response.data)
                }
            })
    }

    _itemClick = (item) => {
        this.props.navigation.navigate('ParkingRecordDetailPage', {item})
    }

    renderItem = (item) => {
        let data = item.item
        let index = item.index
        return (
            <RecordView parklotName={data.sectionName}
                        recordCode={data.recordCode}
                        plate={data.plate}
                        plateColor={data.plateColor}
                        inTime={data.chargeStartTime}
                        outTime={data.chargeEndTime}
                        inPic={data.pic1}
                        outPic={data.pic2}
                        itemClick={this._itemClick}
            />
        )
    }

    render() {
        return (
            <View>
                <SFListView
                    ref={ref => {
                        this.listView = ref
                    }}
                    showBackGround={true}
                    renderItem={this.renderItem}
                    onRefresh={this._onRefresh}
                    onLoad={this._onEndReached}/>
            </View>
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
})

const dispatchAction = (dispatch) => ({
    userAction: bindActionCreators(userAction, dispatch),
})

export default connect(mapState, dispatchAction)(ParkingRecordPage)
