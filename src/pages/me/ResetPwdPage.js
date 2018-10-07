/**
 * Created by PVer on 2018/7/14.
 */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    TouchableOpacity,
    View,
    Image,
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import Input from 'teaset/components/Input/Input'
import Button from 'teaset/components/Button/Button'
import Toast from 'teaset/components/Toast/Toast'
import ListRow from 'teaset/components/ListRow/ListRow'
import CountDownButton from '../../components/CountDownButton'
import Divide from '../../components/base/Divide'
import {commonStyle} from '../../constants/commonStyle'
import * as HttpUtil from '../../net/HttpUtils'
import BeeUtil from '../../utils/BeeUtil'
import SHA1Util from '../../utils/SHA1Util'
import TokenSha1 from '../../utils/TokenSha1Util'
import * as meAction from '../../actions/me'
import TitleBar from "../../components/base/TitleBar"
import LoadingModal from "../../components/base/LoadingModal"

class ResetPwdPage extends Component {

    constructor(props) {
        super(props);
        this.newUuid = '';
        this.state = {
            netImg: 'https://www.baidu.com/img/bd_logo1.png',
            imgCode: '',
            verifyCode: '',
            payPwd: '',
            surePayPwd: '',
            imgCodeVisible: false,//图形验证码是否显示
            buttonDisabled: false,
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
     * @param userPhone
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
        this.props.meAction.userResetImgPayVerificationCode(this.props.user.userCode, sha1_result, this.state.imgCode)
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
        let service = '/member/verify_code'
        let uuid = TokenSha1.createUid()
        uuid = uuid.replace(/-/g, "")
        this.newUuid = uuid;
        let sha1_result = SHA1Util.hex_sha1(uuid)
        let params = {
            sessionId: sha1_result,
            random: uuid,
        }
        HttpUtil.postJsonImgCode(service, params, (result) => {
            this.setState({
                netImg: result,
                imgCodeVisible: true,
                buttonDisabled: true
            })
        })
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
    };


    _resetPayPwd = () => {
        const {verifyCode, surePayPwd} = this.state
        const {login} = this.props
        //surePayPwd,//新支付密码,,,verifyCode,// 验证码
        this.props.meAction.toResetPayPwd(login.user.id, surePayPwd, verifyCode)
            .then(response => {
                if (response.result) {
                    Toast.message('支付密码重置成功')
                    this.props.navigation.goBack()
                }
            })
    };

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
                    shouldStartCounting(this.state.buttonDisabled);
                    this._userRequest()
                }}
                timerEnd={() => {
                    this.setState({
                        state: '倒计时结束'
                    })
                }}/>
        </View>;

        return (
            <View style={styles.container}>
                <TitleBar title={'重置支付密码'}/>
                <View style={{flex: 1}}>
                    <ListRow title='用户手机号' bottomSeparator='full' detail={this.props.login.user.userCode}/>
                    {imgCodeComponent}
                    {imgYzmComponent}
                    <Divide orientation={'horizontal'} color={commonStyle.lineColor} width={commonStyle.lineHeight}/>
                    <Input
                        style={styles.input}
                        size='lg'
                        value={this.state.payPwd}
                        placeholder='输入支付密码'
                        onChangeText={text => this.setState({payPwd: text})}
                    />
                    <Divide orientation={'horizontal'} color={commonStyle.lineColor} width={commonStyle.lineHeight}/>
                    <Input
                        style={styles.input}
                        size='lg'
                        value={this.state.surePayPwd}
                        placeholder='确认支付'
                        onChangeText={text => this.setState({surePayPwd: text})}
                    />
                    <Divide orientation={'horizontal'} color={commonStyle.lineColor} width={commonStyle.lineHeight}/>
                </View>
                <Button title="完 成"
                        size='lg'
                        style={[{margin: commonStyle.margin}, {marginTop: 150}]}
                        onPress={() => {
                            this._userModifyPwd()
                        }}
                        type='primary'/>
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
});


const mapState = (state) => ({
    nav: state.nav,
    login: state.login,
    me: state.me,
})

const dispatchAction = (dispatch) => ({
    meAction: bindActionCreators(meAction, dispatch)
})

export default connect(mapState, dispatchAction)(ResetPwdPage)
