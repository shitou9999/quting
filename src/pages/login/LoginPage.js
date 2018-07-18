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
} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import Input from 'teaset/components/Input/Input';
import Button from 'teaset/components/Button/Button';
import Toast from 'teaset/components/Toast/Toast';
import ModalIndicator from 'teaset/components/ModalIndicator/ModalIndicator';
import LoadingModal from '../../components/LoadingModal';
import Label from 'teaset/components/Label/Label';

import * as loginAction from '../../actions/login';
import CountDownButton from '../../components/CountDownButton';
import LoginStyle from '../../assets/styles/LoginStyle';

import BeeUtil from '../../utils/BeeUtil';


class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            imgCode: '',
            verifyCode: '',
            imgCodeVisible: false,
            buttonDisabled: false,
            isGetImgCodeSucc: false,
            isShowPwdLogin: true,
        }
    }

    //已加载组件收到新的props之前调用,注意组件初始化渲染时则不会执行
    componentWillReceiveProps(nextProps) {
        // if (nextProps.isShow){
        //     Toast.show('************')
        // }else{
        //     this.setState({password: "9999999"})
        //     ModalIndicator.hide();
        // }
    }

//     if (!this.params.password || this.params.password.length === 0) {
//     Toast(I18n('LoginPWTip'));
//     return
// }
    _login = () => {
        // ModalIndicator.show('登录中...');

        this.props.userLogin('15669961385', '111111');
    };

// navigation.navigate('RootStackNavigator')
    render() {
        const {navigation, login} = this.props;
        let isShowPwdLogin = this.state.isShowPwdLogin ?
            <Input
                style={{margin: 10}}
                secureTextEntry
                size="lg"
                placeholder="请输入密码"
                value={this.state.password}
                onChangeText={text => this.setState({password: text})}
            /> :
            <View style={styles.imgCodeView}>
                <Input
                    style={styles.inputView}
                    size="lg"
                    placeholder="请输入验证码"
                    value={this.state.verifyCode}
                    onChangeText={text => this.setState({verifyCode: text})}
                />
                <CountDownButton
                    style={{width: 110,height:40,marginRight: 10}}
                    timerCount={10}
                    timerTitle={'获取验证码'}
                    enable={12 > 10}
                    onClick={(shouldStartCounting)=>{
                        shouldStartCounting(this.state.buttonDisabled);
                            this._userRequest()
	                    }}
                    timerEnd={()=>{
                        this.setState({
                            state: '倒计时结束'
                        })
	                }}/>
            </View>;
        let bottomText = this.state.isShowPwdLogin ? '验证码登录' : '普通登录';

        return (
            <View style={styles.container}>
                <Input
                    style={{margin: 10}}
                    size="lg"
                    placeholder="请输入手机号"
                    value={this.state.username}
                    onChangeText={text => this.setState({username: text})}
                />
                {isShowPwdLogin}
                <Button title="登 录"
                        size='lg'
                        type='primary'
                        style={[LoginStyle.bottomBt, {marginTop: 10}]}
                        onPress={() => {
                            this._login()
                        }}/>
                <View style={{flexDirection:'row',justifyContent: "space-between"}}>
                    {/*title: 在默认 Theme 中定义的字体颜色为黑色(#000)*/}
                    <Label type='title'
                           size='md'
                           text='注册'
                           style={{color: '#8a6d3b'}}
                           onPress={() => {
                             navigation.navigate('RegisterPage',{fromPage:0,titleName:'注册'})
                           }}/>
                    <Label type='title'
                           size='lg'
                           text='忘记密码'
                           style={{color: '#8a6d3b'}}
                           onPress={() => {
                             navigation.navigate('RegisterPage',{fromPage:1,titleName:'忘记密码'})
                           }}/>
                </View>
                <Button title="注册"
                        size='md'
                        type='primary'
                        style={LoginStyle.bottomBt}
                        onPress={() => {
                            navigation.navigate('RegisterPage',{fromPage:0,titleName:'注册'})
                        }}/>
                <View style={{flexDirection:'row'}}>
                    <Label type='title'
                           size='md'
                           text={bottomText}
                           style={{color: '#8a6d3b'}}
                           onPress={() => {
                           let isShow = this.state.isShowPwdLogin;
                           this.setState({
                               isShowPwdLogin:!isShow,

                           })
                       }}/>
                </View>
                <Text>{this.state.password}</Text>
            </View>
        );
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
    login: state.login,
});

const dispatchAction = (dispatch) => ({
    userLogin: (user, pwd) => dispatch(loginAction.userLogin(user, pwd)),
    // register: (user, pwd) => dispatch(userActions.register(user, pwd, pwd)),
    // login: (user, pwd) => dispatch(userActions.login(user, pwd))
    // loginAction: bindActionCreators(loginActions, dispatch),
    // userAction: bindActionCreators(userActions, dispatch)
});

export default connect(mapState, dispatchAction)(LoginPage);