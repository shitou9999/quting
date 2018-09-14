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
import Input from 'teaset/components/Input/Input'
import Toast from 'teaset/components/Toast/Toast'

import * as HttpUtil from '../../net/HttpUtils'
import BeeUtil from '../../utils/BeeUtil'

import * as meActions from '../../actions/me'
import {commonStyle} from '../../constants/commonStyle'
import TitleBar from "../../components/TitleBar"

//修改昵称
class ModifyNamePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
        }
    }

    // 在static中使用this方法----->React Native 中 static的navigationOptions中的点击事件不能用this
    static navigationOptions = ({navigation}) => {
        return {
            title: '昵称',
            headerRight: (
                <Text style={{color: commonStyle.white, marginRight: 10}}
                      onPress={()=>{navigation.state.params.navigatePress()}}
                >
                    完成
                </Text>
            )
        }
    };

    //属性给params
    componentDidMount() {
        this.props.navigation.setParams({navigatePress: this.navigatePress})
    }

    navigatePress = () => {
        let service = '/member/change';
        if (BeeUtil.isEmpty(this.state.userName)) {
            Toast.message('请输入昵称')
            return
        }
        const {me} = this.props;
        let params = {
            userId: me.user_info.userId,
            nickName: this.state.userName,
        };
        HttpUtil.fetchRequest(service, "POST", params)
            .then(json => {
                if (json.code === "000000") {
                    Toast.message('昵称设置成功');
                    //关闭相关页面,刷新我的和用户信息页面
                    this.props.toResetNickName(this.state.userName);
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
            <View style={styles.container}>
                <TitleBar title={'修改昵称'} navigation={this.props.navigation}/>
                <Input
                    style={styles.input}
                    size='lg'
                    value={this.state.userName}
                    placeholder='请输入昵称'
                    onChangeText={text => this.setState({userName: text})}
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
    toResetNickName: (userNickName) => dispatch(meActions.toResetNickName(userNickName))
    // userAction: bindActionCreators(userActions, dispatch)
});

export default connect(mapState, dispatchAction)(ModifyNamePage);
