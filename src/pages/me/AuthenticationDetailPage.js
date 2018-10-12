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
import BaseContainer from "../../components/base/BaseContainer"
import {StateImage} from "../../components/base/StateImage"
import Divide from "../../components/base/Divide"
import {commonStyle} from '../../constants/commonStyle'
import * as authenticationAction from '../../actions/authentication'
import * as meAction from '../../actions/me'
import ImagePicker from "react-native-image-picker"
import * as DateUtil from "../../utils/DateUtil"
import * as Constants from '../../constants/Constants'
import PickerOptionUtil from '../../utils/PickerOptionUtil'
import BeeUtil from '../../utils/BeeUtil'

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
        this.props.Action.getAuthentication(this.props.login.user.id)
            .then(response => {
                if (response && response.result) {
                    let tempData = response.data
                    let status = tempData.authenticationStatus
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
                        realName: tempData.realName,
                        userSex: tempData.sex,
                        tel: tempData.tel,
                        idNum: tempData.idNum,
                        frontPicName: tempData.frontPic,
                        sidePicName: tempData.sidePic,
                        buttonShow: isShow,// 0-审核中 1-审核通过 2-审核不通过
                        editable: isEditable,
                    })
                }
            })
    }


    render() {
        // source={{uri: `${loadUrl}${this.state.drivingLic}`}}
        let loadUrl = Constants.loadUrl
        return (
            <BaseContainer style={styles.rootView} title={'实名认证'} store={this.props.authentication}>
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
                            detail={BeeUtil.getGender(this.state.userSex)}
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
                                <StateImage
                                    url={`${loadUrl}${this.state.frontPicName}`}
                                    style={{
                                        width: 88,
                                        height: 88,
                                        marginLeft: commonStyle.marginLeft,
                                    }}
                                />
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={this._showPanoramaImagePicker}>
                                <StateImage
                                    url={`${loadUrl}${this.state.sidePicName}`}
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

export default connect(mapState, dispatchAction)(AuthenticationDetailPage)
