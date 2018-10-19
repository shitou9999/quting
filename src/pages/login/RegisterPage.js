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
import {bindActionCreators} from "redux";
import {Input, ListRow, Button, Overlay, Label, Toast} from "../../components/teaset/index"
import {CountDownButton} from '../../components/index'
import {BaseContainer, Divide, Divider} from "../../components/base/index"
import {loginAction} from '../../actions/index'
import {TokenSha1, SHA1Util, BeeUtil, PhoneUtil} from '../../utils/index'
import {commonStyle} from '../../constants/commonStyle'
import {images} from "../../assets"

class RegisterPage extends Component {

    constructor(props) {
        super(props);
        this.fromPage = 0
        this.newUuid = ''
        this.state = {
            netImg: 'https://www.baidu.com/img/bd_logo1.png',
            userPhone: '',
            imgCode: '',
            verifyCode: '',
            imgCodeVisible: false,//图形验证码是否显示
            buttonDisabled: true,
            isGetImgCodeSucc: false,
        }
    }

    componentDidMount() {
        this.fromPage = this.props.navigation.getParam('fromPage')
    }

    //获取图形验证码
    _getVerifyCode = () => {
        let uuid = TokenSha1.createUid()
        uuid = uuid.replace(/-/g, "")
        this.newUuid = uuid;
        let sha1_result = SHA1Util.hex_sha1(uuid)
        this.props.loginAction.getImageCode(sha1_result, uuid)
            .then(result => {
                    this.setState({
                        netImg: result,
                        imgCodeVisible: true,//图形验证码控件
                        buttonDisabled: true,//倒计时开始
                    })
                }
            )
    }

    //注册获取验证码
    _getRegisterVerificationCode = () => {
        this.props.loginAction.getRegisterVerificationCode(this.state.userPhone)
            .then(response => {
                if (response.result) {
                    Toast.message('获取验证码成功')
                    let isShowImgCode = response.data
                    //是否需要图形码验证
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
     * 获取验证码(注册or忘记密码)
     * @private
     */
    _userRequest = () => {
        const {imgCodeVisible, userPhone, imgCode} = this.state
        let fromPage = this.fromPage
        if (imgCodeVisible) {
            //图形验证码显示
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
            if (fromPage === 0) {
                //注册
                this._getAgainRegisterVerificationCode()
            } else if (fromPage === 1) {
                //忘记密码
                this._getResetRegisterVerificationCode()
            }
        } else {
            //图形验证码隐藏中
            if (BeeUtil.isEmpty(userPhone)) {
                Toast.message('请输入手机号')
                return
            }
            if (!PhoneUtil.isPhoneNum(userPhone)) {
                Toast.message('请输入正确的手机号')
                return
            }
            if (fromPage === 0) {
                //注册
                this._getRegisterVerificationCode()
            } else if (fromPage === 1) {
                //忘记密码
                this._userResetYzm()
            }

        }
    };

    //注册附带图形验证码请求验证码
    _getAgainRegisterVerificationCode = () => {
        let sha1_result = SHA1Util.hex_sha1(this.newUuid)
        this.props.loginAction.toAgainRegisterVerificationCode(this.state.userPhone, sha1_result, this.state.imgCode)
    }


    _userNextStep = () => {
        const {userPhone, imgCode, imgCodeVisible, verifyCode} = this.state
        let fromPage = this.fromPage
        if (BeeUtil.isEmpty(userPhone)) {
            Toast.message('请输入手机号')
            return
        }
        if (!PhoneUtil.isPhoneNum(userPhone)) {
            Toast.message('请输入正确的手机号')
            return
        }
        if (imgCodeVisible) {
            if (BeeUtil.isEmpty(imgCode)) {
                Toast.message('请输入图形验证码')
                return
            }
        }
        if (BeeUtil.isEmpty(verifyCode)) {
            Toast.message('请输入验证码')
            return
        }
        if (fromPage === 0) {
            this.props.navigation.navigate('SetPwdPage', {
                titleName: '设置密码',
                userCode: this.state.userPhone,
                verifyCode: this.state.verifyCode,
                fromPage: fromPage,
            })
        } else if (fromPage === 1) {
            this.props.navigation.navigate('SetPwdPage', {
                titleName: '输入新密码',
                userCode: this.state.userPhone,
                verifyCode: this.state.verifyCode,
                fromPage: fromPage,
            })
        }
    };

    // 重置获取验证码(忘记密码)
    _userResetYzm = () => {
        this.props.loginAction.userResetYzm(this.state.userPhone)
            .then(response => {
                if (response.result) {
                    //是否需要图形码验证
                    let isShowImgCode = response.data
                    if (isShowImgCode) {
                        //获取图形验证码
                        this._getVerifyCode()
                    } else {
                        //不显示图形验证码
                        this.setState({
                            buttonDisabled: true
                        })
                    }
                } else {
                    Toast.message(response.msg)
                }
            })
    }

    //重置获取验证码--附带图形验证码请求验证码
    _getResetRegisterVerificationCode = () => {
        let sha1_result = SHA1Util.hex_sha1(this.newUuid)
        this.props.loginAction.toResetRegisterVerificationCode(this.state.userPhone, sha1_result, this.state.imgCode)
    }

    render() {
        //图形验证码
        let imgCodeComponent = this.state.imgCodeVisible ?
            <View>
                <View style={styles.imgCodeView}>
                    <View style={{flexDirection: commonStyle.row, alignItems: commonStyle.center, flex: 1}}>
                        <Image source={images.login_yzm_gray}
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
                <Divide orientation={'horizontal'} color={commonStyle.lineColor} width={commonStyle.lineHeight}/>
            </View> : <View/>;
        let inputPhoneNum = (
            <View>
                <View style={{flexDirection: commonStyle.row, alignItems: commonStyle.center}}>
                    <Image source={images.login_phone_gray}
                           resizeMode='contain'
                           style={{width: 20, height: 20}}
                    />
                    <Input
                        style={styles.inputView}
                        size="lg"
                        maxLength={12}
                        placeholder="请输入手机号"
                        value={this.state.userPhone}
                        onChangeText={text => this.setState({userPhone: text})}
                    />
                </View>
                <Divide orientation={'horizontal'} color={commonStyle.lineColor} width={commonStyle.lineHeight}/>
            </View>
        )

        let getCodeComponent = (
            <View style={styles.imgCodeView}>
                <View style={{flexDirection: commonStyle.row, alignItems: commonStyle.center, flex: 1}}>
                    <Image source={images.login_pwd_gray}
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
                {/*timerActiveTitle={['请在（','s）后重试']}*/}
                {/*textStyle={{color: 'blue'}}*/}
                <CountDownButton
                    style={{width: 110, height: 40, marginLeft: commonStyle.marginLeft}}
                    timerCount={10}
                    timerTitle={'获取验证码'}
                    enable={12 > 10}
                    onClick={(shouldStartCounting) => {
                        // true开始倒计，但按钮仍不可点击，直到倒计时结束 false按钮恢复可点击状态，但不会开始倒计时
                        shouldStartCounting(this.state.buttonDisabled)
                        this._userRequest()
                    }}
                    timerEnd={() => {
                        // this.setState({
                        //     state: '倒计时结束'
                        // })
                    }}/>
            </View>
        )

        let bottomComponent = this.fromPage === 0 ?
            <View style={{flexDirection: commonStyle.row}}>
                <Text>注册即视为同意并阅读</Text>
                <Text style={{color: '#59a3ff'}} onPress={() => {
                    this.props.navigation.navigate('WebViewPage', {isNetUrl: false})
                }}>《服务条款》</Text>
            </View> :
            <View style={{flexDirection: commonStyle.row}}>
                <Text>没有收到验证码点击按钮</Text>
                <Text style={{color: '#59a3ff'}}>重新获取</Text>
            </View>;
        let title = this.fromPage === 0 ? '注册' : '忘记密码'
        return (
            <BaseContainer style={styles.container} title={title} left={'返回'} store={this.props.login}>
                <View style={{marginLeft: commonStyle.marginLeft, marginRight: commonStyle.marginRight}}>
                    <View
                        style={{
                            backgroundColor: commonStyle.clear,
                            marginTop: 10,
                            marginBottom: 10,
                            borderColor: commonStyle.borderColor,
                            borderRadius: 5,
                            borderWidth: 1,
                            paddingLeft: 10
                        }}>
                        {inputPhoneNum}
                        {imgCodeComponent}
                        {getCodeComponent}
                    </View>
                    {bottomComponent}
                    <Button title="下一步"
                            size='lg'
                            type='primary'
                            style={{marginTop: commonStyle.marginTop}}
                            onPress={() => {
                                this._userNextStep()
                            }}/>
                </View>
            </BaseContainer>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: commonStyle.white,
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
        color: commonStyle.textBlockColor
    }
})

const mapState = (state) => ({
    nav: state.nav,
    login: state.login,
})

const dispatchAction = (dispatch) => ({
    loginAction: bindActionCreators(loginAction, dispatch)
})

export default connect(mapState, dispatchAction)(RegisterPage)
