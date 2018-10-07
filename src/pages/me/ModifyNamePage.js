/**
 * Created by PVer on 2018/7/14.
 */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Input from 'teaset/components/Input/Input'
import Toast from 'teaset/components/Toast/Toast'
import BeeUtil from '../../utils/BeeUtil'
import * as meAction from '../../actions/me'
import {commonStyle} from '../../constants/commonStyle'
import TitleBar from "../../components/base/TitleBar"

class ModifyNamePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nickName: '',
        }
    }

    navigatePress = () => {
        const {nickName} = this.state
        if (BeeUtil.isEmpty(nickName)) {
            Toast.message('请输入昵称')
            return
        }
        this.props.meAction.toResetNickName(this.props.login.user.id, nickName)
            .then(response=>{
                if (response.result){
                    Toast.message('昵称设置成功')
                    this.props.navigation.goBack()
                }
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <TitleBar title={'修改昵称'}
                          navigation={this.props.navigation}
                          right={'保存'}
                          pressRight={this.navigatePress}/>
                <Input
                    style={styles.input}
                    size='lg'
                    value={this.state.nickName}
                    placeholder='请输入昵称'
                    onChangeText={text => this.setState({nickName: text})}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        width: gScreen.screen_width,
        height: 50,
        borderColor: commonStyle.white,
        borderRadius: 0,
        marginTop: 5,
    },
});


const mapState = (state) => ({
    nav: state.nav,
    login: state.login,
    me: state.me,
});

const dispatchAction = (dispatch) => ({
    // toResetNickName: (userId, nickName) => dispatch(meActions.toResetNickName(userId, nickName))
    meAction: bindActionCreators(meAction, dispatch)
});

export default connect(mapState, dispatchAction)(ModifyNamePage);
