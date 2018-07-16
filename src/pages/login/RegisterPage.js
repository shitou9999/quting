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
    Image,
} from 'react-native';
import {connect} from 'react-redux';
import Button from 'teaset/components/Button/Button';
import Toast from 'teaset/components/Toast/Toast';

import LoginStyle from '../../assets/styles/LoginStyle';

import * as loginAction from '../../actions/login';
import NetUtil from '../../net/NetUtils';
import HttpUtils from '../../net/HttpUtils';
import SHA1Util from '../../utils/SHA1Util';

class RegisterPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            netImg: 'https://www.baidu.com/img/bd_logo1.png'
        }
    }

    /* 生产uuid */
    uuid() {
        let s = [];
        let hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";
        let uuid = s.join("");
        return uuid;
    }

    _getVerifyCode = () => {
        let uuid = this.uuid();
        uuid = uuid.replace(/-/g, "");
        let sha1_result = SHA1Util.hex_sha1(uuid);
        let service = '/member/verify_code';

        NetUtil.postJsonCallBackImg(service, {
            sessionId: sha1_result,
            random: uuid,
        }, (result) => {
            this.setState({
                netImg: result
            })
        }, (fail) => {
            Toast.fail('获取图形验证码异常')
        })
    };

    _getRegisterVerificationCode = () => {

    };

    _userRegister = () => {
        Toast.show('用户注册')
    };

    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <Image
                    source={{uri: this.state.netImg}}
                    style={{width: 178, height: 78}}
                />
                <Button title="获取图形验证码"
                        size='lg'
                        type='primary'
                        style={LoginStyle.bottomBt}
                        onPress={() => {
                            this._getVerifyCode()
                        }}/>

                <Button title="注册获取验证码"
                        size='lg'
                        type='primary'
                        style={LoginStyle.bottomBt}
                        onPress={() => {
                            this._getRegisterVerificationCode()
                        }}/>
                <Image
                    source={{uri: 'https://www.baidu.com/img/bd_logo1.png'}}
                    style={{width: 68, height: 68}}
                />
                <Button title="注册"
                        size='lg'
                        type='primary'
                        style={LoginStyle.bottomBt}
                        onPress={() => {
                            this._userRegister()
                        }}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
});

const mapState = (state) => ({
    nav: state.nav,
    login: state.login,
});

const dispatchAction = (dispatch) => ({
    getVerifyCode: (sessionId, random) => dispatch(loginAction.getVerifyCode(sessionId, random)),
    getRegisterVerificationCode: (userCode, sessionId, verifyCode) => dispatch(loginAction.getRegisterVerificationCode(userCode, sessionId, verifyCode)),
});

export default connect(mapState, dispatchAction)(RegisterPage);