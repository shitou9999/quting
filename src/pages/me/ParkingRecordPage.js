/**
 * Created by PVer on 2018/7/14.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';
import Toast from 'teaset/components/Toast/Toast';
import Label from 'teaset/components/Label/Label';


import RecordView from '../../components/RecordView'

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
    _getRequestRoadRecordList = () => {
        let service = '/parking_record/section_his/page';
        HttpUtil.fetchRequest(service, 'GET')
            .then(json => {
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
            <View style={styles.rootStyle}>
                <View style={{flexDirection: 'row'}}>
                    <Image source={{uri: 'https://www.baidu.com/img/bd_logo1.png'}}
                           style={{width: 80, height: 80,borderRadius:5}}
                    />
                    <View style={{marginLeft: 5}}>
                        <Label size='md' type='title' text='发展一路泊位段发展一路泊位段'/>
                        <View style={{flexDirection: 'row'}}>
                            <Image source={{uri: 'https://www.baidu.com/img/bd_logo1.png'}}
                                   style={{width: 15, height: 15}}
                            />
                            <Label size='md' type='title' text='浙A12345'/>
                        </View>
                    </View>
                </View>
                <View style={{marginTop: 10}}>
                    <View style={{flexDirection: 'row'}}>
                        <Image source={{uri: 'https://www.baidu.com/img/bd_logo1.png'}}
                               style={{width: 15, height: 15}}
                        />
                        <Label size='md' type='title' text='驶入时间:'/>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Image source={{uri: 'https://www.baidu.com/img/bd_logo1.png'}}
                               style={{width: 15, height: 15}}
                        />
                        <Label size='md' type='title' text='离开时间:'/>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {},
    rootStyle: {
        padding: 5,
        borderRadius: 5,
        borderColor: 'gray',
        borderWidth: 1,
        borderStyle: 'solid',
        backgroundColor: 'white'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});

export default ParkingRecordPage;