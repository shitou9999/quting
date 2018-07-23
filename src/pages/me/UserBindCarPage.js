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
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Toast from 'teaset/components/Toast/Toast';

import * as HttpUtil from '../../net/HttpUtils';

class UserBindCarPage extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    // static navigationOptions = ({ navigation }) => {
    //     return {
    //         title: navigation.getParam('otherParam', 'A Nested Details Screen'),
    //     };
    // };

    //在props被改变时更新一些东西
    componentWillReceiveProps(nextProps) {
        Alert.alert('9999999')
    }

    /**
     * 查询车辆信息(绑定)
     * @private
     */
    _getRequestCarBind = ()=>{
        ///vehicle/list?userId=1100000000029
        let userId = '';
        let service = `/vehicle/list?userId=${userId}`;
        HttpUtil.fetchRequest(service,'GET')
            .then(json => {
                if (json.code === "000000") {
                    Toast.success('请求成功');
                } else {
                    Toast.fail(json.msg)
                }
            })
            .catch(err => {
            })
    };

    /**
     * 解绑车辆
     * @private
     */
    _getRequestUnbindCar = () =>{
        let service = '/vehicle/unbind';
        let params = {
            "userId": 0,
            "plate": "",
            "plateColor": ""
        };
        HttpUtil.fetchRequest(service,'POST',params)
            .then(json => {
                if (json.code === "000000") {
                    Toast.success('解绑成功');
                } else {
                    Toast.fail(json.msg)
                }
            })
            .catch(err => {
            })
    };

    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>UserBindCarPage</Text>
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

const mapState = (state) => ({
    // isLoginLable: state.user.isLoginLable,
});

const dispatchAction = (dispatch) => ({
    // register: (user, pwd) => dispatch(userActions.register(user, pwd, pwd)),
    // login: (user, pwd) => dispatch(userActions.login(user, pwd))
    // loginAction: bindActionCreators(loginActions, dispatch),
    // userAction: bindActionCreators(userActions, dispatch)
});

export default connect(mapState, dispatchAction)(UserBindCarPage)