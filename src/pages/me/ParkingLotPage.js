/**
 * Created by PVer on 2018/7/14.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Dimensions, FlatList} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from "redux"
import {RecordView} from '../../components/index'
import {userAction} from '../../actions/index'
import {SFListView} from "../../components/base/index"

class ParkingLotPage extends Component {

    constructor(props) {
        super(props);
        this.start = 0
        this.state = {}
    }

    componentDidMount() {
        this._onRefresh()
    }

    _onRefresh = () => {
        this.props.userAction.getParkLotHis(this.props.login.user.id, 0, 10)
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
        this.props.userAction.getParkLotHis(this.props.login.user.id, this.start, 10)
            .then(response => {
                if (response.result) {
                    this.listView.addData(response.data)
                }
            })
    }

    renderItem = (item) => {
        let data = item.item
        let index = item.index
        return (
            <RecordView parklotName={data.parklotName}
                        plate={data.plate}
                        plateColor={data.plateColor}
                        inTime={data.inTime}
                        outTime={data.outTime}
                        inPic={data.inPic}
                        outPic={data.outPic}/>
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

}


const mapState = (state) => ({
    nav: state.nav,
    login: state.login,
    me: state.me,
})

const dispatchAction = (dispatch) => ({
    userAction: bindActionCreators(userAction, dispatch),
})

export default connect(mapState, dispatchAction)(ParkingLotPage)
