/**
 * Created by PVer on 2018/8/25.
 */
import React from 'react'
import {
    TouchableOpacity,
    StyleSheet,
    Platform,
    ActivityIndicator,
    View,
    Text,
    ToastAndroid
} from 'react-native'
import ImagePicker from 'react-native-image-picker'
import Icon from 'react-native-vector-icons/FontAwesome'
import * as DateUtil from '../utils/DateUtil'

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

class CameraButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }


    render() {
        const {photos, type} = this.props;
        let conText;
        if (photos.length > 0) {
            conText = (<View style={styles.countBox}>
                <Text style={styles.count}>{photos.length}</Text>
            </View>);
        }
        return (
            <TouchableOpacity
                onPress={this.showImagePicker.bind(this)}
                style={[this.props.style, styles.cameraBtn]}>
                <View>
                    <Icon name="chevron-left" color="#aaa" size={34}/>
                    {conText}
                </View>
            </TouchableOpacity>
        )
    }

    showImagePicker() {
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                // let source;
                // if (Platform.OS === 'android') {
                //     source = {uri: response.uri, isStatic: true}
                // } else {
                //     source = {uri: response.uri.replace('file://', ''), isStatic: true}
                // }

                let file;
                if (Platform.OS === 'android') {
                    file = response.uri
                } else {
                    file = response.uri.replace('file://', '')
                }

                //"file:///storage/emulated/0/Android/data/com.quting/files/Pictures/image-da0ef3a7-b7ce-4cb3-a125-4f0297b366ea.jpg"
                console.log("response----file---->" + file)
                ///storage/emulated/0/Android/data/com.quting/files/Pictures/image-97953fa4-2da6-4c2e-87f1-04f86cae5df5.jpg
                console.log("response----path---->" + response.path)
                //image-97953fa4-2da6-4c2e-87f1-04f86cae5df5.jpg
                console.log("response----fileName---->" + response.fileName)
                //上传图片到服务器使用的是本地图片URL
                this.setState({
                    loading: true
                });
                let tempDate = DateUtil.formt(new Date(), 'yyMMddHHmmss')
                let imgName = "02" + tempDate + "1" + "1" +
                this.props.onFileUpload(file, `${imgName}.jpg` || '021809181538201115669961385.jpg')
            }
        });
    }
}

const styles = StyleSheet.create({
    cameraBtn: {
        padding: 5
    },
    count: {
        color: '#fff',
        fontSize: 12
    },
    fullBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    countBox: {
        position: 'absolute',
        right: -5,
        top: -5,
        alignItems: 'center',
        backgroundColor: '#34A853',
        width: 16,
        height: 16,
        borderRadius: 8,
        justifyContent: 'center'
    }
});

export default CameraButton;
