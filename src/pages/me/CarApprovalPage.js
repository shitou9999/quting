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
import Divide from "../../components/base/Divide"
import {commonStyle} from '../../constants/commonStyle'
import * as ViewUtil from '../../utils/ViewUtil'
import * as meActions from '../../actions/me'
import ImagePicker from "react-native-image-picker"
import * as DateUtil from "../../utils/DateUtil"
import BeeUtil from '../../utils/BeeUtil'


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
}

class CarApprovalPage extends Component {

    constructor(props) {
        super(props);
        this.itemCar = {}
        this.state = {
            owenerName: '',
            vehNo: '',
            drivingLic: null,
            panorama: null,
            drivingLicName: '',
            panoramaName: '',
        }
    }

    componentDidMount() {
        this.itemCar = this.props.navigation.getParam('itemCar')
    }


    _goRequestCarApproval = () => {
        const {login} = this.props
        if (BeeUtil.isEmpty(this.state.owenerName)) {
            Toast.message('请输入车主姓名')
            return
        }
        if (BeeUtil.isEmpty(this.state.frontPicName)) {
            Toast.message('请传入行驶证照片')
            return
        }
        if (BeeUtil.isEmpty(this.state.sidePicName)) {
            Toast.message('请传入车辆全景图片')
            return
        }
        let params = {
            "userId": login.user.id,
            "plate": this.itemCar.plate,
            "plateColor": this.itemCar.plateColor,
            "owenerName": this.state.owenerName,
            "vehNo": this.state.vehNo,
            "drivingLic": this.state.drivingLicName,//行驶证
            "panorama": this.state.panoramaName,// 全景图片
        }
        this.props.toRequestCarApproval(params, () => {
            this.props.navigation.goBack()
        })
    }

    render() {
        const {navigation} = this.props
        // source={{uri: `${loadUrl}${this.state.drivingLic}`}}
        return (
            <BaseContainer style={styles.rootView} title={'车辆认证'}>
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
                    <View>
                        <ListRow title='车牌号'
                                 detail={this.itemCar.plate}
                                 titlePlace='left'/>
                        <ListRow title='车牌类型'
                                 detail={ViewUtil.getKeyValue('PLATE+COLOR', parseInt(this.itemCar.plateColor))}
                                 titlePlace='left'/>
                    </View>

                    <View style={{marginLeft: 10}}>
                        <View style={{flexDirection: commonStyle.row, alignItems: commonStyle.center, height: 50,}}>
                            <Label text='车主姓名' size='md' type='title'/>
                            <Input
                                style={styles.input}
                                size='lg'
                                value={this.state.owenerName}
                                placeholder='请输入车主姓名'
                                onChangeText={text => this.setState({owenerName: text})}
                            />
                        </View>
                        <Divide orientation={'horizontal'} color={commonStyle.lineColor}
                                width={commonStyle.lineHeight}/>
                        <View style={{flexDirection: commonStyle.row, alignItems: commonStyle.center, height: 50}}>
                            <Label text='车架号' size='md' type='title'/>
                            <Input
                                style={styles.input}
                                size='lg'
                                value={this.state.vehNo}
                                placeholder='请输入车架号后六位数'
                                onChangeText={text => this.setState({vehNo: text})}
                            />
                        </View>
                        <Divide orientation={'horizontal'} color={commonStyle.lineColor}
                                width={commonStyle.lineHeight}/>
                        <View style={{height: 50, justifyContent: commonStyle.center}}>
                            <Label text='行驶证照片' size='md' type='title'/>
                        </View>
                        <TouchableWithoutFeedback onPress={this._showDrivingLicImagePicker}>
                            {
                                this.state.drivingLic === null ?
                                    <Image source={require('../../assets/images/app_add_photo.png')}
                                           style={{
                                               width: 88,
                                               height: 88,
                                               marginLeft: commonStyle.marginLeft - 5,
                                           }}
                                    /> :
                                    <Image source={this.state.drivingLic}
                                           style={{
                                               width: 88,
                                               height: 88,
                                               marginLeft: commonStyle.marginLeft - 5,
                                               borderRadius: 5
                                           }}
                                    />
                            }
                        </TouchableWithoutFeedback>
                        <View style={{height: 50, justifyContent: commonStyle.center}}>
                            <Label text='行驶证全景照片' size='md' type='title'/>
                        </View>
                        <TouchableWithoutFeedback onPress={this._showPanoramaImagePicker}>
                            {
                                this.state.panorama === null ?
                                    <Image source={require('../../assets/images/app_add_photo.png')}
                                           style={{
                                               width: 88,
                                               height: 88,
                                               marginLeft: commonStyle.marginLeft - 5,
                                           }}
                                    /> :
                                    <Image source={this.state.panorama}
                                           style={{
                                               width: 88,
                                               height: 88,
                                               marginLeft: commonStyle.marginLeft - 5,
                                               borderRadius: 5
                                           }}
                                    />
                            }
                        </TouchableWithoutFeedback>
                    </View>
                </ScrollView>
                <Button title="确 认"
                        size='lg'
                        style={{margin: commonStyle.margin}}
                        onPress={this._goRequestCarApproval}
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

                let tempDate = DateUtil.formt(new Date(), 'yyMMddHHmmss')
                let imgName = `02${tempDate}11${userCode}.jpg`

                this.props.onFileUpload(file, imgName || '021809181538201115669961385.jpg', () => {
                    if (flag) {
                        this.setState({
                            drivingLic: source,
                            drivingLicName: imgName,
                        })
                    } else {
                        this.setState({
                            panorama: source,
                            panoramaName: imgName,
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
    toRequestCarApproval: (user, pwd, callOk) => dispatch(meActions.toRequestCarApproval(user, pwd, callOk)),
    // loginAction: bindActionCreators(loginActions, dispatch),
});

export default connect(mapState, dispatchAction)(CarApprovalPage)
