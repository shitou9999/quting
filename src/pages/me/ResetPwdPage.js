/**
 * Created by PVer on 2018/7/14.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, TouchableOpacity, View, Image,} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {Input, ListRow, Button, Overlay, Label, Toast} from "../../components/teaset/index"
import {CountDownButton} from '../../components'
import {Divide, TitleBar, LoadingModal} from '../../components/base'
import {commonStyle} from '../../constants/commonStyle'
import {BeeUtil, SHA1Util, TokenSha1, Loading} from '../../utils/index'
import {loginAction,meAction} from '../../actions/index'

class ResetPwdPage extends Component {

    constructor(props) {
        super(props);
        this.newUuid = ''
        this.state = {
            netImg: 'https://www.baidu.com/img/bd_logo1.png',
            imgCode: '',
            verifyCode: '',
            payPwd: '',
            surePayPwd: '',
            imgCodeVisible: false,//图形验证码是否显示
            buttonDisabled: true,
        }
    }

    /**
     * 获取验证码
     * @private
     */
    _userRequest = () => {
        const {imgCodeVisible, imgCode} = this.state;
        if (imgCodeVisible) {
            //有图形验证码
            if (BeeUtil.isEmpty(imgCode)) {
                Toast.message('请输入图形验证码')
                return
            }
            this._userResetImgPayVerificationCode()
        } else {
            this._userResetPayVerificationCode()
        }
    }

    /**
     * 重置获取验证码
     * @private
     */
    _userResetPayVerificationCode = () => {
        this.props.meAction.userResetPayVerificationCode(this.props.login.user.userCode)
            .then(response => {
                if (response.result) {
                    let isShowImgCode = response.data
                    if (isShowImgCode) {
                        this._getVerifyCode()
                    }
                }
            })
    }

    /**
     * 重置获取验证码附带图形验证码
     * @private
     */
    _userResetImgPayVerificationCode = () => {
        let sha1_result = SHA1Util.hex_sha1(this.newUuid)
        this.props.meAction.userResetImgPayVerificationCode(this.props.login.user.userCode, sha1_result, this.state.imgCode)
            .then(response => {
                if (response && response.result) {
                    Toast.message('获取验证码成功')
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


    _userModifyPwd = () => {
        const {imgCodeVisible, imgCode, verifyCode, payPwd, surePayPwd} = this.state
        if (imgCodeVisible) {
            //有图形验证码
            if (BeeUtil.isEmpty(imgCode)) {
                Toast.message('请输入图形验证码')
                return
            }
            if (BeeUtil.isEmpty(verifyCode)) {
                Toast.message('请输入验证码')
                return
            }
            if (BeeUtil.isEmpty(payPwd)) {
                Toast.message('请输入支付密码')
                return
            }
            if (BeeUtil.isEmpty(surePayPwd)) {
                Toast.message('请输入支付密码')
                return
            }
            this._resetPayPwd()
        } else {
            if (BeeUtil.isEmpty(verifyCode)) {
                Toast.message('请输入验证码')
                return
            }
            if (BeeUtil.isEmpty(payPwd)) {
                Toast.message('请输入支付密码')
                return
            }
            if (BeeUtil.isEmpty(surePayPwd)) {
                Toast.message('请输入支付密码')
                return
            }
            this._resetPayPwd()
        }
    }


    _resetPayPwd = () => {
        const {verifyCode, surePayPwd} = this.state
        //surePayPwd,//新支付密码,,,verifyCode,// 验证码
        Loading.showLoading()
        this.props.meAction.toResetPayPwd(this.props.login.user.id, surePayPwd, verifyCode)
            .then(response => {
                Loading.disLoading()
                if (response.result) {
                    Toast.message('支付密码重置成功')
                    this.props.navigation.goBack()
                }
            })
    }

    render() {
        let imgCodeComponent = this.state.imgCodeVisible ?
            <View>
                <View style={styles.imgCodeView}>
                    <Input
                        style={styles.inputView}
                        size="lg"
                        placeholder="请输入图形验证码"
                        value={this.state.imgCode}
                        onChangeText={text => this.setState({imgCode: text})}
                    />
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
                </View>
                <Divide orientation={'horizontal'} color={commonStyle.lineColor} width={commonStyle.lineHeight}/>
            </View>
            : <View/>
        let imgYzmComponent = <View style={styles.imgCodeView}>
            <Input
                style={styles.inputView}
                size="lg"
                placeholder="请输入验证码"
                value={this.state.verifyCode}
                onChangeText={text => this.setState({verifyCode: text})}
            />
            <CountDownButton
                style={{width: 110, height: 40}}
                timerCount={10}
                timerTitle={'获取验证码'}
                enable={12 > 10}
                onClick={(shouldStartCounting) => {
                    shouldStartCounting(this.state.buttonDisabled)
                    this._userRequest()
                }}
                timerEnd={() => {
                    // this.setState({
                    //     state: '倒计时结束'
                    // })
                }}/>
        </View>;

        return (
            <View style={styles.container}>
                <TitleBar title={'密码'}/>
                <View style={{flex: 1}}>
                    <ListRow title='用户手机号' bottomSeparator='full' detail={this.props.login.user.userCode}/>
                    {imgCodeComponent}
                    {imgYzmComponent}
                    <Divide orientation={commonStyle.horizontal} color={commonStyle.lineColor}
                            width={commonStyle.lineHeight}/>
                    <Input
                        style={styles.input}
                        size='lg'
                        value={this.state.payPwd}
                        placeholder='输入支付密码'
                        onChangeText={text => this.setState({payPwd: text})}
                    />
                    <Divide orientation={commonStyle.horizontal} color={commonStyle.lineColor}
                            width={commonStyle.lineHeight}/>
                    <Input
                        style={styles.input}
                        size='lg'
                        value={this.state.surePayPwd}
                        placeholder='确认支付'
                        onChangeText={text => this.setState({surePayPwd: text})}
                    />
                    <Divide orientation={commonStyle.horizontal} color={commonStyle.lineColor}
                            width={commonStyle.lineHeight}/>
                </View>
                <Button title="完 成"
                        size='lg'
                        style={[{margin: commonStyle.margin}, {marginTop: 150}]}
                        onPress={() => {
                            this._userModifyPwd()
                        }}
                        type='primary'/>
                <LoadingModal ref={ref => global.loading = ref}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: commonStyle.white
    },
    inputView: {
        flex: 1,
        borderColor: commonStyle.white,
        borderRadius: 0,
    },
    input: {
        width: gScreen.screen_width,
        height: 40,
        borderColor: commonStyle.white,
        borderRadius: 0,
    },
    imgCodeView: {
        flexDirection: commonStyle.row,
        marginRight: 10,
        alignItems: commonStyle.center,
    },
})


const mapState = (state) => ({
    nav: state.nav,
    login: state.login,
    me: state.me,
})

const dispatchAction = (dispatch) => ({
    loginAction: bindActionCreators(loginAction, dispatch),
    meAction: bindActionCreators(meAction, dispatch)
})

export default connect(mapState, dispatchAction)(ResetPwdPage)
