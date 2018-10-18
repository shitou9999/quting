/**
 * Created by cyh on 2018/7/12.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Alert,} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Input, ListRow, Button, Overlay, Label, Toast} from "../../components/teaset/index"
import {BeeUtil} from '../../utils/index'
import {commonStyle} from '../../constants/commonStyle'
import * as loginAction from '../../actions/login'
import {BaseContainer} from "../../components/base/index"
import {PushUtil} from "../../native"
import {Constants} from "../../constants/index"

class SetPwdPage extends Component {
    //fromPage 0设置密码 1重置登录密码
    constructor(props) {
        super(props);
        this.userCode = ''
        this.msgPwd = ''
        this.fromPage = 0
        this.state = {
            userPwd: ''
        }
    }


    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.getParam('titleName'),
        }
    }

    componentDidMount() {
        const {navigation} = this.props;
        this.userCode = navigation.getParam('userCode')
        this.msgPwd = navigation.getParam('verifyCode')//验证码
        this.fromPage = navigation.getParam('fromPage')
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.login.loginYes) {
            Toast.message('登录成功')
            nextProps.navigation.navigate('AppStackNavigator')
        }
        return null
    }

    /**
     * 用户注册or用户重置登录密码
     * @private
     */
    _userRegisterApp = () => {
        let fromPage = this.fromPage
        if (BeeUtil.isEmpty(this.state.userPwd)) {
            Toast.message('请输入密码')
            return
        }
        let params = {
            userCode: this.userCode,
            msgPwd: this.msgPwd,
            pwd: this.state.userPwd
        }
        if (fromPage === 0) {
            this.props.loginAction.userRegisterApp(params)
                .then(response => {
                    if (response.result) {
                        Toast.message('注册成功')
                        this._toLogin()
                    } else {
                        Toast.message('注册失败-' + response.msg)
                    }
                })
        } else if (fromPage === 1) {
            this.props.loginAction.userResetLoginPwd(params)
                .then(response => {
                    if (response.result) {
                        Toast.message('重置密码成功')
                        //用户重置登录密码成功  关闭相关页面
                        this.props.navigation.popToTop()
                    }
                })
        }
    }

    _toLogin = () => {
        this.props.loginAction.userLogin(this.userCode, this.state.userPwd, 1)
            .then((response) => {
                if (!response.result) {
                    Toast.message(response.msg)
                } else {
                    this._toBindPushAlias(response.data)
                }
            })
    }


    _toBindPushAlias = data => {
        PushUtil.addAlias(String(data.id), Constants.PUSH_ALIAS_TYPE, code => {
            console.log('push绑定-------->')
        })
    }

    render() {
        return (
            <BaseContainer style={styles.container} title={this.fromPage === 0 ? '设置密码' : '重置登录密码'}>
                <Input
                    style={{margin: commonStyle.margin}}
                    size="lg"
                    placeholder="请输入新密码"
                    value={this.state.userPwd}
                    onChangeText={text => this.setState({userPwd: text})}
                />

                <Button title="完成"
                        size='lg'
                        type='primary'
                        style={{margin: commonStyle.margin}}
                        onPress={() => {
                            this._userRegisterApp()
                        }}/>
            </BaseContainer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: commonStyle.white,
    },
})

const mapState = (state) => ({
    nav: state.nav,
    login: state.login
})

const dispatchAction = (dispatch) => ({
    loginAction: bindActionCreators(loginAction, dispatch)
})

export default connect(mapState, dispatchAction)(SetPwdPage)
