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
import Toast from 'teaset/components/Toast/Toast'

import * as HttpUtil from '../../net/HttpUtils'
import {commonStyle} from '../../constants/commonStyle'

class UserAddBindCarPage extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }


    /**
     * 绑定车辆
     * @private
     */
    _getRequestBindCar = () => {
        const {me} = this.props
        let service = '/vehicle/bind';
        let params = {
            "userId": me.user_info.userId,
            "plate": "",
            "plateColor": ""
        };
        HttpUtil.fetchRequest(service, 'POST', params)
            .then(json => {
                if (json.code === "000000") {
                    Toast.message('绑定成功');
                } else {
                    Toast.message(json.msg)
                }
            })
            .catch(err => {
            })
    };

    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>UserAddBindCarPage</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: commonStyle.center,
        alignItems: commonStyle.center,
        backgroundColor: commonStyle.white,
    },
    welcome: {
        fontSize: 20,
        textAlign: commonStyle.center,
        margin: commonStyle.margin,
    },
});

const mapState = (state) => ({
    nav: state.nav,
    login: state.login,
    me: state.me,
});

const dispatchAction = (dispatch) => ({
    // login: (user, pwd) => dispatch(userActions.login(user, pwd))
    // loginAction: bindActionCreators(loginActions, dispatch)
});

export default connect(mapState, dispatchAction)(UserAddBindCarPage)