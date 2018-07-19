/**
 * Created by PVer on 2018/7/15.
 */
import React, {Component} from 'react';
import {
    ToastAndroid,
} from 'react-native';
import Toast from 'teaset/components/Toast/Toast';

//这里引入了一个md5加密的库，Github https://github.com/kmend/react-native-md5
//引入方式很简单，npm install react-native-md5 --save
//然后打开项目的package.json 查看，发现此时多了一个依赖
// import MD5 from "react-native-md5";

// 由于NetUtils是一个外部的js文件，所以在使用的地方一定要记得import NetUtils from '../net/NetUtils';
// 这里遇到的坑：
// 一：import 的时候 NetUtils.js 后面的.js可以去掉，路径填写相对路径
// 二：NetUtils.js里面 export default class NetUtils extends Component{} 组件必须export default 声明，切记一个js文件中只能有且仅有一个default声明
// 三：get post postJson方法都用了static 声明，直接NetUtils.post/get/postJosn即可

//在应用正式发布前，需要把代码中所有的console.log语句删除或者注释掉
const baseUrl = 'http://192.168.200.151:2080/_app-inf';
// const baseUrl = 'http://beta..cc:32080/_app-inf';

export default class NetUtils {

    constructor() {
        // this.optionParams = {
        //     timeoutMs: 15000,
        //     token: null,
        //     authorizationCode: null,
        // };
    };

    /**
     * 普通的get请求
     * @param {*} url 地址
     * @param {*} params  参数
     * @param {*} callback  成功后的回调
     */
    static get(url, params, callback) {
        fetch(url, {
            method: 'GET',
            body: params
        })
            .then((response) => {
                if (response.ok) {//如果返回200表示请求成功则为true
                    return response.json(); //把response转为json格式
                }
            })
            .then((json) => {
                if (json.code === "000000") {
                    callback(json);
                } else {
                    //否则不正确，则进行消息提示
                    //ToastAndroid 只针对安卓平台，并不跨平台
                    ToastAndroid.show(json.msg, ToastAndroid.SHORT);
                }
            }).catch(error => {
            ToastAndroid.show("netword error", ToastAndroid.SHORT);
        });
    }

    /**
     * then形式
     * post json形式  header为'Content-Type': 'application/json'
     * @param {*} service
     * @param {*} jsonObj
     * @param {*} callback
     */
    static postJson(service, jsonObj) {
        let urlStr = baseUrl + service;
        let bodyStr = JSON.stringify(jsonObj);
        console.log('请求url: ', urlStr);
        console.log('请求bodyStr: ', bodyStr);
        return new Promise((resole, reject) => {
            fetch(urlStr, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify(jsonObj), //json对象转换为string
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                })
                .then((json) => {
                    if (json.code === "000000") {
                        // callback(json);
                        resole(json)
                    } else {
                        reject(json.msg);
                        ToastAndroid.show(json.msg, ToastAndroid.SHORT);
                    }
                })
                .catch(error => {
                    reject(error);
                    ToastAndroid.show(error.toString(), ToastAndroid.SHORT);
                });
        })

    };


    /**
     * post json形式  header为'Content-Type': 'application/json'
     * @param {*} url
     * @param {*} service
     * @param {*} jsonObj
     * @param {*} callback
     */
    static postJsonCallBack(url, jsonObj, callSucc, callFail) {
        let urlStr = baseUrl + url;
        let bodyStr = JSON.stringify(jsonObj);
        console.log('请求url: ', urlStr);
        console.log('请求bodyStr: ', bodyStr);
        fetch(urlStr, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify(jsonObj), //json对象转换为string
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((json) => {
                if (json.code === "000000") {
                    callSucc(json);
                } else {
                    Toast.fail(json.msg)
                }
            })
            .catch(error => {
                ToastAndroid.show(error.toString(), ToastAndroid.SHORT);
            });
    };

    /**
     * 获取图形验证码
     * @param url
     * @param jsonObj
     * @param callSucc
     * @param callFail
     */
    static postJsonCallBackImg(url, jsonObj, callSucc, callFail) {
        let urlStr = baseUrl + url;
        let bodyStr = JSON.stringify(jsonObj);
        console.log('请求url: ', urlStr);
        console.log('请求bodyStr: ', bodyStr);
        fetch(urlStr, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: bodyStr, //json对象转换为string
        })
            .then((response) => {
                if (response.ok) {
                    // return response.body
                    // return response.text();//文本流
                    return response.blob();//返回log显示是Object
                }
            })
            .then((responseText) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    callSucc(e.target.result);
                };
                reader.readAsDataURL(responseText);
            })
            .catch(error => {
                Toast.fail(error.toString());
            });
    }


    /**
     * post key-value 形式 hader为'Content-Type': 'application/x-www-form-urlencoded'
     * @param {*} url
     * @param {*} service
     * @param {*} params
     * @param {*} callback
     */
    static postForm(url, service, params, callback) {
        //添加公共参数
        // var newParams = this.getNewParams(service,params);//接口自身的规范，可以忽略
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'//key-value形式
            },
            // body:newParams
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((json) => {
                if (json.code === "000000") {
                    callback(json);
                } else {
                    ToastAndroid.show(json.msg, ToastAndroid.SHORT);
                }
            }).catch(error => {
            ToastAndroid.show("netword error", ToastAndroid.SHORT);
        });
    };
}


/**
 * 设置公共参数
 * @param {*} service  服务资源类型
 * @param {*} oldParams 参数 key-value形式的字符串
 * @return 新的参数
 */
// static getNewParams(service,oldParams){
//     var newParams = "";
//     var currentDate = this.getCurrentDate();
//     var MD5KEY = "XXXXXX";
//     var digestStr = MD5KEY+service+currentDate+MD5KEY;
//     newParams = oldParams+"&timestamp="+currentDate+"&digest="+this.MD5(digestStr);
//     return newParams;
// };

/**
 * 字符串加密
 * @param {*} str
 */
// static MD5(str){
//     return MD5.hex_md5(str);
// };



