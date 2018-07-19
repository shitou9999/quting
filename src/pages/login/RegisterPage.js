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
import CountDownButton from '../../components/CountDownButton';
import * as loginAction from '../../actions/login';

import NetUtil from '../../net/NetUtils';
import SHA1Util from '../../utils/SHA1Util';
import BeeUtil from '../../utils/BeeUtil';
import * as PhoneUtil from '../../utils/PhoneUtil';


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
            if(fromPage === 0){
                this._getAgainRegisterVerificationCode()
            }else{
                this._userResetYzm()
            }
        } else {
            if (BeeUtil.isEmpty(userPhone)) {
                Toast.fail('请输入手机号');
                return
            }
            if (!PhoneUtil.isPhoneNum(userPhone)) {
                Toast.fail('请输入正确的手机号');
                return
            }
            if(fromPage == 0){
                this._getRegisterVerificationCode()
            }else{
                this._getResetRegisterVerificationCode()
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
        NetUtil.postJsonCallBack(service, params, (result) => {
            Toast.success('获取验证码成功' + result);
            this.setState({
                buttonDisabled: true
            });
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
        const {navigation} = this.props;
        this.fromPage = navigation.getParam('fromPage');
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
        let bottomComponent = this.fromPage == 0 ?
            <View style={{flexDirection:'row',marginLeft:10}}>
                <Text>注册即视为同意并阅读</Text>
                <Text style={{color:'#59a3ff'}}>《服务条款》</Text>
            </View> :
            <View style={{flexDirection:'row',marginLeft:10}}>
                <Text>没有收到验证码点击按钮</Text>
                <Text style={{color:'#59a3ff'}}>重新获取</Text>
            </View>;

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
                    {/*timerActiveTitle={['请在（','s）后重试']}*/}
                    {/*textStyle={{color: 'blue'}}*/}
                    {/*const requestSucc = Math.random() + 0.5 > 1;*/}
                    <CountDownButton
                        style={{width: 110,height:40,marginRight: 10}}
                        timerCount={10}
                        timerTitle={'获取验证码'}
                        enable={12 > 10}
                        onClick={(shouldStartCounting)=>{
		                //随机模拟发送验证码成功或失败
                        shouldStartCounting(this.state.buttonDisabled);
                            this._userRequest()
	                    }}
                        timerEnd={()=>{
                        this.setState({
                            state: '倒计时结束'
                        })
	                }}/>
                </View>
                {bottomComponent}
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

// {/*<Button*/}
// {/*style={{width: 90, height: 40,borderColor: this.state.buttonDisabled?'#ff5f5a':'#59a3ff'}}*/}
// {/*title="获取验证码"*/}
// {/*titleStyle={{fontSize:14,color:this.state.buttonDisabled?'#ff5f5a':'#59a3ff'}}*/}
// {/*size='sm'*/}
// {/*disabled={this.state.buttonDisabled}*/}
// {/*onPress={()=>{*/}
// {/*this._userRequest()*/}
// {/*}}/>*/}

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