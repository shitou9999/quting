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
import Input from 'teaset/components/Input/Input'
import Button from 'teaset/components/Button/Button'
import Toast from 'teaset/components/Toast/Toast'
import BeeUtil from '../../utils/BeeUtil'
import {commonStyle} from '../../constants/commonStyle'
import * as loginAction from '../../actions/login'
import BaseContainer from "../../components/BaseContainer"

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

    //你也可以直接使用this.props.navigation.state.params访问 params 对象。 如果没有提供参数，这可能是null，
    // 所以使用getParam通常更容易，所以你不必处理这种情况
    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.getParam('titleName'),
        };
    };

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
                .then(result => {
                    Toast.message('注册成功')
                })
        } else if (fromPage === 1) {
            this.props.loginAction.userResetLoginPwd(params)
                .then(result => {
                    Toast.message('重置密码成功')
                    //用户重置登录密码成功  关闭相关页面
                    this.props.navigation.goBack('LoginPage')
                })
        }
    };

    render() {
        const {navigation} = this.props;
        this.userCode = navigation.getParam('userCode')
        this.msgPwd = navigation.getParam('verifyCode')//验证码
        this.fromPage = navigation.getParam('fromPage')
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
});

const mapState = (state) => ({
    nav: state.nav,
});

const dispatchAction = (dispatch) => ({
    loginAction: bindActionCreators(loginAction, dispatch)
});

export default connect(mapState, dispatchAction)(SetPwdPage)
