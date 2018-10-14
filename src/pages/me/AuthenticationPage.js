/**
 * Created by cyh on 2018/7/12.
 */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableWithoutFeedback
} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Input, ListRow, Button, Overlay, Label, Toast} from "../../components/teaset/index"
import {BaseContainer, Divide, StateImage} from "../../components/base"
import {images} from "../../assets/index"
import {commonStyle} from '../../constants/commonStyle'
import * as authenticationAction from '../../actions/authentication'
import * as meAction from '../../actions/me'
import ImagePicker from "react-native-image-picker"
import {DateUtil, BeeUtil, IdCardUtils, PickerOptionUtil} from "../../utils/index"

class AuthenticationPage extends Component {

    constructor(props) {
        super(props);
        this.itemCar = {}
        this.state = {
            realName: '',
            tel: '',
            idNum: '',
            userSex: '',
            userSexType: '1',
            frontPic: '',
            sidePic: '',
            frontPicName: '',
            sidePicName: '',
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
                            this.setState({userSex: '女', userSexType: '0'})
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
                            this.setState({userSex: '男', userSexType: '1'})
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


    _toAuthentication = () => {
        const {login} = this.props
        if (BeeUtil.isEmpty(this.state.realName)) {
            Toast.message('请输入真实姓名')
            return
        }
        if (BeeUtil.isEmpty(this.state.tel)) {
            Toast.message('请输入联系方式')
            return
        }
        if (BeeUtil.isEmpty(this.state.idNum)) {
            Toast.message('请输入身份证号')
            return
        }
        if (IdCardUtils.checkCode(this.state.idNum)) {
            Toast.message('请输入18位身份证号码')
            return
        }
        if (BeeUtil.isEmpty(this.state.frontPicName)) {
            Toast.message('请传入身份证正面照片')
            return
        }
        if (BeeUtil.isEmpty(this.state.sidePicName)) {
            Toast.message('请传入身份证反面照片')
            return
        }
        let params = {
            userId: login.user.id,
            realName: this.state.realName,
            sex: this.state.userSexType,
            tel: this.state.tel,
            idNum: this.state.idNum,
            frontPic: this.state.frontPicName,
            sidePic: this.state.sidePicName
        }
        this.props.Action.toAuthentication(params)
            .then(response => {
                if (response.result) {
                    this.props.navigation.goBack()
                } else {
                    Toast.message(response.msg)
                }
            })
    }

    render() {
        // source={{uri: `${loadUrl}${this.state.drivingLic}`}}
        return (
            <BaseContainer store={this.props.authentication} style={styles.rootView} title={'实名认证'}>
                <ScrollView
                    ref={(scroll) => this._scroll = scroll}
                    keyboardDismissMode='on-drag'
                    keyboardShouldPersistTaps='never'
                    showsVerticalScrollIndicator={true}
                    scrollEnabled={true}
                    pagingEnabled={true}
                    horizontal={false}
                    style={{flex: 1}}
                    onScroll={(e) => {
                        console.warn('onScroll');
                    }}>

                    <View style={{marginLeft: 10}}>
                        <View style={{flexDirection: commonStyle.row, alignItems: commonStyle.center, height: 50,}}>
                            <Label text='真实姓名' size='md' type='title'/>
                            <Input
                                style={styles.input}
                                size='lg'
                                value={this.state.realName}
                                placeholder='请输入真实姓名'
                                onChangeText={text => this.setState({realName: text})}
                            />
                        </View>
                        <Divide orientation={'horizontal'} color={commonStyle.lineColor}
                                width={commonStyle.lineHeight}/>
                        <ListRow
                            style={{height: commonStyle.bottomBtnHeight, marginLeft: -10}}
                            title='性别'
                            detail={this.state.userSex}
                            onPress={() => {
                                this._selectTypePop()
                            }}
                            bottomSeparator='full'/>
                        <View style={{flexDirection: commonStyle.row, alignItems: commonStyle.center, height: 50}}>
                            <Label text='联系方式' size='md' type='title'/>
                            <Input
                                style={styles.input}
                                size='lg'
                                value={this.state.tel}
                                placeholder='请输入联系方式'
                                onChangeText={text => this.setState({tel: text})}
                            />
                        </View>
                        <Divide orientation={'horizontal'} color={commonStyle.lineColor}
                                width={commonStyle.lineHeight}/>
                        <View style={{flexDirection: commonStyle.row, alignItems: commonStyle.center, height: 50}}>
                            <Label text='身份证号' size='md' type='title'/>
                            <Input
                                style={styles.input}
                                size='lg'
                                value={this.state.idNum}
                                placeholder='请输入身份证号'
                                onChangeText={text => this.setState({idNum: text})}
                            />
                        </View>
                        <Divide orientation={'horizontal'} color={commonStyle.lineColor}
                                width={commonStyle.lineHeight}/>
                        <View style={{flexDirection: commonStyle.row, marginTop: commonStyle.marginTop}}>
                            <Label text='证件照片' size='md' type='title'/>
                            <TouchableWithoutFeedback onPress={this._showDrivingLicImagePicker}>
                                <StateImage url={this.state.frontPic}
                                            defaultSource={images.app_add_photo}
                                            errorSource={images.app_add_photo}
                                            style={{
                                                width: 88,
                                                height: 88,
                                                marginLeft: commonStyle.marginLeft,
                                            }}/>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={this._showPanoramaImagePicker}>
                                <StateImage url={this.state.sidePic}
                                            defaultSource={images.app_add_photo}
                                            errorSource={images.app_add_photo}
                                            style={{
                                                width: 88,
                                                height: 88,
                                                marginLeft: commonStyle.marginLeft,
                                            }}/>
                            </TouchableWithoutFeedback>
                        </View>


                    </View>
                </ScrollView>
                <Button title="立即认证"
                        size='lg'
                        style={{margin: commonStyle.margin}}
                        onPress={this._toAuthentication}
                        type='primary'/>
            </BaseContainer>
        );
    }


    _showDrivingLicImagePicker = () => {
        this._showImagePicker(true)
    }

    _showPanoramaImagePicker = () => {
        this._showImagePicker(false)
    }

    _showImagePicker = (flag) => {
        const {login} = this.props
        let userCode = login.user.userCode
        ImagePicker.showImagePicker(PickerOptionUtil.options, (response) => {
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

                let tempDate = DateUtil.formt(new Date(), 'yyMMddHHmmss')
                let imgName = `02${tempDate}11${userCode}.jpg`

                this.props.meAction.onFileUpload(file, imgName || '021809181538201115669961385.jpg', () => {
                    if (flag) {
                        this.setState({
                            frontPic: source,
                            frontPicName: imgName,
                        })
                    } else {
                        this.setState({
                            sidePic: source,
                            sidePicName: imgName,
                        })
                    }
                })
            }
        });
    }

}

const styles = StyleSheet.create({
    rootView: {
        backgroundColor: commonStyle.white,
        flex: 1
    },
    input: {
        flex: 1,
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
    authentication: state.authentication,
});

const dispatchAction = (dispatch) => ({
    meAction: bindActionCreators(meAction, dispatch),
    Action: bindActionCreators(authenticationAction, dispatch),
});

export default connect(mapState, dispatchAction)(AuthenticationPage)
