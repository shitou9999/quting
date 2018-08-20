/**
 * Created by cyh on 2018/7/12.
 */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Alert,
    Switch,
} from 'react-native';
import ListRow from 'teaset/components/ListRow/ListRow';
import Toast from 'teaset/components/Toast/Toast';

import * as HttpUtil from '../../net/HttpUtils';

class UserWalletPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            animated: false
        }
    }

    /**
     * 设置自动支付
     * @private
     */
    _getRequestAutoPay = () => {
        let service = '/overage/is_auto'
        let params = {
            "userId": 0,
            "isAuto": ""
        }
        HttpUtil.fetchRequest(service, 'POST', params)
            .then(json => {
                if (json.code === "000000") {
                    Toast.message('设置自动支付成功');
                } else {
                    Toast.message(json.msg)
                }
            })
            .catch(err => {
            })
    }

    /**
     * 设置支付密码
     * @private
     */
    _getRequestPayPwd = () => {
        let service = '/member/set_pay_pwd'
        let params = {
            "userId": 0,
            "payPwd": ""
        }
        HttpUtil.fetchRequest(service, 'POST', params)
            .then(json => {
                if (json.code === "000000") {
                    Toast.message('设置成功');
                } else {
                    Toast.message(json.msg)
                }
            })
            .catch(err => {
            })
    }


    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <ListRow
                    title='自动付费(停车后自动用钱包缴费)'
                    icon={require('../../assets/images/test.png')}
                    detail={
                        <Switch
                            value={this.state.animated}
                            onValueChange={value => this.setState({animated: value})}/>
                    }
                />
                <ListRow
                    title='充值'
                    bottomSeparator="full"
                    icon={require('../../assets/images/test.png')}
                    onPress={() => {
                        navigation.navigate('UserRechargePage')
                    }}
                />
                <ListRow
                    title='优惠券'
                    bottomSeparator="full"
                    icon={require('../../assets/images/test.png')}
                    onPress={() => {
                        navigation.navigate('UserOrderPage')
                    }}
                />
                <ListRow
                    title='月卡'
                    bottomSeparator="full"
                    icon={require('../../assets/images/test.png')}
                    onPress={() => {
                        navigation.navigate('UserOrderPage')
                    }}
                />
                <ListRow
                    title='明细'
                    bottomSeparator="full"
                    icon={require('../../assets/images/test.png')}
                    onPress={() => {
                        navigation.navigate('PayDetailPage')
                    }}
                />
                <ListRow
                    style={{marginTop: 10}}
                    title='重置支付密码'
                    bottomSeparator="full"
                    icon={require('../../assets/images/test.png')}
                    onPress={() => {
                        navigation.navigate('ResetPwdPage')
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ff7776',
    },
});

export default UserWalletPage;