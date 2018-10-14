/**
 * Created by cyh on 2018/7/12.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Alert, Image, ScrollView, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Toast, Label, ListRow, Button, Input} from '../../components/teaset/index'
import {TitleBar, Divide,StateImage} from "../../components/base"
import {commonStyle} from '../../constants/commonStyle'
import {BeeUtil, ViewUtil, DateUtil, PickerOptionUtil} from '../../utils/index'
import * as meActions from '../../actions/me'
import ImagePicker from "react-native-image-picker"
import {images} from "../../assets"

class CarApprovalPage extends Component {

    constructor(props) {
        super(props);
        this.itemCar = {}
        this.state = {
            owenerName: '',
            vehNo: '',
            drivingLic: '',
            panorama: '',
            drivingLicName: '',
            panoramaName: '',
            plateColorText: ''
        }
    }

    componentDidMount() {
        this.itemCar = this.props.navigation.getParam('itemCar')
        ViewUtil.getKeyValue('PLATE+COLOR', parseInt(this.itemCar.plateColor))
            .then(result => {
                this.setState({plateColorText: result.value})
            })
    }


    _goRequestCarApproval = () => {
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
            userId: this.props.login.user.id,
            plate: this.itemCar.plate,
            plateColor: this.itemCar.plateColor,
            owenerName: this.state.owenerName,
            vehNo: this.state.vehNo,
            drivingLic: this.state.drivingLicName,//行驶证
            panorama: this.state.panoramaName,// 全景图片
        }
        this.props.toRequestCarApproval(params, () => {
            this.props.navigation.goBack()
        })
    }

    render() {
        // source={{uri: `${loadUrl}${this.state.drivingLic}`}}
        return (
            <View style={styles.rootView}>
                <TitleBar title={'车辆认证'}/>
                <ListRow title='车牌号'
                         detail={<Label text={this.itemCar.plate} type='title'/>}
                         titlePlace='left'/>
                <ListRow title='车牌号'
                         detail={<Label text={this.state.plateColorText} type='title'/>}
                         titlePlace='left'/>
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
                    <TouchableOpacity onPress={this._showDrivingLicImagePicker}>
                        <StateImage
                            style={{
                                width: 88,
                                height: 88,
                                marginLeft: commonStyle.marginLeft - 5,
                            }}
                            url={this.state.drivingLic}
                            defaultSource={images.app_add_photo}
                            errorSource={images.app_add_photo}/>
                    </TouchableOpacity>
                    <View style={{height: 50, justifyContent: commonStyle.center}}>
                        <Label text='行驶证全景照片' size='md' type='title'/>
                    </View>
                    <TouchableOpacity onPress={this._showPanoramaImagePicker}>
                        <StateImage
                            style={{
                                width: 88,
                                height: 88,
                                marginLeft: commonStyle.marginLeft - 5,
                            }}
                            url={this.state.panorama}
                            defaultSource={images.app_add_photo}
                            errorSource={images.app_add_photo}/>
                    </TouchableOpacity>
                </View>
                <Button title="确 认"
                        size='lg'
                        style={{margin: commonStyle.margin}}
                        onPress={this._goRequestCarApproval}
                        type='primary'/>
            </View>
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
