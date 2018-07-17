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
import Input from 'teaset/components/Input/Input';
import Button from 'teaset/components/Button/Button';
import Toast from 'teaset/components/Toast/Toast';
import ModalIndicator from 'teaset/components/ModalIndicator/ModalIndicator';
import LoadingModal from '../../components/LoadingModal';


import * as loginAction from '../../actions/login';

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import LoginStyle from '../../assets/styles/LoginStyle';

class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
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
        return (
            <View style={styles.container}>
                <Input
                    style={{margin: 10}}
                    size="lg"
                    placeholder="请输入用户名"
                    value={this.state.username}
                    onChangeText={text => this.setState({username: text})}
                />
                <Input
                    style={{margin: 10}}
                    secureTextEntry
                    size="lg"
                    placeholder="请输入密码"
                    value={this.state.password}
                    onChangeText={text => this.setState({password: text})}
                />
                <Button title="登 录"
                        size='lg'
                        type='primary'
                        style={[LoginStyle.bottomBt, {marginTop: 10}]}
                        onPress={() => {
                            this._login()
                        }}/>
                <Button title="注册"
                        size='lg'
                        type='primary'
                        style={LoginStyle.bottomBt}
                        onPress={() => {
                            navigation.navigate('RegisterPage',{fromPage:0,titleName:'注册'})
                        }}/>
                <Button title="忘记密码"
                        size='lg'
                        type='primary'
                        style={LoginStyle.bottomBt}
                        onPress={() => {
                            navigation.navigate('RegisterPage',{fromPage:1,titleName:'忘记密码'})
                        }}/>
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