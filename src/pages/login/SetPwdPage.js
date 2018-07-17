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
import Input from 'teaset/components/Input/Input';
import Button from 'teaset/components/Button/Button';
import Toast from 'teaset/components/Toast/Toast';

import NetUtil from '../../net/NetUtils';

class SetPwdPage extends Component {

    constructor(props) {
        super(props);
        this.userCode = '';
        this.msgPwd = '';
        this.fromPage = 0;
        this.state = {
            userPwd: ''
        }
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.getParam('titleName'),
            userCode: navigation.getParam('userCode'),
            msgPwd: navigation.getParam('userCode'),
        };
    };

//用户注册
    _userRegisterApp = () => {
        let params = {
            userCode: this.userCode,
            msgPwd: this.msgPwd,
            pwd: this.state.userPwd
        };
        if (this.fromPage == 0) {
            let service = '/member/register';
            NetUtil.postJsonCallBack(service, params, (result) => {
                Toast.success('注册成功' + result);
                //注册成功登录

            })
        } else {
            //用户重置登录密码
            let service = '/member/reset_login_pwd';
            NetUtil.postJsonCallBack(service, params, (result) => {
                Toast.success('重置密码成功' + result);
                //关闭相关页面

            })
        }
    };

    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <Input
                    style={{margin: 10}}
                    size="lg"
                    placeholder="请输入新密码"
                    value={this.state.userPwd}
                    onChangeText={text => this.setState({userPwd: text})}
                />

                <Button title="完成"
                        size='lg'
                        type='primary'
                        style={{marginTop:20}}
                        onPress={() => {
                            this._userRegisterApp()
                        }}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});

const mapState = (state) => ({
    // isLoginLable: state.user.isLoginLable,
});

const dispatchAction = (dispatch) => ({
    // register: (user, pwd) => dispatch(userActions.register(user, pwd, pwd)),
    // login: (user, pwd) => dispatch(userActions.login(user, pwd))
    // loginAction: bindActionCreators(loginActions, dispatch),
    // userAction: bindActionCreators(userActions, dispatch)
});

export default connect(mapState, dispatchAction)(SetPwdPage)