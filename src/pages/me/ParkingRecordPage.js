/**
 * Created by PVer on 2018/7/14.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';
import {connect} from 'react-redux'
import Toast from 'teaset/components/Toast/Toast'
import Label from 'teaset/components/Label/Label'
import {UltimateListView} from "react-native-ultimate-listview"
import RecordView from '../../components/RecordView'
import EmptyView from '../../components/EmptyView'

import * as HttpUtil from '../../net/HttpUtils';

//停车记录-道路
class ParkingRecordPage extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    //parking_record/parklot_his/page
    componentDidMount() {

    }

    /***
     * 路内(道路)历史停车记录-分页
     * @private
     */
    onFetch = async (page = 1, startFetch, abortFetch) => {
        try {
            const {login} = this.props;
            let userId = login.user.id
            let start = 0
            let pageLimit = 10;
            let service = `/parking_record/section_his/page?userId=${userId}&start=0&length=30&`
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
    // recordCode (string, optional): 停车记录编号,
    // sectionCode (string, optional): 路段编号,
    // sectionName (string, optional): 路段名称,
    // berthCode (string, optional): 泊位编号,
    // plate (string, optional): 车牌号码,
    // plateColor (string, optional): 车牌颜色:数据字典(dcroad平台)--PLATE_COLOR,
    // chargeStartTime (string, optional): 计费开始时间，格式：yyyy-MM-dd HH:mm:ss,
    // chargeEndTime (string, optional): 计费结束时间，格式：yyyy-MM-dd HH:mm:ss,
    // pic1 (string, optional): 取证图片1,
    // pic2 (string, optional): 取证图片2
    renderItem = (item, index, separator) => {
        return (
            <RecordView parklotName={item.sectionName}
                        plate={item.plate}
                        plateColor={item.plateColor}
                        inTime={item.chargeStartTime}
                        outTime={item.chargeEndTime}
                        inPic={item.pic1}
                        outPic={item.pic2}/>
        )
    }

    render() {
        return (
            <View >
                <UltimateListView
                    ref={(ref) => this.flatList = ref}
                    onFetch={this.onFetch}
                    refreshableMode="basic"
                    keyExtractor={(item, index) => `${index} - ${item}`}
                    item={this.renderItem}
                    displayDate
                    arrowImageStyle={{width: 20, height: 20, resizeMode: 'contain'}}
                    emptyView={this._renderEmptyView}
                />
            </View>
        );
    }

    _renderEmptyView = () => {
        return <EmptyView/>
    }
}

const styles = StyleSheet.create({
    rootStyle: {
        padding: 5,
        borderRadius: 5,
        borderColor: 'gray',
        borderWidth: 1,
        borderStyle: 'solid',
        backgroundColor: 'white'
    },
});

const mapState = (state) => ({
    nav: state.nav,
    login: state.login,
    me: state.me,
});

const dispatchAction = (dispatch) => ({
    // getQueryUerInfo: (userId, callSucc, callFail) => dispatch(meActions.getQueryUerInfo(userId, callSucc, callFail))
    // loginAction: bindActionCreators(loginActions, dispatch),
});

export default connect(mapState, dispatchAction)(ParkingRecordPage)