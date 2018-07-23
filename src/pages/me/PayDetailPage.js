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
} from 'react-native';
import Toast from 'teaset/components/Toast/Toast';

import * as HttpUtil from '../../net/HttpUtils';

//钱包明细
class PayDetailPage extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    /**
     * 查询钱包明细
     * @private
     */
    _getRequestPayRecord = ()=>{
        let userId = 0;
        let start = 0;
        let service = '/overage/record?userId=&start=0&length=10&';
        HttpUtil.fetchRequest(service,'GET')
            .then(json => {
                if (json.code === "000000") {
                    Toast.success('获取成功');
                } else {
                    Toast.fail(json.msg)
                }
            })
            .catch(err => {
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>PayDetailPage</Text>
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

export default PayDetailPage;