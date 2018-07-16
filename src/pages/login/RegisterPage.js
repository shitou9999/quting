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
} from 'react-native';
import {connect} from 'react-redux';
import Button from 'teaset/components/Button/Button';
import Toast from 'teaset/components/Toast/Toast';

import LoginStyle from '../../assets/styles/LoginStyle';

import * as loginAction from '../../actions/login';
import NetUtil from '../../net/NetUtils';
import SHA1Util from '../../utils/SHA1Util';
function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            resolve(e.target.result);
        };
        fileReader.readAsDataURL(blob);
        fileReader.onerror = () => {
            reject(new Error('文件流异常'));
        };
    });
}

function LoadImage(url) {
    return new Promise((RES, REJ) => {
        fetch(url).then(r => r.blob()).then(blob => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target.result;
                RES(data.split('base64,')[1]);
            };
            reader.readAsDataURL(blob);
        }).catch(REJ);
    })
}

class RegisterPage extends Component {

    constructor(props) {
        super(props);
        this.imgUlr = 'https://www.baidu.com/img/bd_logo1.png';
        this.state = {
            netImg: 'wwww'
        }
    }

    // let service = 'member/verify_code';
    // let url = `http://192.168.200.151:2080/xiasha_app-inf${service}?sessionId=f4f19fb579b827ee124251f4917d175a23ade92a&random=76fec984f1b0445ca05724f00531a835`;

//     //**dataURL to blob**
//     function dataURLtoBlob(dataurl) {
//     var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
//         bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
//     while (n--) {
//         u8arr[n] = bstr.charCodeAt(n);
//     }
//     return new Blob([u8arr], { type: mime });
// }
//
//
//     //**blob to dataURL**
//     function blobToDataURL(blob, callback) {
//     var a = new FileReader();
//     a.onload = function (e) { callback(e.target.result); }
//     a.readAsDataURL(blob);
// }


    //test:
    //var blob = dataURLtoBlob('data:text/plain;base64,YWFhYWFhYQ==');
    //blobToDataURL(blob, function (dataurl) {
    //    console.log(dataurl);
    //});


    /* 生产uuid */
    uuid() {
        let s = [];
        let hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";
        let uuid = s.join("");
        return uuid;
    }

    _getVerifyCode = () => {
        let uuid = this.uuid();
        uuid = uuid.replace(/-/g, "");
        console.log("uuid-------->" + uuid);
        let sha1_result = SHA1Util.hex_sha1(uuid);
        console.log("sha1_result-------->" + sha1_result);

        let service = '/member/verify_code';

        NetUtil.postJsonCallBackImg(service, {
            sessionId: sha1_result,
            random: uuid,
        }, (result) => {
            this.imgUlr = result;
            console.log("netImg***-------->" + result);
            const allBase64 = blobToBase64(result);
            let baseImg = 'data:image/png;base64,' + allBase64;
            console.log("netImg-------->" + allBase64.toString());
            this.setState({
                netImg: baseImg
            });

        }, (fail) => {
            Toast.fail('获取图形验证码no')
        })
    };

    _getRegisterVerificationCode = () => {
        let service = '/member/verify_code';
        let url = `http://192.168.200.151:2080/xiasha_app-inf${service}?sessionId=8aad552e31e477f70fd01aec806563353d3a63b9&random=99688d79f9f940838aabee267cd58254`;
        LoadImage(url).then(base64 => {
            console.log(base64);
            var baseImg = 'data:image/png;base64,' + base64;
            this.setState({
                netImg: baseImg
            });
        });
    };

    _userRegister = () => {
        Toast.show('用户注册')
    };

    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>

                <Image
                    source={{uri:this.state.netImg}}
                    style={{width: 78, height: 78}}
                />
                <Button title={this.state.netImg}/>
                <Button title="获取图形验证码"
                        size='lg'
                        type='primary'
                        style={LoginStyle.bottomBt}
                        onPress={() => {
                            this._getVerifyCode()
                        }}/>
                <Image
                    source={{uri:this.imgUlr}}
                    style={{width: 78, height: 78}}
                />
                <Button title="注册获取验证码"
                        size='lg'
                        type='primary'
                        style={LoginStyle.bottomBt}
                        onPress={() => {
                            this._getRegisterVerificationCode()
                        }}/>
                <Image
                    source={{uri:'https://www.baidu.com/img/bd_logo1.png'}}
                    style={{width: 68, height: 68}}
                />
                <Button title="注册"
                        size='lg'
                        type='primary'
                        style={LoginStyle.bottomBt}
                        onPress={() => {
                            this._userRegister()
                        }}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
});

const mapState = (state) => ({
    nav: state.nav,
    login: state.login,
});

const dispatchAction = (dispatch) => ({
    getVerifyCode: (sessionId, random) => dispatch(loginAction.getVerifyCode(sessionId, random)),
    getRegisterVerificationCode: (userCode, sessionId, verifyCode) => dispatch(loginAction.getRegisterVerificationCode(userCode, sessionId, verifyCode)),
});

export default connect(mapState, dispatchAction)(RegisterPage);