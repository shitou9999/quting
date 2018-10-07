/**
 * Created by cyh on 2018/7/12.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, StatusBar, View, TouchableOpacity, Image, ImageBackground} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {NavigationActions, StackActions} from 'react-navigation'
import Input from 'teaset/components/Input/Input'
import Button from 'teaset/components/Button/Button'
import Toast from 'teaset/components/Toast/Toast'
import Label from 'teaset/components/Label/Label'
import SplashScreen from 'react-native-splash-screen'
import BaseContainer from "../../components/BaseContainer"
import * as loginAction from '../../actions/login'
import CountDownButton from '../../components/CountDownButton'
import * as HttpUtil from '../../net/HttpUtils'
import SHA1Util from '../../utils/SHA1Util'
import TokenSha1 from '../../utils/TokenSha1Util'
import BeeUtil from '../../utils/BeeUtil'
import * as PhoneUtil from '../../utils/PhoneUtil'
import {commonStyle} from '../../constants/commonStyle'


const resetAction = StackActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({routeName: 'HomePage'}),
    ],
})

// this.props.navigation.dispatch(resetAction)
class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.newUuid = ''
        this.state = {
            netImg: 'https://www.baidu.com/img/bd_logo1.png',
            userPhone: '',
            passWord: '',
            imgCode: '',
            verifyCode: '',
            imgCodeVisible: false,//图形验证码默认不显示
            buttonDisabled: false,
            isGetImgCodeSucc: false,
            isShowPwdLogin: true,
        }
    }

    componentDidMount() {
        // do anything while splash screen keeps, use await to wait for an async task.
        SplashScreen.hide()
        this.props.getMemberDictionary()
        // this.props.getDcLotDictionary()
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.login.loginYes) {
            Toast.message('登录成功')
            nextProps.navigation.navigate('AppStackNavigator')
        }
        return null
    }


    /**
     * 用户登录
     * @private
     */
    _login = () => {
        const {userPhone, passWord, verifyCode, isShowPwdLogin} = this.state
        if (BeeUtil.isEmpty(userPhone)) {
            Toast.message('请输入手机号')
            return
        }
        if (!PhoneUtil.isPhoneNum(userPhone)) {
            Toast.message('请输入正确的手机号')
            return
        }
        if (isShowPwdLogin) {
            if (BeeUtil.isEmpty(passWord)) {
                Toast.message('请输入密码')
                return
            }
            //密码登录
            this.props.loginAction.userLogin(userPhone, passWord, 1)
                .then((response) => {
                    console.log('0000000000')
                    console.log(response)
                    console.log('111111111')
                })
                .catch(err => {
                    console.log('2222222')
                    console.log(err)
                    console.log('3333333')
                })
        } else {
            //验证码登录
            if (BeeUtil.isEmpty(verifyCode)) {
                Toast.message('请输入验证码')
                return
            }
            this.props.loginAction.userLogin(userPhone, verifyCode, 0)
        }
    }


    /**
     * 获取验证码
     * @private
     */
    _userRequest = () => {
        const {userPhone, imgCodeVisible, imgCode} = this.state
        if (imgCodeVisible) {
            //附带图形验证码请求验证码
            if (BeeUtil.isEmpty(userPhone)) {
                Toast.message('请输入手机号')
                return
            }
            if (!PhoneUtil.isPhoneNum(userPhone)) {
                Toast.message('请输入正确的手机号')
                return
            }
            if (BeeUtil.isEmpty(imgCode)) {
                Toast.message('请输入图形验证码')
                return
            }
            this._userAgainLoginVerificationCode()
        } else {
            //单独手机号获取验证码
            if (BeeUtil.isEmpty(userPhone)) {
                Toast.message('请输入手机号')
                return
            }
            if (!PhoneUtil.isPhoneNum(userPhone)) {
                Toast.message('请输入正确的手机号')
                return
            }
            this._userLoginVerificationCode()
        }
    }

    /**
     * 登录获取验证码(验证码登录)
     * @private
     */
    _userLoginVerificationCode = () => {
        this.props.loginAction.userLoginVerificationCode(this.state.userPhone)
            .then(response => {
                if (response.result) {
                    Toast.message('获取验证码成功')
                    let isShowImgCode = response.data
                    if (isShowImgCode) {
                        //获取图形验证码
                        this._getVerifyCode()
                    } else {
                        //不显示图形验证码,倒计时开始
                        this.setState({
                            buttonDisabled: true
                        })
                    }
                }
            })
    }

    /**
     * 登录获取验证码含图形验证码
     * @private
     */
    _userAgainLoginVerificationCode = () => {
        let sha1_result = SHA1Util.hex_sha1(this.newUuid)
        let params = {
            userCode: this.state.userPhone,
            sessionId: sha1_result,
            verifyCode: this.state.imgCode,
        }
        this.props.loginAction.userAgainLoginVerificationCode(params)
            .then(response => {
                if (response.result) {
                    this.setState({
                        buttonDisabled: true
                    })
                }
            })
    }

    /**
     * 获取图形验证码
     * @private
     */
    _getVerifyCode = () => {
        let service = '/member/verify_code'
        let uuid = TokenSha1.createUid()
        uuid = uuid.replace(/-/g, "")
        this.newUuid = uuid;
        let sha1_result = SHA1Util.hex_sha1(uuid)
        let params = {
            sessionId: sha1_result,
            random: uuid,
        };
        HttpUtil.postJsonImgCode(service, params, (result) => {
            this.setState({
                netImg: result,
                imgCodeVisible: true,//图形验证码控件
                buttonDisabled: true,//倒计时开始
            })
        })
    }


    render() {
        const {navigation, login} = this.props
        /**密码登录、验证码登录*/
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
        let bottomText = this.state.isShowPwdLogin ? '验证码登录' : '普通登录'

        return (
            <BaseContainer isHiddenNavBar={true} store={login}>
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
                            backgroundColor: commonStyle.clear, marginTop: 30, borderColor: commonStyle.borderColor,
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
                                   let isShow = this.state.isShowPwdLogin
                                   this.setState({
                                       isShowPwdLogin: !isShow,
                                       imgCodeVisible: false,
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
            </BaseContainer>
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

//组件输入
const mapState = state => ({
    nav: state.nav,
    login: state.login,
});

//组件输出
const dispatchAction = dispatch => ({
    getMemberDictionary: () => dispatch(loginAction.getMemberDictionary()),
    getDcLotDictionary: () => dispatch(loginAction.getDcLotDictionary()),
    // userLogin: (userPhone, pwd, loginType) => dispatch(loginAction.userLogin(userPhone, pwd, loginType)),
    // userLoginVerificationCode: (userCode) => dispatch(loginAction.userLoginVerificationCode(userCode)),
    // userAgainLoginVerificationCode: (params) => dispatch(loginAction.userAgainLoginVerificationCode(params)),
    loginAction: bindActionCreators(loginAction, dispatch)
});

//connect方法将UI组件同store连接起来
export default connect(mapState, dispatchAction)(LoginPage)
