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
import Toast from 'teaset/components/Toast/Toast'
import Label from 'teaset/components/Label/Label'
import ListRow from 'teaset/components/ListRow/ListRow'
import Button from 'teaset/components/Button/Button'
import Input from 'teaset/components/Input/Input'
import BaseContainer from "../../components/BaseContainer"
import Overlay from "teaset/components/Overlay/Overlay"
import Divide from "../../components/base/Divide"
import {commonStyle} from '../../constants/commonStyle'
import * as meActions from '../../actions/me'
import ImagePicker from "react-native-image-picker"
import * as DateUtil from "../../utils/DateUtil"
import * as Constants from '../../constants/Constants'
import PickerOptionUtil from '../../utils/PickerOptionUtil'

class AuthenticationDetailPage extends Component {

    constructor(props) {
        super(props);
        this.itemCar = {}
        this.state = {
            authenticationStatus: '0',
            realName: '',
            tel: '',
            idNum: '',
            userSex: '',
            userSexType: '1',
            frontPic: null,
            sidePic: null,
            frontPicName: '',
            sidePicName: '',
            buttonShow: false,
            editable: false,
        }
    }


    componentDidMount() {
        const {login} = this.props
        this.props.getAuthentication(login.user.id, authentication => {
            let status = authentication.authenticationStatus
            let isShow, isEditable
            if (parseInt(status) === 2) {
                isShow = true
                isEditable = true
            } else {
                isShow = false
                isEditable = false
            }
            this.setState({
                authenticationStatus: status,
                realName: authentication.realName,
                userSex: authentication.sex,
                tel: authentication.tel,
                idNum: authentication.idNum,
                frontPicName: authentication.frontPic,
                sidePicName: authentication.sidePic,
                buttonShow: isShow,// 0-审核中 1-审核通过 2-审核不通过
                editable: isEditable,
            })
        })
        console.log(this.state.idNum)
    }

//realName (string, optional): 真实姓名,
// sex (string, optional): 性别:数据字典(member平台)--SEX,
// tel (string, optional): 联系方式,
// idNum (string, optional): 身份证号码,
// frontPic (string, optional): 身份证正面图片,
// sidePic (string, optional): 身份证反面图片,
// authenticationStatus (string, optional): 认证状态 0-审核中 1-审核通过 2-审核不通过（数据字典(member平台)：AUTHENTICATION_STATUS）
    render() {
        // source={{uri: `${loadUrl}${this.state.drivingLic}`}}
        let loadUrl = Constants.loadUrl
        return (
            <BaseContainer style={styles.rootView} title={'实名认证'}>
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
                                editable={this.state.editable}
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
                            detail={parseInt(this.state.userSex) === 0 ? '女' : '男'}
                            bottomSeparator='full'
                            onPress={() => {
                            }}
                        />
                        <View style={{flexDirection: commonStyle.row, alignItems: commonStyle.center, height: 50}}>
                            <Label text='联系方式' size='md' type='title'/>
                            <Input
                                style={styles.input}
                                size='lg'
                                editable={this.state.editable}
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
                                editable={this.state.editable}
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
                                <Image source={{uri: `${loadUrl}${this.state.frontPicName}`}}
                                       style={{
                                           width: 88,
                                           height: 88,
                                           marginLeft: commonStyle.marginLeft,
                                       }}
                                />
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={this._showPanoramaImagePicker}>
                                <Image source={{uri: `${loadUrl}${this.state.sidePicName}`}}
                                       style={{
                                           width: 88,
                                           height: 88,
                                           marginLeft: commonStyle.marginLeft,
                                       }}
                                />
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </ScrollView>
                {
                    this.state.buttonShow ? <Button title={'重新认证'}
                                                    size='lg'
                                                    style={{margin: commonStyle.margin}}
                                                    onPress={this._toAuthentication}
                                                    type='primary'/> : null
                }
            </BaseContainer>
        );
    }


    _showDrivingLicImagePicker = () => {
        if (this.state.editable) {
            this._showImagePicker(true)
        }
    }

    _showPanoramaImagePicker = () => {
        if (this.state.editable) {
            this._showImagePicker(false)
        }
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

                this.props.onFileUpload(file, imgName || '021809181538201115669961385.jpg', () => {
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
});

const dispatchAction = (dispatch) => ({
    onFileUpload: (file, fileName, callOk) => dispatch(meActions.onFileUpload(file, fileName, callOk)),
    getAuthentication: (userId, callOk) => dispatch(meActions.getAuthentication(userId, callOk)),
    // loginAction: bindActionCreators(loginActions, dispatch),
});

export default connect(mapState, dispatchAction)(AuthenticationDetailPage)
