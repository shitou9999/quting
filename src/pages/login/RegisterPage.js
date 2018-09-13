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
import {connect} from 'react-redux'
import Button from 'teaset/components/Button/Button'
import Toast from 'teaset/components/Toast/Toast'
import Input from 'teaset/components/Input/Input'

import CountDownButton from '../../components/CountDownButton'
import * as loginAction from '../../actions/login'

import * as HttpUtil from '../../net/HttpUtils'
import SHA1Util from '../../utils/SHA1Util'
import BeeUtil from '../../utils/BeeUtil'
import * as PhoneUtil from '../../utils/PhoneUtil'
import {commonStyle} from '../../constants/commonStyle'

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
            imgCodeVisible: false,
            buttonDisabled: false,
            isGetImgCodeSucc: false,
        };
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.getParam('titleName'),
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
        HttpUtil.postJsonImgCode(service, params, (result) => {
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
        HttpUtil.fetchRequest(service, 'POST', params)
            .then(json => {
                if (json.code === "000000") {
                    Toast.success('获取验证码成功');
                    if (json.data) {
                        //显示图形验证码，获取图形验证码
                        this.setState({
                            imgCodeVisible: true,
                            buttonDisabled: false
                        });
                    } else {
                        //不显示图形验证码
                        this.setState({
                            imgCodeVisible: true,
                            buttonDisabled: true
                        });
                    }
                    // this._getVerifyCode();
                } else {
                    Toast.fail(json.msg)
                }
            })
            .catch(err => {
            })
    };

    /**
     * 获取验证码(注册or忘记密码)
     * @private
     */
    _userRequest = () => {
        const {imgCodeVisible, userPhone, imgCode} = this.state;
        let fromPage = this.fromPage;
        if (imgCodeVisible) {
            //图形验证码显示
            if (BeeUtil.isEmpty(userPhone)) {
                Toast.fail('请输入手机号');
                return
            }
            if (!PhoneUtil.isPhoneNum(userPhone)) {
                Toast.fail('请输入正确的手机号');
                return
            }
            if (BeeUtil.isEmpty(imgCode)) {
                Toast.fail('请输入图形验证码');
                return
            }
            if (fromPage === 0) {
                //注册
                this._getAgainRegisterVerificationCode()
            } else {
                //忘记密码
                this._getResetRegisterVerificationCode()
            }
        } else {
            //图形验证码隐藏中
            if (BeeUtil.isEmpty(userPhone)) {
                Toast.fail('请输入手机号');
                return
            }
            if (!PhoneUtil.isPhoneNum(userPhone)) {
                Toast.fail('请输入正确的手机号');
                return
            }
            if (fromPage == 0) {
                //注册
                this._getRegisterVerificationCode()
            } else {
                //忘记密码
                this._userResetYzm()
            }

        }
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
        HttpUtil.fetchRequest(service, "POST", params)
            .then(json => {
                if (json.code === "000000") {
                    Toast.success('获取验证码成功');
                    this.setState({
                        buttonDisabled: true
                    });
                } else {
                    Toast.fail(json.msg)
                }
            })
            .catch(err => {
            })
    };


    _userNextStep = () => {
        const {navigation} = this.props;
        const {userPhone, imgCode} = this.state;
        let fromPage = this.fromPage;
        if (BeeUtil.isEmpty(userPhone)) {
            Toast.fail('请输入手机号');
            return
        }
        if (!PhoneUtil.isPhoneNum(userPhone)) {
            Toast.fail('请输入正确的手机号');
            return
        }
        if (BeeUtil.isEmpty(imgCode)) {
            Toast.fail('请输入图形验证码');
            return
        }
        if (fromPage === 0) {
            navigation.navigate('SetPwdPage', {
                titleName: '设置密码',
                userCode: this.state.userPhone,
                verifyCode: this.state.verifyCode,
                fromPage: fromPage,
            })
        } else {
            navigation.navigate('SetPwdPage', {
                titleName: '输入新密码',
                userCode: this.state.userPhone,
                verifyCode: this.state.verifyCode,
                fromPage: fromPage,
            })
        }
    };

    // 重置获取验证码(忘记密码)
    _userResetYzm = () => {
        let service = '/member/reset_verification_code';
        let params = {
            userCode: this.state.userPhone,
        };
        HttpUtil.fetchRequest(service, 'POST', params)
            .then(json => {
                if (json.code === "000000") {
                    Toast.success('获取验证码成功');
                    if (json.data) {
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
                } else {
                    Toast.fail(json.msg)
                }
            })
            .catch(err => {
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
        HttpUtil.fetchRequest(service, "POST", params)
            .then(json => {
                if (json.code === "000000") {
                    Toast.success('获取验证码成功');
                    this.setState({
                        buttonDisabled: true
                    });
                } else {
                    Toast.fail(json.msg)
                }
            })
            .catch(err => {
            })
    };

    render() {
        const {navigation} = this.props;
        this.fromPage = navigation.getParam('fromPage');
        //图形验证码
        let imgCodeComponent = this.state.imgCodeVisible ?
            <View style={styles.imgCodeView}>
                <View style={{flexDirection:commonStyle.row,alignItems:commonStyle.center,flex:1}}>
                    <Image source={{uri: 'https://www.baidu.com/img/bd_logo1.png'}}
                           style={{width: 20, height: 20}}
                    />
                    <Input
                        style={styles.inputView}
                        size="lg"
                        placeholder="请输入图形验证码"
                        value={this.state.imgCode}
                        onChangeText={text => this.setState({imgCode: text})}
                    />
                </View>
                <TouchableOpacity
                    onPress={() => {
                        this._getVerifyCode()
                    }}>
                    <Image
                        source={{uri: this.state.netImg}}
                        resizeMode="stretch"
                        style={{width: 90, height: 50}}
                    />
                </TouchableOpacity>
            </View> : <View/>;
        let inputPhoneNum = (
            <View style={{flexDirection:commonStyle.row,alignItems:commonStyle.center}}>
                <Image source={{uri: 'https://www.baidu.com/img/bd_logo1.png'}}
                       style={{width: 20, height: 20}}
                />
                <Input
                    style={styles.inputView}
                    size="lg"
                    placeholder="请输入手机号"
                    value={this.state.userPhone}
                    onChangeText={text => this.setState({userPhone: text})}
                />
            </View>
        )

        let getCodeComponent = (
            <View style={styles.imgCodeView}>
                <View style={{flexDirection:commonStyle.row,alignItems:commonStyle.center,flex:1}}>
                    <Image source={{uri: 'https://www.baidu.com/img/bd_logo1.png'}}
                           style={{width: 20, height: 20}}
                    />
                    <Input
                        style={styles.inputView}
                        size="lg"
                        placeholder="请输入验证码"
                        value={this.state.verifyCode}
                        onChangeText={text => this.setState({verifyCode: text})}
                    />
                </View>
                {/*timerActiveTitle={['请在（','s）后重试']}*/}
                {/*textStyle={{color: 'blue'}}*/}
                {/*const requestSucc = Math.random() + 0.5 > 1;*/}
                <CountDownButton
                    style={{width: 110, height: 40,marginLeft:commonStyle.marginLeft}}
                    timerCount={10}
                    timerTitle={'获取验证码'}
                    enable={12 > 10}
                    onClick={(shouldStartCounting) => {
                            //随机模拟发送验证码成功或失败
                            shouldStartCounting(this.state.buttonDisabled);
                            // shouldStartCounting(true);
                            this._userRequest()
                        }}
                    timerEnd={() => {
                            this.setState({
                                state: '倒计时结束'
                            })
                        }}/>
            </View>
        )

        let bottomComponent = this.fromPage == 0 ?
            <View style={{flexDirection: commonStyle.row}}>
                <Text>注册即视为同意并阅读</Text>
                <Text style={{color: '#59a3ff'}}>《服务条款》</Text>
            </View> :
            <View style={{flexDirection: commonStyle.row}}>
                <Text>没有收到验证码点击按钮</Text>
                <Text style={{color: '#59a3ff'}}>重新获取</Text>
            </View>;

        return (
            <View style={styles.container}>
                <View
                    style={{backgroundColor:commonStyle.red,marginTop:commonStyle.marginTop,marginBottom:commonStyle.marginBottom}}>
                    {inputPhoneNum}
                    {imgCodeComponent}
                    {getCodeComponent}
                </View>
                {bottomComponent}
                <Button title="下一步"
                        size='lg'
                        type='primary'
                        style={{marginTop:commonStyle.marginTop}}
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
        backgroundColor: commonStyle.white,
        paddingLeft: 10,
        paddingRight: 10,
    },
    imgCodeView: {
        flexDirection: commonStyle.row,
        marginRight: 10,
    },
    inputView: {
        flex: 1,
        borderColor: commonStyle.white
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