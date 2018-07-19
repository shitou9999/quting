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

import LoginStyle from '../../assets/styles/LoginStyle';
import NetUtil from '../../net/NetUtils';
import BeeUtil from '../../utils/BeeUtil';
// this.props.navigation.goBack();       // 回退到上一个页面
// this.props.navigation.goBack(null);   // 回退到任意一个页面
// this.props.navigation.goBack('Home'); // 回退到Home页面
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
        if (BeeUtil.isEmpty(this.state.userPwd)) {
            Toast.fail('请输入密码');
            return
        }
        let params = {
            userCode: this.userCode,
            msgPwd: this.msgPwd,
            pwd: this.state.userPwd
        };
        if (this.fromPage === 0) {
            let service = '/member/register';
            NetUtil.postJsonCallBack(service, params, (result) => {
                Toast.success('注册成功');
                //注册成功登录

            })
        } else {
            //用户重置登录密码
            let service = '/member/reset_login_pwd';
            NetUtil.postJsonCallBack(service, params, (result) => {
                Toast.success('重置密码成功');
                //关闭相关页面

            })
        }
    };

    render() {
        const {navigation} = this.props;
        this.userCode = navigation.getParam('userCode');
        this.msgPwd = navigation.getParam('verifyCode');//验证码
        this.fromPage = navigation.getParam('fromPage');
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
                        style={LoginStyle.bottomBt}
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
        backgroundColor: '#F5FCFF',
    },
});

const mapState = (state) => ({
    // isLoginLable: state.user.isLoginLable,
    nav: state.nav,
});

const dispatchAction = (dispatch) => ({
    // register: (user, pwd) => dispatch(userActions.register(user, pwd, pwd)),
    // login: (user, pwd) => dispatch(userActions.login(user, pwd))
    // loginAction: bindActionCreators(loginActions, dispatch),
    // userAction: bindActionCreators(userActions, dispatch)
});

export default connect(mapState, dispatchAction)(SetPwdPage)