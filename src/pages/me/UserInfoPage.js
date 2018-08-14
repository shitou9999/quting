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
import {connect} from 'react-redux';
import ListRow from 'teaset/components/ListRow/ListRow';
import MeStyle from '../../assets/styles/MeStyle';

import BeeUtil from '../../utils/BeeUtil';

class UserInfoPage extends Component {

    constructor(props) {
        super(props);
        this.nickName = '未设置'
        this.state = {}
    }

    render() {
        const {navigation, me} = this.props;
        let nickName = me.nickName;
        if (BeeUtil.isNotEmpty(nickName)) {
            this.nickName = nickName;
        }
        let userSex = me.sex;
        if (userSex === '0'){
            userSex = '女'
        }else{
            userSex = '男'
        }
        return (
            <View style={styles.rootView}>
                <ListRow
                    style={MeStyle.listRow}
                    title='账号信息'
                    detail={me.userCode}
                    bottomSeparator='full'/>
                <ListRow
                    style={MeStyle.listRow}
                    title='头像'
                    onPress={() => {

                    }}
                    bottomSeparator='full'/>
                <ListRow
                    style={MeStyle.listRow}
                    title='昵称'
                    detail={this.nickName}
                    onPress={() => {
                        navigation.navigate('ModifyNamePage')
                    }}
                    bottomSeparator='full'/>
                <ListRow
                    style={MeStyle.listRow}
                    title='性别'
                    detail={userSex}
                    onPress={() => {
                        Alert.alert('性别');
                    }}
                    bottomSeparator='full'/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    rootView: {
        flex: 1,
        backgroundColor: '#ff7776',
    },
});

const mapState = (state) => ({
    nav: state.nav,
    login: state.login,
    me: state.me
});

const dispatchAction = (dispatch) => ({
    // loginAction: bindActionCreators(loginActions, dispatch),
});

export default connect(mapState, dispatchAction)(UserInfoPage);