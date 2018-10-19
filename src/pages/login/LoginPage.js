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
    ImageBackground,
    BackHandler,
    PermissionsAndroid
} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {NavigationActions, StackActions} from 'react-navigation'
import {Input, ListRow, Button, Overlay, Label, Toast} from "../../components/teaset/index"
import SplashScreen from 'react-native-splash-screen'
import {BaseContainer, Divide} from "../../components/base/index"
import {loginAction} from '../../actions/index'
import {CountDownButton} from '../../components/index'
import {SHA1Util, TokenSha1, BeeUtil, PhoneUtil, checkPermission} from '../../utils/index'
import {commonStyle} from '../../constants/commonStyle'
import {Constants} from '../../constants/index'
import {PushUtil} from "../../native/index"
import {images} from "../../assets"

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
            buttonDisabled: true,//获取验证码是否点
            isGetImgCodeSucc: false,
            isShowPwdLogin: true,
        }
    }

    componentDidMount() {
        // do anything while splash screen keeps, use await to wait for an async task.
        SplashScreen.hide()
        this.props.getMemberDictionary()
        this.props.getDcRoadDictionary()
        // this.props.getDcLotDictionary()
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
        checkPermission('receiveSms').then(result => {
            console.log('权限----->' + result)
        })
    }

    componentWillUnmount() {
        this.backHandler && this.backHandler.remove()
    }

    onBackAndroid = () => {
        let {navigation} = this.props
        let isFocused = navigation.isFocused()
        if (isFocused) {
            if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
                //最近2秒内按过back键，可以退出应用。
                BackHandler.exitApp()
                return false
            }
            this.lastBackPressed = Date.now()
            Toast.message('再按一次退出应用')
            return true
        } else {
            navigation.pop()
            return true
        }
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
                    if (!response.result) {
                        Toast.message(response.msg)
                    } else {
                        this._toBindPushAlias(response.data)
                    }
                })
        } else {
            //验证码登录
            if (BeeUtil.isEmpty(verifyCode)) {
                Toast.message('请输入验证码')
                return
            }
            this.props.loginAction.userLogin(userPhone, verifyCode, 0)
                .then((response) => {
                    if (!response.result) {
                        Toast.message(response.msg)
                    } else {
                        this._toBindPushAlias(response.data)
                    }
                })
        }
    }

    _toBindPushAlias = data => {
        PushUtil.addAlias(String(data.id), Constants.PUSH_ALIAS_TYPE, code => {
            console.log('push绑定-------->')
        })
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
                } else {
                    Toast.message(response.msg)
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
                } else {
                    Toast.message(response.msg)
                }
            })
    }

    /**
     * 获取图形验证码
     * @private
     */
    _getVerifyCode = () => {
        let uuid = TokenSha1.createUid()
        uuid = uuid.replace(/-/g, "")
        this.newUuid = uuid
        let sha1_result = SHA1Util.hex_sha1(uuid)
        this.props.loginAction.getImageCode(sha1_result, uuid)
            .then(result => {
                    this.setState({
                        netImg: result,
                        imgCodeVisible: true,//图形验证码控件
                        buttonDisabled: true,//获取验证码是否点
                    })
                }
            )
    }


    render() {
        const {navigation, login} = this.props
        /**密码登录、验证码登录*/
        let isShowPwdLogin = this.state.isShowPwdLogin ?
            <View style={{flexDirection: commonStyle.row, alignItems: commonStyle.center}}>
                {/*<EvilIcons name={'lock'} size={30} color={commonStyle.white}/>*/}
                <Image source={images.login_pwd}
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
                    <Image source={images.login_yzm}
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
                    disableColor={commonStyle.white}
                    onClick={(shouldStartCounting) => {
                        //点击后触发，同时将按钮置为不可用，配合shouldStartCountting 使用
                        //决定是否开始倒计时的回调函数，参数类型Bool,
                        // true开始倒计，但按钮仍不可点击，直到倒计时结束 false按钮恢复可点击状态，但不会开始倒计时
                        shouldStartCounting(this.state.buttonDisabled)
                        this._userRequest()
                    }}
                    timerEnd={() => {
                        //倒计时结束的回调函数
                        // this.setState({
                        //     buttonDisabled: false
                        // })
                    }}/>
            </View>;
        let imgCodeComponent = this.state.imgCodeVisible ?
            <View>
                <View style={styles.imgCodeView}>
                    <View style={{flexDirection: commonStyle.row, alignItems: commonStyle.center, flex: 1}}>
                        <Image source={images.login_yzm}
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
                            style={{width: 90, height: 40}}
                        />
                    </TouchableOpacity>
                </View>
                <Divide orientation={'horizontal'} color={commonStyle.borderColor} width={commonStyle.lineHeight}/>
            </View> : <View/>;

        let inputPhoneNum = (
            <View>
                <View style={{flexDirection: commonStyle.row, alignItems: commonStyle.center}}>
                    <Image source={images.login_phone}
                           resizeMode='contain'
                           style={{width: 20, height: 20}}
                    />
                    {/*<FontAwesome name={'mobile-phone'} size={30} color={commonStyle.white}/>*/}
                    <Input
                        style={styles.inputView}
                        size="lg"
                        maxLength={12}
                        placeholder="请输入手机号"
                        value={this.state.userPhone}
                        onChangeText={text => this.setState({userPhone: text})}
                    />
                </View>
                <Divide orientation={'horizontal'} color={commonStyle.borderColor} width={commonStyle.lineHeight}/>
            </View>
        )
        let bottomText = this.state.isShowPwdLogin ? '验证码登录' : '普通登录'

        return (
            <BaseContainer isHiddenNavBar={true} store={login}>
                <ImageBackground
                    style={{flex: 1, backgroundColor: "rgba(254,200,46,0)"}}
                    source={images.login_bg}
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
                            <Label size='lg' type='title' text='智慧停车'
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
        alignItems: commonStyle.center
    },
    inputView: {
        flex: 1,
        backgroundColor: commonStyle.clear,
        borderColor: commonStyle.clear,
        color: commonStyle.white
    }

})


//组件输入
const mapState = state => ({
    nav: state.nav,
    login: state.login,
})

//组件输出
const dispatchAction = dispatch => ({
    getMemberDictionary: () => dispatch(loginAction.getMemberDictionary()),
    getDcLotDictionary: () => dispatch(loginAction.getDcLotDictionary()),
    getDcRoadDictionary: () => dispatch(loginAction.getDcRoadDictionary()),
    loginAction: bindActionCreators(loginAction, dispatch)
})

//connect方法将UI组件同store连接起来
export default connect(mapState, dispatchAction)(LoginPage)
