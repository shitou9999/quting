/**
 * Created by cyh on 2018/7/12.
 */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Alert
} from 'react-native';
import {connect} from 'react-redux'
import Input from 'teaset/components/Input/Input'
import Button from 'teaset/components/Button/Button'
import Toast from 'teaset/components/Toast/Toast'
import TitleBar from '../../components/TitleBar'
import * as HttpUtil from '../../net/HttpUtils'
import BeeUtil from '../../utils/BeeUtil'
import {commonStyle} from '../../constants/commonStyle'


class ModifyPwdPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            oldValue: '',
            newValue: '',
            sureNewValue: '',
        }
    }

    _userModifyPwd = () => {
        let service = '/member/change_login_pwd';
        const {oldValue, newValue, sureNewValue} = this.state;
        if (BeeUtil.isEmpty(oldValue)) {
            Toast.message('原始密码不能为空')
            return
        }
        if (BeeUtil.isEmpty(newValue)) {
            Toast.message('新密码不能为空')
            return
        }
        if (BeeUtil.isEmpty(sureNewValue)) {
            Toast.message('新密码不能为空')
            return
        }
        if (!BeeUtil.equals(newValue, sureNewValue)) {
            Toast.message('密码不一致请检查')
            return
        }
        let params = {
            userId: this.props.me.user_info.userId,
            oldPwd: oldValue,
            newPwd: sureNewValue,
        };
        HttpUtil.fetchRequest(service, "POST", params)
            .then(json => {
                if (json.code === "000000") {
                    Toast.message('修改登录密码成功');
                    this.props.navigation.goBack()
                } else {
                    Toast.message(json.msg)
                }
            })
            .catch(err => {
            })
    };


    render() {
        return (
            <View style={styles.rootStyle}>
                <View>
                    <TitleBar title={'修改登录密码'} navigation={this.props.navigation}/>
                    <Input
                        style={styles.input}
                        size='lg'
                        value={this.state.oldValue}
                        placeholder='输入原始密码'
                        onChangeText={text => this.setState({oldValue: text})}
                    />
                    <Input
                        style={styles.input}
                        size='lg'
                        value={this.state.newValue}
                        placeholder='输入新密码'
                        onChangeText={text => this.setState({newValue: text})}
                    />
                    <Input
                        style={styles.input}
                        size='lg'
                        value={this.state.sureNewValue}
                        placeholder='确认新密码'
                        onChangeText={text => this.setState({sureNewValue: text})}
                    />
                </View>
                <Button title="确 定"
                        size='lg'
                        style={{margin: commonStyle.margin}}
                        onPress={() => {
                            this._userModifyPwd()
                        }}
                        type='primary'/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    rootStyle: {
        flex: 1,
        backgroundColor: commonStyle.white,
        justifyContent: commonStyle.between
    },
    input: {
        width: gScreen.screen_width,
        height: 50,
        borderColor: commonStyle.white,
        borderRadius: 0,
    },
});

const mapState = (state) => ({
    nav: state.nav,
    login: state.login,
    me: state.me,
});


const dispatchAction = (dispatch) => ({
    // login: (user, pwd) => dispatch(userActions.login(user, pwd))
    // loginAction: bindActionCreators(loginActions, dispatch),
});

export default connect(mapState, dispatchAction)(ModifyPwdPage);