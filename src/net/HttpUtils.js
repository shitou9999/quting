/**
 * Created by PVer on 2018/7/17.
 */
import Toast from 'teaset/components/Toast/Toast';
import TokenSha1 from '../utils/TokenSha1Util';
import {storage} from '../utils/storage';
import * as Constants from '../constants/Constants'

const baseUrl = 'http://192.168.200.153:2080/guangan_app-inf'
// const baseUrl = 'http://beta..cc:32080/_app-inf'

/***
 * 和原应用存key不同！！！！！！！！！！
 */
const getUserId = async () => {
    let userId = await storage.loadId('user', 'PREF+ID', (id) => {
        return id
    });
    return userId
}

const getToken = async () => {
    let token = await storage.loadId('user', 'PREF+TOKEN', token => {
        return token;
    });
    return token
}

//https://blog.csdn.net/withings/article/details/71331726
// token = "code=" + DataHelper.getStringSF(application, Constants.PREF_ID) + ";timestamp=" + st + ";signature=" + signature;

/**
 * @param {string} url 接口地址
 * @param {string} method 请求方法：GET、POST，只能大写
 * @param {JSON} [params=''] body的请求参数，默认为空
 * @return 返回Promise
 */
function fetchRequest(url, method, params = '') {
    console.log('request url:', url, params);
    return Promise.all([getUserId(), getToken()])
        .then(ret => {
            let nowDate = Date.parse(new Date().toDateString());
            let signatureStr = TokenSha1.signature(ret[0], nowDate, ret[1]);
            let xToken = `code=${ret[0]};timestamp=${nowDate};signature=${signatureStr}`;
            let header = {
                "Content-Type": "application/json;charset=UTF-8",
                "X-Token": xToken
            };
            return header
        }).then((header) => {
            if (params == '') {
                return new Promise(function (resolve, reject) {
                    timeout_fetch(fetch(baseUrl + url, {
                        method: method,
                        headers: header
                    })).then((response) => response.json())
                        .then((responseData) => {
                            console.log('res:', url, responseData);
                            resolve(responseData);
                        })
                        .catch((err) => {
                            console.log('err:', url, err);
                            reject(err);
                        });
                });
            } else {
                //let params = {"name":"admin","password":"admin"};
                //body: JSON.stringify(params)
                return new Promise(function (resolve, reject) {
                    timeout_fetch(fetch(baseUrl + url, {
                        method: method,
                        headers: header,
                        body: JSON.stringify(params)   //body参数，通常需要转换成字符串后服务器才能解析
                    })).then((response) => response.json())
                        .then((responseData) => {
                            console.log('res:', url, responseData);
                            resolve(responseData);
                        })
                        .catch((err) => {
                            console.log('err:', url, err);
                            reject(err);
                        });
                });
            }
        })
}

/**
 * 获取图形验证码
 * @param url
 * @param jsonObj
 * @param callSucc
 * @param callFail
 */
function postJsonImgCode(url, jsonObj, callSucc, callFail) {
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
 * 让fetch也可以timeout
 *  timeout不是请求连接超时的含义，它表示请求的response时间，包括请求的连接、服务器处理及服务器响应回来的时间
 * fetch的timeout即使超时发生了，本次请求也不会被abort丢弃掉，它在后台仍然会发送到服务器端，只是本次请求的响应内容被丢弃而已
 * @param {Promise} fetch_promise    fetch请求返回的Promise
 * @param {number} [timeout=10000]   单位：毫秒，这里设置默认超时时间为10秒
 * @return 返回Promise
 */
function timeout_fetch(fetch_promise, timeout = 30000) {
    let timeout_fn = null;

    //这是一个可以被reject的promise
    let timeout_promise = new Promise(function (resolve, reject) {
        timeout_fn = function () {
            reject('timeout promise');
        };
    });

    //这里使用Promise.race，以最快 resolve 或 reject 的结果来传入后续绑定的回调
    let abortable_promise = Promise.race([
        fetch_promise,
        timeout_promise
    ]);

    setTimeout(function () {
        timeout_fn();
    }, timeout);

    return abortable_promise;
}

//普通网络请求参数是JSON对象
//图片上传的请求参数使用的是formData对象
/**
 * 使用fetch实现图片上传
 * @param {string} url  接口地址
 * @param {JSON} params body的请求参数
 * @return 返回Promise
 * post提交的请求，网络请求失败的话肯定是数据问题，因为这都没走进服务器
 */
function uploadImage(paramsObj) {
    return Promise.all([getUserId(), getToken()])
        .then(ret => {
            let nowDate = Date.parse(new Date().toDateString());
            let signatureStr = TokenSha1.signature(ret[0], nowDate, ret[1]);
            let xToken = `code=${ret[0]};timestamp=${nowDate};signature=${signatureStr}`;
            let header = {
                "Content-Type": "multipart/form-data;charset=utf-8",
                "X-Token": xToken
            };
            return header
        }).then((header) => {
            return new Promise(function (resolve, reject) {
                let formData = new FormData();
                for (let key in paramsObj) {
                    formData.append(key, paramsObj[key]);
                }
                //在FormData中直接传递字节流实现上传图片的功能
                let file = {
                    uri: paramsObj.fileUrl,
                    type: 'multipart/form-data',
                    name: paramsObj.fileName
                };
                formData.append("file", file);
                console.log(Constants.upUrl)
                fetch(Constants.upUrl, {
                    method: 'POST',
                    headers: header,
                    body: formData,
                }).then((response) => response.json())
                    .then((responseData) => {
                        console.log('uploadImage', responseData);
                        resolve(responseData);
                    })
                    .catch((err) => {
                        console.log('err', err);
                        reject(err);
                    });
            });
        })
}

//     注意：由于后台服务器配置的不同，
// let file = {uri: params.path, type: 'application/octet-stream', name: 'image.jpg'}中的type也可能是multipart/form-data
//     formData.append("file", file)中的的file字段也可能是images

// let formData = new FormData();
// formData.append('file', {
//     uri: '',
//     name: fileName,
//     type: 'image/jpeg'
// });
// Object.keys(params).forEach((key)=> {
//     if (params[key] instanceof Date) {
//         formData.append(key, value.toISOString())
//     } else {
//         formData.append(key, String(params[key]))
//     }
// });


export {
    fetchRequest,
    uploadImage,
    postJsonImgCode,
};


// let params = {
//     username:'admin',
//     password:'123456'
// };
// fetchRequest('app/signin','POST',params)
//     .then( res=>{
//         //请求成功
//         if(res.header.statusCode == 'success'){
//             //这里设定服务器返回的header中statusCode为success时数据返回成功
//
//         }else{
//             //服务器返回异常，设定服务器返回的异常信息保存在 header.msgArray[0].desc
//             console.log(res.header.msgArray[0].desc);
//         }
//     }).catch( err=>{
//     //请求失败
// });

// let params = {
//     userId:'abc12345',   //用户id
//     path:'file:///storage/emulated/0/Pictures/image.jpg'    //本地文件地址
// }
// uploadImage('app/uploadFile',params )
//     .then( res=>{
//         //请求成功
//         if(res.header.statusCode == 'success'){
//             //这里设定服务器返回的header中statusCode为success时数据返回成功
//             upLoadImgUrl = res.body.imgurl;  //服务器返回的地址
//         }else{
//             //服务器返回异常，设定服务器返回的异常信息保存在 header.msgArray[0].desc
//             console.log(res.header.msgArray[0].desc);
//         }
//     }).catch( err=>{
//     //请求失败
// })
