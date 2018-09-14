/**
 * Created by PVer on 2018/7/14.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Dimensions, Button, FlatList} from 'react-native';
import {connect} from 'react-redux';
import Toast from 'teaset/components/Toast/Toast'
import {UltimateListView} from "react-native-ultimate-listview"
import RecordView from '../../components/RecordView'

import * as HttpUtil from '../../net/HttpUtils'

//停车记录-停车场
class ParkingLotPage extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    /***
     * 路外(停车场)历史停车记录-分页
     * @private
     */
    onFetch = async(page = 1, startFetch, abortFetch) => {
        try {
            const {login} = this.props;
            let userId = login.user.id
            let start = 0
            let pageLimit = 10;
            let service = `/parking_record/parklot_his/page?userId=${userId}&start=${start}&length=10`;
            HttpUtil.fetchRequest(service, 'GET')
                .then(json => {
                    let allData = json.aaData;
                    let newData = []
                    newData = allData;
                    startFetch(newData, pageLimit);
                })
                .catch(err => {
                })
        } catch (err) {
            abortFetch(); //如果遇到网络错误，手动停止刷新或分页
            console.log(err);
        }
    };

    renderItem = (item, index, separator) => {
        return (
            <RecordView parklotName={item.parklotName} plate={item.plate} plateColor={item.plateColor}
                        inTime={item.inTime} outTime={item.outTime} inPic={item.inPic} outPic={item.outPic}/>
        )
    }

    render() {
        return (
            <View >
                <UltimateListView
                    ref={(ref) => this.flatList = ref}
                    refreshableMode="basic"
                    onFetch={this.onFetch}
                    keyExtractor={(item, index) => `${index} - ${item}`}
                    item={this.renderItem}
                    displayDate
                    arrowImageStyle={{ width: 20, height: 20, resizeMode: 'contain' }}
                    emptyView={this._renderEmptyView}
                />
            </View>
        );
    }

    _renderEmptyView = () => {
        return <Text>我是没数据</Text>
    }

}

const styles = StyleSheet.create({
    container: {},
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },

});

const mapState = (state) => ({
    nav: state.nav,
    login: state.login,
    me: state.me,
});

const dispatchAction = (dispatch) => ({
    // loginAction: bindActionCreators(loginActions, dispatch),
});

export default connect(mapState, dispatchAction)(ParkingLotPage);