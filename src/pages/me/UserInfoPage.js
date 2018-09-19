/**
 * Created by cyh on 2018/7/12.
 */
import React, {Component} from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableNativeFeedback,
    Image, FlatList, TouchableWithoutFeedback
} from 'react-native'
import {connect} from 'react-redux'
import ListRow from 'teaset/components/ListRow/ListRow'
import Toast from 'teaset/components/Toast/Toast'
import TitleBar from "../../components/TitleBar"
import ImageView from "../../components/ImageView"
import ImagePicker from 'react-native-image-picker'
import Overlay from "teaset/components/Overlay/Overlay"

import BeeUtil from '../../utils/BeeUtil'
import * as meActions from '../../actions/me'
import {commonStyle} from '../../constants/commonStyle'
import * as DateUtil from '../../utils/DateUtil'
import * as Constants from '../../constants/Constants'
import Label from "teaset/components/Label/Label";
import Divide from "../../components/Divide";


const options = {
    title: '选择图片',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '图片库',
    cameraType: 'back',
    mediaType: 'photo',
    videoQuality: 'high',
    durationLimit: 10,
    maxWidth: 600,
    maxHeight: 600,
    aspectX: 2,
    aspectY: 1,
    quality: 0.8,
    angle: 0,
    allowsEditing: false,
    noData: false,
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

class UserInfoPage extends Component {

    constructor(props) {
        super(props);
        this.nickName = '未设置'
        this.state = {
            userSex: '*',
            avatarSource: '',
            imgFileName: '',
            loading: false,
        }
    }

    componentDidMount() {
        let userSex = this.props.me.user_info.sex
        if (userSex === '0') {
            this.setState({userSex: '女'})
        } else {
            this.setState({userSex: '男'})
        }
    }


    _selectTypePop = (type, modal, text) => {
        let overlayView = (
            <Overlay.PopView
                ref={v => this.overlayPopView = v}
                style={{alignItems: commonStyle.center, justifyContent: commonStyle.center}}
                type={type}
                modal={modal}>
                <View
                    style={{
                        backgroundColor: commonStyle.white,
                        minWidth: 260,
                        minHeight: 80,
                        borderRadius: 5,
                        justifyContent: commonStyle.center,
                        alignItems: commonStyle.center,
                    }}>
                    <TouchableWithoutFeedback
                        onPress={() => {
                            this.setState({userSex: '女'})
                            this._selectType(0)
                            this.overlayPopView && this.overlayPopView.close()
                        }}>
                        <View style={{
                            justifyContent: commonStyle.center,
                            alignItems: commonStyle.center,
                            width: 260,
                            height: 40,
                        }}>
                            <Label size='md' type='title' text={'女'}/>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={{backgroundColor: commonStyle.lineColor, height: commonStyle.lineHeight}}/>
                    <TouchableWithoutFeedback
                        onPress={() => {
                            this.setState({userSex: '男'})
                            this._selectType(1)
                            this.overlayPopView && this.overlayPopView.close()
                        }}>
                        <View style={{
                            justifyContent: commonStyle.center,
                            alignItems: commonStyle.center,
                            width: 260,
                            height: 40,
                        }}>
                            <Label size='md' type='title' text={'男'}/>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </Overlay.PopView>
        );
        Overlay.show(overlayView)
    }

    _selectType = (index) => {
        const {login} = this.props
        if (index === 0) {
            this.props.toResetUserSex(login.user.id, '0')
        } else {
            this.props.toResetUserSex(login.user.id, '1')
        }
    }

    render() {
        const {navigation, me} = this.props
        let nickName = me.user_info.nickName
        if (BeeUtil.isNotEmpty(nickName)) {
            this.nickName = nickName
        }
        let userPic = me.user_info.userPic
        return (
            <View style={styles.rootView}>
                <TitleBar title={'个人信息'} navigation={navigation}/>
                <ListRow
                    style={{height: commonStyle.bottomBtnHeight}}
                    title='账号信息'
                    detail={me.user_info.userCode}
                    bottomSeparator='full'/>
                <ListRow
                    style={{height: commonStyle.bottomBtnHeight}}
                    title='头像'
                    onPress={this.showImagePicker.bind(this)}
                    detail={
                        userPic ? <Image style={styles.avatar}
                                         source={{uri: `${Constants.loadUrl}${me.user_info.userPic}`}}
                            />
                            :
                            <Image style={styles.avatar}
                                   source={require('../../assets/images/me_user_empty.png')}
                            />
                    }
                    bottomSeparator='full'/>
                {/*ImageView不能正常显示*/}
                {/*<ImageView style={styles.avatar}*/}
                {/*source={{uri: `${Constants.loadUrl}${me.user_info.userPic}`}}*/}
                {/*placeholderSource={require('../../assets/images/me_user_empty.png')}*/}
                {/*/>*/}
                <ListRow
                    style={{height: commonStyle.bottomBtnHeight}}
                    title='昵称'
                    detail={this.nickName}
                    onPress={() => {
                        navigation.navigate('ModifyNamePage')
                    }}
                    bottomSeparator='full'/>
                <ListRow
                    style={{height: commonStyle.bottomBtnHeight}}
                    title='性别'
                    detail={this.state.userSex}
                    onPress={() => {
                        this._selectTypePop()
                    }}
                    bottomSeparator='full'/>

                {/*<Image style={styles.avatar} source={{uri: `${loadUrl}${this.state.imgFileName}`}}/>*/}
                {/*<CameraButton style={styles.cameraBtn}*/}
                {/*photos={[]}*/}
                {/*onFileUpload={(file, fileName) => {*/}
                {/*this.userFileUpload(file, fileName)*/}
                {/*}}/>*/}
            </View>
        );
    }


    userFileUpload(file, fileName) {
        this.props.onFileUpload(file, fileName)
    }


    showImagePicker() {
        const {login} = this.props
        let userCode = login.user.userCode
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                Toast.message('用户取消操作')
            } else if (response.error) {
                Toast.message('发生了异常' + response.error)
            } else {
                let source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true}
                if (Platform.OS === 'android') {
                    source = {uri: response.uri, isStatic: true}
                } else {
                    source = {uri: response.uri.replace('file://', ''), isStatic: true}
                }

                let file;
                if (Platform.OS === 'android') {
                    file = response.uri
                } else {
                    file = response.uri.replace('file://', '')
                }

                //"file:///storage/emulated/0/Android/data/com.quting/files/Pictures/image-da0ef3a7-b7ce-4cb3-a125-4f0297b366ea.jpg"
                // console.log("response----file---->" + file)
                ///storage/emulated/0/Android/data/com.quting/files/Pictures/image-97953fa4-2da6-4c2e-87f1-04f86cae5df5.jpg
                // console.log("response----path---->" + response.path)
                //image-97953fa4-2da6-4c2e-87f1-04f86cae5df5.jpg
                // console.log("response----fileName---->" + response.fileName)

                let imageArray = this.state.avatarSource
                // imageArray.push(source)
                let imgFileNameArray = this.state.imgFileName
                // if (response.fileName != null) {
                //     imgFileNameArray.push(response.fileName)
                // }
                //上传图片到服务器使用的是本地图片URL
                let tempDate = DateUtil.formt(new Date(), 'yyMMddHHmmss')
                let imgName = `02${tempDate}11${userCode}.jpg`
                this.setState({
                    avatarSource: source,
                    imgFileName: imgName,
                    loading: true
                })
                this.props.onFileUpload(file, imgName || '021809181538201115669961385.jpg', () => {
                    this.props.toResetUserPic(login.user.id, imgName)
                })
            }
        });
    }


    // onFileUpload(file, fileName){
    //     return this.props.onFileUpload({
    //         id: this.props.user.ID,
    //         type:'logo',
    //         obj:'user',
    //         corpId: this.props.cropId
    //     }, file, fileName)｝

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
    onFileUpload: (file, fileName, callOk) => dispatch(meActions.onFileUpload(file, fileName, callOk)),
    toResetUserPic: (userId, userPic) => dispatch(meActions.toResetUserPic(userId, userPic)),
    toResetUserSex: (userId, sex) => dispatch(meActions.toResetUserSex(userId, sex)),
});

export default connect(mapState, dispatchAction)(UserInfoPage);
