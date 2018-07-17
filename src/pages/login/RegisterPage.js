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
    TouchableOpacity
} from 'react-native';
import {connect} from 'react-redux';
import Button from 'teaset/components/Button/Button';
import Toast from 'teaset/components/Toast/Toast';
import Input from 'teaset/components/Input/Input';

import LoginStyle from '../../assets/styles/LoginStyle';

import * as loginAction from '../../actions/login';
import NetUtil from '../../net/NetUtils';
import SHA1Util from '../../utils/SHA1Util';

class RegisterPage extends Component {

    constructor(props) {
        super(props);
        this.fromPage = 0;
        this.newUuid = '';
        this.state = {
            netImg: 'https://www.baidu.com/img/bd_logo1.png',
            userPhone: '',
            imgCode: '',
            verifyCode: '',
            imgCodeVisible: false
        };
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.getParam('titleName'),
            fromPage: navigation.getParam('fromPage'),
        }
    };

    //获取图形验证码
    _getVerifyCode = () => {
        let service = '/member/verify_code';
        let uuid = this.uuid();
        uuid = uuid.replace(/-/g, "");
        this.newUuid = uuid;
        let sha1_result = SHA1Util.hex_sha1(uuid);
        let params = {
            sessionId: sha1_result,
            random: uuid,
        };
        NetUtil.postJsonCallBackImg(service, params, (result) => {
            this.setState({
                netImg: result
            })
        })
    };

    //注册获取验证码
    _getRegisterVerificationCode = () => {
        let service = '/member/register_verification_code';
        let params = {
            userCode: this.state.userPhone,
        };
        NetUtil.postJsonCallBack(service, params, (result) => {
            Toast.success('获取验证码成功' + result);
            if (result) {
                //显示图形验证码，获取图形验证码
                this.setState({
                    imgCodeVisible: true
                });
            } else {
                //不显示图形验证码
                this.setState({
                    imgCodeVisible: true
                });
            }
            // this._getVerifyCode();
        })
    };

    //注册附带图形验证码请求验证码
    _getAgainRegisterVerificationCode = () => {
        let service = '/member/register_verification_code';
        let sha1_result = SHA1Util.hex_sha1(this.newUuid);
        let params = {
            userCode: this.state.userPhone,
            sessionId: sha1_result,
            verifyCode: this.state.imgCode,
        };
        NetUtil.postJsonCallBack(service, params, (result) => {
            Toast.success('获取验证码成功' + result);

        })
    };

    _userNextStep = () => {
        const {navigation} = this.props;
        let fromPage = this.fromPage;
        if (fromPage == 0) {
            navigation.navigate('ForgetPage', {
                userCode: this.state.userPhone,
                msgPwd: this.state.verifyCode,
                titleName: '设置密码',
                fromPage: fromPage,
            })
        } else {
            navigation.navigate('ForgetPage', {
                userCode: this.state.userPhone,
                msgPwd: this.state.verifyCode,
                titleName: '输入新密码',
                fromPage: fromPage,
            })
        }

    };

    // 重置获取验证码(忘记密码)
    _userResetYzm = () => {
        let service = 'member/reset_verification_code';
        let params = {
            userCode: this.state.userPhone,
        };
        NetUtil.postJsonCallBack(service, params, (result) => {
            Toast.success('获取验证码成功' + result);
            if (result) {
                //显示图形验证码，获取图形验证码
                this.setState({
                    imgCodeVisible: true
                });
            } else {
                //不显示图形验证码
                this.setState({
                    imgCodeVisible: true
                });
            }
            // this._getVerifyCode();
        })
    };

    //重置获取验证码--附带图形验证码请求验证码
    _getResetRegisterVerificationCode = () => {
        let service = '/member/reset_verification_code';
        let sha1_result = SHA1Util.hex_sha1(this.newUuid);
        let params = {
            userCode: this.state.userPhone,
            sessionId: sha1_result,
            verifyCode: this.state.imgCode,
        };
        NetUtil.postJsonCallBack(service, params, (result) => {
            Toast.success('获取验证码成功' + result);

        })
    };

    render() {
        //图形验证码
        let imgCodeComponent = this.state.imgCodeVisible ?
            <View style={styles.imgCodeView}>
                <Input
                    style={styles.inputView}
                    size="lg"
                    placeholder="请输入图形验证码"
                    value={this.state.imgCode}
                    onChangeText={text => this.setState({imgCode: text})}
                />
                <TouchableOpacity
                    onPress={()=>{this._getVerifyCode()}}>
                    <Image
                        source={{uri: this.state.netImg}}
                        resizeMode="stretch"
                        style={{width: 90, height: 50}}
                    />
                </TouchableOpacity>
            </View> : <View/>;

        return (
            <View style={styles.container}>
                <Input
                    style={{margin: 10}}
                    size="lg"
                    placeholder="请输入手机号"
                    value={this.state.userPhone}
                    onChangeText={text => this.setState({userPhone: text})}
                />
                {imgCodeComponent}
                <View style={styles.imgCodeView}>
                    <Input
                        style={styles.inputView}
                        size="lg"
                        placeholder="请输入验证码"
                        value={this.state.verifyCode}
                        onChangeText={text => this.setState({verifyCode: text})}
                    />
                    <Button
                        style={{width: 90, height: 50}}
                        title="倒计时按钮"
                        onPress={()=>{
                        this._getAgainRegisterVerificationCode()
                    }}/>
                </View>

                <Button title="注册获取验证码"
                        size='lg'
                        type='primary'
                        style={LoginStyle.bottomBt}
                        onPress={() => {
                            this._getRegisterVerificationCode()
                        }}/>

                <View style={{flexDirection:'row'}}>
                    <Text>注册即视为同意并阅读</Text>
                    <Text>《服务条款》</Text>
                </View>

                <Button title="下一步"
                        size='lg'
                        type='primary'
                        style={LoginStyle.bottomBt}
                        onPress={() => {
                            this._userNextStep()
                        }}/>
            </View>
        );
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


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    imgCodeView: {
        flexDirection: 'row',
        marginRight: 10,
    },
    inputView: {
        margin: 10,
        flex: 1
    }
});

const mapState = (state) => ({
    nav: state.nav,
    // login: state.login,
});

const dispatchAction = (dispatch) => ({
    // getVerifyCode: (sessionId, random) => dispatch(loginAction.getVerifyCode(sessionId, random)),
    // getRegisterVerificationCode: (userCode, sessionId, verifyCode) => dispatch(loginAction.getRegisterVerificationCode(userCode, sessionId, verifyCode)),
});

export default connect(mapState, dispatchAction)(RegisterPage);