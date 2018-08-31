/**
 * Created by cyh on 2018/7/12.
 */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableNativeFeedback,
    Image
} from 'react-native';
import {connect} from 'react-redux';
import ListRow from 'teaset/components/ListRow/ListRow';
import MeStyle from '../../assets/styles/MeStyle';
import CameraButton from '../../components/CameraButton'

import BeeUtil from '../../utils/BeeUtil';
import * as meActions from '../../actions/me'

class UserInfoPage extends Component {

    constructor(props) {
        super(props);
        this.nickName = '未设置'
        this.state = {}
    }

    render() {
        const {navigation, me} = this.props;
        let nickName = me.user_info.nickName;
        if (BeeUtil.isNotEmpty(nickName)) {
            this.nickName = nickName;
        }
        let userSex = me.user_info.sex;
        if (userSex === '0') {
            userSex = '女'
        } else {
            userSex = '男'
        }
        return (
            <View style={styles.rootView}>
                <ListRow
                    style={MeStyle.listRow}
                    title='账号信息'
                    detail={me.user_info.userCode}
                    bottomSeparator='full'/>
                <ListRow
                    style={MeStyle.listRow}
                    title='头像'
                    onPress={() => {

                    }}
                    detail={
                        <Image style={styles.avatar} source={{uri: 'https://www.baidu.com/img/bd_logo1.png'}}/>
                    }
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

                    }}
                    bottomSeparator='full'/>
                <CameraButton style={styles.cameraBtn}
                              photos={[]}
                              onFileUpload={() => {
                                  this.userFileUpload()
                              }}/>
            </View>
        );
    }

    // onFileUpload(file, fileName){
    //     return this.props.onFileUpload({
    //         id: this.props.user.ID,
    //         type:'logo',
    //         obj:'user',
    //         corpId: this.props.cropId
    //     }, file, fileName)｝
    userFileUpload(file, fileName) {
        this.props.onFileUpload(file, fileName)
    }


}

const styles = StyleSheet.create({
    rootView: {
        flex: 1,
    },
    avatar: {
        borderRadius: 50,
        width: 30,
        height: 30
    }
});

const mapState = (state) => ({
    nav: state.nav,
    login: state.login,
    me: state.me
});

const dispatchAction = (dispatch) => ({
    onFileUpload: (params, file, fileName) => dispatch(meActions.onFileUpload(params, file, fileName))
});

export default connect(mapState, dispatchAction)(UserInfoPage);