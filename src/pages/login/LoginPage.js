/**
 * Created by cyh on 2018/7/12.
 */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    StatusBar,
    View,
    TouchableOpacity,
    Image,
    ImageBackground
} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import Input from 'teaset/components/Input/Input'
import Button from 'teaset/components/Button/Button'
import Toast from 'teaset/components/Toast/Toast'
import ModalIndicator from 'teaset/components/ModalIndicator/ModalIndicator'
import LoadingModal from '../../components/LoadingModal'
import Label from 'teaset/components/Label/Label'
import SplashScreen from 'react-native-splash-screen'
import Divide from '../../components/Divide'

import * as loginAction from '../../actions/login'
import CountDownButton from '../../components/CountDownButton'
import * as HttpUtil from '../../net/HttpUtils'
import SHA1Util from '../../utils/SHA1Util'
import BeeUtil from '../../utils/BeeUtil'
import * as PhoneUtil from '../../utils/PhoneUtil'
import {storage} from '../../utils/storage'
import {commonStyle} from '../../constants/commonStyle'

class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.newUuid = '';
        this.state = {
            netImg: 'https://www.baidu.com/img/bd_logo1.png',
            userPhone: '',
            passWord: '',
            imgCode: '',
            verifyCode: '',
            imgCodeVisible: false,
            buttonDisabled: false,
            isGetImgCodeSucc: false,
            isShowPwdLogin: true,
        }
    }

    async componentDidMount() {
        // do anything while splash screen keeps, use await to wait for an async task.
        SplashScreen.hide();
        this._getAppDictionary()
        this._getDclotDictionary()
    }

    _getAppDictionary = () => {
        let service = '/dictionary/member'
        HttpUtil.fetchRequest(service, 'GET')
            .then(json => {
                if (json.code === '000000') {
                    // let mapVo = new Map()
                    for (let index in json.data) {
                        let lookupName = json.data[index].lookupName;
                        let lookupKey = json.data[index].lookupKey;
                        let lookupValue = json.data[index].lookupValue;
                        let temp = {
                            key: lookupKey,
                            value: lookupValue
                        }
                        if (lookupName.includes('_')) {
                            let newName = lookupName.replace(/_/g, '+')
                            console.log(newName)
                            gStorage.storage.save(newName, lookupKey, temp)
                        } else {
                            gStorage.storage.save(lookupName, lookupKey, temp)
                        }
                    }
                } else {
                    Toast.message('获取数据字典异常')
                }
            }).catch()
    }

    _getDclotDictionary = () => {
        let service = '/dictionary/dclot'
        HttpUtil.fetchRequest(service, 'GET')
            .then(json => {
                if (json.code === '000000') {
                    // let mapVo = new Map()
                    for (let index in json.data) {
                        let lookupName = json.data[index].lookupName;
                        let lookupKey = json.data[index].lookupKey;
                        let lookupValue = json.data[index].lookupValue;
                        let temp = {
                            key: lookupKey,
                            value: lookupValue
                        }
                        if (lookupName.includes('_')) {
                            let newName = lookupName.replace(/_/g, '+')
                            console.log(newName)
                            gStorage.storage.save(newName, lookupKey, temp)
                        } else {
                            gStorage.storage.save(lookupName, lookupKey, temp)
                        }
                    }
                } else {
                    Toast.message('获取数据字典异常')
                }
            }).catch()
    }

    //已加载组件收到新的props之前调用,注意组件初始化渲染时则不会执行
    componentWillReceiveProps(nextProps) {
        const {login} = this.props;
        if (login.isLoginSucc) {
            Toast.message('登录成功');
            const {navigation} = this.props;
            navigation.navigate('RootStackNavigator')
        } else {
            Toast.message('登录失败')
        }
    }

//     if (!this.params.passWord || this.params.passWord.length === 0) {
//     Toast(I18n('LoginPWTip'));
//     return
// }
    /**
     * 用户登录
     * @private
     */
    _login = () => {
        // ModalIndicator.show('登录中...');
        const {userPhone, passWord, verifyCode, isShowPwdLogin} = this.state;
        if (BeeUtil.isEmpty(userPhone)) {
            Toast.message('请输入手机号');
            return
        }
        if (!PhoneUtil.isPhoneNum(userPhone)) {
            Toast.message('请输入正确的手机号');
            return
        }
        if (isShowPwdLogin) {
            if (BeeUtil.isEmpty(passWord)) {
                Toast.message('请输入密码');
                return
            }
            this.props.userLogin(userPhone, passWord, 1);
        } else {
            //验证码登录
            if (BeeUtil.isEmpty(verifyCode)) {
                Toast.message('请输入验证码');
                return
            }
            this.props.userLogin(userPhone, verifyCode, 0);
        }
    };

    componentWillMount() {
        this._getAppDictionary()
    }

    _getAppDictionary = () => {

        let mapVo = new Map()
        console.log(mapVo.size)
        mapVo.set('PROBLEM+TYPE', [])
        mapVo.set('PROBLEM+TYPE2', [])
        let vo = {
            "lookupName": "PROBLEM_TYPE",
            "lookupKey": "2",
            "lookupValue": "关于充值"
        };
        let vo2 = {
            "lookupName": "PROBLEM_TYPE",
            "lookupKey": "3",
            "lookupValue": "关于停车"
        }
        mapVo.get('PROBLEM+TYPE').push(vo)
        mapVo.get('PROBLEM+TYPE').push(vo2)
        mapVo.get('PROBLEM+TYPE2').push(vo2)
        // console.log(mapVo.size)
        // for (var [key, value] of mapVo) {
        //     console.log(key + ' = ' + value);
        // }
        // mapVo.forEach(function (value, key, map) {
        //     console.log(key)
        //     console.log(value)
        //     storage.save(key, value)
        // })
    }


    _test = () => {
        // storage.load("PROBLEM+TYPE", (results) => {
        //     console.log(results)//(2) [{…}, {…}]
        //     results.forEach(result => {
        //         console.log(result.lookupValue);
        //     })
        // })
        // storage.save('HHH', 888, '123456789')
        // storage.save('sss', 888, 'ssssssssss')
        // storage.loadId("HHH", 888, results => {
        //     console.log(results)
        // })
        // storage.load('PREF_ID', (id) => {
        //     console.log(id)
        // });
        // storage.loadId("sss", 888, results => {
        //     console.log(results)
        // })
    }


    /**
     * 获取验证码
     * @private
     */
    _userRequest = () => {
        const {userPhone, imgCodeVisible, imgCode} = this.state;
        if (imgCodeVisible) {
            //附带图形验证码请求验证码
            if (BeeUtil.isEmpty(userPhone)) {
                Toast.message('请输入手机号');
                return
            }
            if (!PhoneUtil.isPhoneNum(userPhone)) {
                Toast.message('请输入正确的手机号');
                return
            }
            if (BeeUtil.isEmpty(imgCode)) {
                Toast.message('请输入图形验证码');
                return
            }
            this._userAgainLoginVerificationCode()
        } else {
            //单独手机号获取验证码
            if (BeeUtil.isEmpty(userPhone)) {
                Toast.message('请输入手机号');
                return
            }
            if (!PhoneUtil.isPhoneNum(userPhone)) {
                Toast.message('请输入正确的手机号');
                return
            }
            this._userLoginVerificationCode()
        }
    };

    /**
     * 登录获取验证码(验证码登录)
     * @param userPhone
     * @private
     */
    _userLoginVerificationCode = () => {
        let service = '/member/login_verification_code';
        let params = {
            userCode: this.state.userPhone,
        };
        HttpUtil.fetchRequest(service, 'POST', params)
            .then(json => {
                if (json.code === "000000") {
                    Toast.message('获取验证码成功');
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
                    Toast.message(json.msg)
                }
            })
            .catch(err => {
            })
    };

    /**
     * 登录获取验证码含图形验证码
     * @private
     */
    _userAgainLoginVerificationCode = () => {
        let service = '/member/login_verification_code';
        let sha1_result = SHA1Util.hex_sha1(this.newUuid);
        let params = {
            userCode: this.state.userPhone,
            sessionId: sha1_result,
            verifyCode: this.state.imgCode,
        };
        HttpUtil.fetchRequest(service, "POST", params)
            .then(json => {
                if (json.code === "000000") {
                    Toast.message('获取验证码成功');
                    this.setState({
                        buttonDisabled: true
                    });
                } else {
                    Toast.message(json.msg)
                }
            })
            .catch(err => {
            })
    };

    /**
     * 获取图形验证码
     * @private
     */
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


    render() {
        const {navigation, login} = this.props;
        let isShowPwdLogin = this.state.isShowPwdLogin ?
            <View style={{flexDirection: commonStyle.row, alignItems: commonStyle.center}}>
                <Image source={require('../../assets/images/login_pwd.png')}
                       resizeMode='contain'
                       style={{width: 20, height: 20}}
                />
                <Input
                    style={styles.inputView}
                    secureTextEntry
                    size="lg"
                    placeholder="请输入密码"
                    value={this.state.passWord}
                    onChangeText={text => this.setState({passWord: text})}
                />
            </View>
            :
            <View style={styles.imgCodeView}>
                <View style={{flexDirection: commonStyle.row, alignItems: commonStyle.center, flex: 1}}>
                    <Image source={require('../../assets/images/login_yzm.png')}
                           resizeMode='contain'
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
                <CountDownButton
                    style={{width: 110, height: 40, marginLeft: commonStyle.marginLeft}}
                    timerCount={10}
                    timerTitle={'获取验证码'}
                    enable={12 > 10}
                    onClick={(shouldStartCounting) => {
                        shouldStartCounting(this.state.buttonDisabled);
                        this._userRequest()
                    }}
                    timerEnd={() => {
                        this.setState({
                            state: '倒计时结束'
                        })
                    }}/>
            </View>;
        let imgCodeComponent = this.state.imgCodeVisible ?
            <View style={styles.imgCodeView}>
                <View style={{flexDirection: commonStyle.row, alignItems: commonStyle.center, flex: 1}}>
                    <Image source={require('../../assets/images/login_yzm.png')}
                           resizeMode='contain'
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
            <View style={{flexDirection: commonStyle.row, alignItems: commonStyle.center}}>
                <Image source={require('../../assets/images/login_phone.png')}
                       resizeMode='contain'
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
        let bottomText = this.state.isShowPwdLogin ? '验证码登录' : '普通登录';

        return (
            <ImageBackground
                style={{flex: 1, backgroundColor: "rgba(254,200,46,0)"}}
                source={require('../../assets/images/login_bg.png')}
            >
                <View style={styles.container}>
                    <StatusBar
                        backgroundColor='transparent'
                        translucent={true}
                    />
                    <View
                        style={{
                            alignItems: commonStyle.center,
                            justifyContent: commonStyle.center,
                            marginTop: 40,
                            marginBottom: commonStyle.marginBottom
                        }}>
                        <Image source={{uri: 'https://www.baidu.com/img/bd_logo1.png'}}
                               style={{width: 70, height: 70}}
                        />
                        <Label size='lg' type='title' text='下沙停车'
                               style={{color: commonStyle.white, marginTop: commonStyle.marginTop}}/>
                    </View>
                    <View style={{
                        backgroundColor: commonStyle.clear, marginTop: 50, borderColor: commonStyle.borderColor,
                        borderRadius: 5, borderWidth: 1, paddingLeft: 10
                    }}>
                        {inputPhoneNum}
                        {imgCodeComponent}
                        {isShowPwdLogin}
                    </View>
                    <Button title="登 录"
                            size='lg'
                            type='primary'
                            style={{marginTop: commonStyle.marginTop, marginBottom: commonStyle.marginBottom}}
                            onPress={() => {
                                this._login()
                                // navigation.navigate('RootStackNavigator')
                            }}/>
                    <View style={{flexDirection: commonStyle.row, justifyContent: commonStyle.between}}>
                        <Label type='title'
                               size='md'
                               text='注册'
                               style={{color: commonStyle.white}}
                               onPress={() => {
                                   navigation.navigate('RegisterPage', {fromPage: 0, titleName: '注册'})
                               }}/>
                        <Label type='title'
                               size='md'
                               text='忘记密码'
                               style={{color: commonStyle.white}}
                               onPress={() => {
                                   navigation.navigate('RegisterPage', {fromPage: 1, titleName: '忘记密码'})
                               }}/>
                    </View>
                </View>

                <View style={{
                    flexDirection: commonStyle.row,
                    marginBottom: 20,
                    height: 10,
                    alignItems: commonStyle.center,
                    justifyContent: commonStyle.around
                }}>
                    <View style={{
                        height: 1,
                        width: 130,
                        backgroundColor: commonStyle.white,
                        marginRight: commonStyle.marginRight
                    }}/>
                    <Label type='title'
                           size='md'
                           text={bottomText}
                           style={{color: commonStyle.white}}
                           onPress={() => {
                               let isShow = this.state.isShowPwdLogin;
                               this.setState({
                                   isShowPwdLogin: !isShow,
                               })
                           }}/>
                    <View style={{
                        height: 1,
                        width: 130,
                        backgroundColor: commonStyle.white,
                        marginLeft: commonStyle.marginLeft
                    }}/>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
    },
    imgCodeView: {
        flexDirection: commonStyle.row,
        marginRight: 10,
    },
    inputView: {
        flex: 1,
        backgroundColor: commonStyle.clear,
        borderColor: commonStyle.clear,
        color: commonStyle.white
    }

});


const mapState = (state) => ({
    nav: state.nav,
    login: state.login,
});

const dispatchAction = (dispatch) => ({
    userLogin: (userPhone, pwd, loginType) => dispatch(loginAction.userLogin(userPhone, pwd, loginType)),
    userLoginVerificationCode: (user, pwd) => dispatch(loginAction.userLoginVerificationCode(user, pwd, pwd)),
    // login: (user, pwd) => dispatch(userActions.login(user, pwd))
    // loginAction: bindActionCreators(loginActions, dispatch)
});

export default connect(mapState, dispatchAction)(LoginPage);