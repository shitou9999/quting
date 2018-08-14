/**
 * Created by PVer on 2018/7/14.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Toast from 'teaset/components/Toast/Toast';

import * as HttpUtil from '../../net/HttpUtils';

//停车记录详情
class ParkingRecordDetailPage extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }


    /***
     * 道路历史停车记录详情
     * @private
     */
    _getRequestRoadDetailList = ()=>{
      let service = '/parking_record/section_his/detail';
        HttpUtil.fetchRequest(service,'GET')
            .then(json=>{
                if (json.code === "000000") {
                    Toast.message('请求成功');
                } else {
                    Toast.message(json.msg)
                }
            })
            .catch(err => {
            })
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>ParkingRecordDetailPage</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});

export default ParkingRecordDetailPage;