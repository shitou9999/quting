/**
 * Created by PVer on 2018/7/14.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Toast from 'teaset/components/Toast/Toast';

import * as HttpUtil from '../../net/HttpUtils';

//停车记录-道路
class ParkingRecordPage extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    //parking_record/parklot_his/page

    /***
     * 路内(道路)历史停车记录-分页
     * @private
     */
    _getRequestRoadRecordList = ()=>{
      let service = '/parking_record/section_his/page';
        HttpUtil.fetchRequest(service,'GET')
            .then(json=>{
                if (json.code === "000000") {
                    Toast.success('请求成功');

                } else {
                    Toast.fail(json.msg)
                }
            })
            .catch(err => {
            })
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>ParkingRecordPage</Text>
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

export default ParkingRecordPage;