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
import {bindActionCreators} from 'redux'
import {Input, ListRow, Button, Overlay, Label, Toast} from "../../components/teaset/index"
import {BeeUtil, LoadingUtils} from '../../utils/index'
import {commonStyle} from '../../constants/commonStyle'
import {Divide, TitleBar, LoadingModal} from '../../components/base'
import {meAction} from '../../actions/index'

class ModifyLoginPwdPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            oldValue: '',
            newValue: '',
            sureNewValue: '',
        }
    }

    _userModifyLoginPwd = () => {
        const {oldValue, newValue, sureNewValue} = this.state
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
        LoadingUtils.show()
        this.props.meAction.toModifyLoginPwd(this.props.login.user.id, oldValue, sureNewValue)
            .then(response => {
                LoadingUtils.hide()
                if (response.result) {
                    Toast.message('修改登录密码成功')
                    this.props.navigation.goBack()
                }
            })
    }


    render() {
        return (
            <View style={styles.rootStyle}>
                <TitleBar title={'修改登录密码'}/>
                <View>
                    <Input
                        style={styles.input}
                        size='lg'
                        value={this.state.oldValue}
                        placeholder='输入原始密码'
                        onChangeText={text => this.setState({oldValue: text})}
                    />
                    <Divide orientation={'horizontal'} color={commonStyle.lineColor}
                            width={commonStyle.lineHeight}/>
                    <Input
                        style={styles.input}
                        size='lg'
                        value={this.state.newValue}
                        placeholder='输入新密码'
                        onChangeText={text => this.setState({newValue: text})}
                    />
                    <Divide orientation={'horizontal'} color={commonStyle.lineColor}
                            width={commonStyle.lineHeight}/>
                    <Input
                        style={styles.input}
                        size='lg'
                        value={this.state.sureNewValue}
                        placeholder='确认新密码'
                        onChangeText={text => this.setState({sureNewValue: text})}
                    />
                    <Divide orientation={'horizontal'} color={commonStyle.lineColor}
                            width={commonStyle.lineHeight}/>
                </View>
                <Button title="确 定"
                        size='lg'
                        style={{margin: commonStyle.margin}}
                        onPress={() => {
                            this._userModifyLoginPwd()
                        }}
                        type='primary'/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    rootStyle: {
        flex: 1,
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
})


const dispatchAction = (dispatch) => ({
    meAction: bindActionCreators(meAction, dispatch),
})

export default connect(mapState, dispatchAction)(ModifyLoginPwdPage)
