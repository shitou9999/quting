/**
 * Created by PVer on 2018/7/17.
 */
import Toast from 'teaset/components/Toast/Toast'
import TokenSha1 from '../utils/TokenSha1Util'
import * as Constants from '../constants/Constants'

/***
 * 和原应用存key不同！！！！！！！！！！
 */

//包装成一个Promise实例，成功反数组，失败反最先被reject失败状态的值
const getHttpHeader = async (flag = true) => {
    let userId = await gStorage.load('id', id => id)
    let token = await gStorage.load('token', token => token)
    // let ret = await Promise.all([getUserId(), getToken()])
    let nowDate = Date.parse(new Date().toDateString())
    let signatureStr = TokenSha1.signature(userId, nowDate, token)
    let xToken = `code=${userId};timestamp=${nowDate};signature=${signatureStr}`
    if (flag) {
        let header = {
            "Content-Type": "application/json;charset=UTF-8",
            "X-Token": xToken,
        }
        return header
    } else {
        let header = {
            "X-Token": xToken,
        }
        return header
    }
}

//https://blog.csdn.net/withings/article/details/71331726

/**
 *
 * @param url 接口地址
 * @param method 请求方法：GET、POST，只能大写
 * @param params {JSON} [params=''] body的请求参数，默认为空
 * @returns {Promise<*>}
 */
const fetchRequest = async (url, method = 'GET', params = null) => {
    let header = await getHttpHeader()
    if (__DEV__) {
        console.log(header)
        console.log('request url:', url, params)
    }
    let requestUrl = `${Constants.baseUrl}${url}`
    let body = null
    if (method === 'GET') {
        if (params != null) {
            let paramsArray = []
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + encodeURIComponent(params[key])));
            if (url.indexOf('?') === -1) {
                url += '?' + paramsArray.join('&')
            } else {
                url += '&' + paramsArray.join('&')
            }
        }
    } else {
        //let params = {"name":"admin","password":"admin"};
        //body: JSON.stringify(params)
        body = JSON.stringify(params)   //body参数，通常需要转换成字符串后服务器才能解析
    }
    return Promise.race([new Promise((resolve, reject) => {
        fetch(requestUrl, {
            method: method,
            headers: header,
            body: body
        }).then(response => {
            if (response.ok) {
                return response.json()
            } else {
                reject({code: response.status, msg: `服务器返回信息错误:${response._bodyText}`})
            }
        }).then(responseJson => {
            if (__DEV__) {
                console.log('res:', url, responseJson)
            }
            resolve(responseJson)
        }).catch(err => {
            if (__DEV__) {
                console.log('err:', url, err)
            }
            reject(err)
            // reject({code: -1, msg: `fetch进入catch:${JSON.stringify(err)}`})
        }).finally(() => {
            // loadingParams.show && LoadingUtils.hide();
        })
    }), new Promise((resolve, reject) => {
        setTimeout(() => {
            // loadingParams.show && LoadingUtils.hide();
            reject({code: -1, msg: `${url}请求超时`})
        }, 30 * 1000)
    })])
}


/**
 * 获取图形验证码
 * @param url
 * @param jsonObj
 * @param callSucc
 */
const postJsonImgCode = (url, jsonObj, callSucc) => {
    let requestUrl = `${Constants.baseUrl}${url}`
    let bodyStr = JSON.stringify(jsonObj)
    if (__DEV__) {
        console.log('请求url: ', requestUrl)
        console.log('请求bodyStr: ', bodyStr)
    }
    return new Promise((resolve, reject) => {
        fetch(requestUrl, {
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
                    resolve(e.target.result)
                }
                reader.readAsDataURL(responseText);
            })
            .catch(error => {
                Toast.fail(error.toString())
                resolve(error)
            })
    })
}

/**
 * 让fetch也可以timeout
 *  timeout不是请求连接超时的含义，它表示请求的response时间，包括请求的连接、服务器处理及服务器响应回来的时间
 * fetch的timeout即使超时发生了，本次请求也不会被abort丢弃掉，它在后台仍然会发送到服务器端，只是本次请求的响应内容被丢弃而已
 * @param {Promise} fetchPromise    fetch请求返回的Promise
 * @param {number} [timeout=10000]   单位：毫秒，这里设置默认超时时间为10秒
 * @return 返回Promise
 */
function timeoutFetch(fetchPromise, timeout = 30000) {
    let timeoutBlock = null

    //这是一个可以被reject的promise
    let timeoutPromise = new Promise((resolve, reject) => {
        timeoutBlock = () => {
            reject('timeout promise')
        }
    })

    //这里使用Promise.race，以最快 resolve 或 reject 的结果来传入后续绑定的回调
    let abortivePromise = Promise.race([fetchPromise, timeoutPromise]);

    setTimeout(function () {
        timeoutBlock()
    }, timeout)

    return abortivePromise
}


/**
 * 使用fetch实现图片上传
 * 普通网络请求参数是JSON对象
 * 图片上传的请求参数使用的是formData对象
 * @param paramsObj
 * @returns {Promise<*>}
 * post提交的请求，网络请求失败的话肯定是数据问题，因为这都没走进服务器
 */
const uploadImage = async (paramsObj) => {
    let header = await getHttpHeader(false)
    let upUrl = Constants.upUrl
    return new Promise((resolve, reject) => {
        let formData = new FormData();
        for (let key in paramsObj) {
            formData.append(key, paramsObj[key]);
        }
        //在FormData中直接传递字节流实现上传图片的功能
        let file = {
            uri: paramsObj.fileUrl,
            type: 'multipart/form-data',
            name: paramsObj.fileName
        }
        formData.append("file", file);
        if (__DEV__) {
            console.log(upUrl)
        }
        fetch(upUrl, {
            method: 'POST',
            headers: header,
            body: formData,
        }).then((response) => response.json())
            .then((responseData) => {
                if (__DEV__) {
                    console.log('uploadImage', responseData)
                }
                resolve(responseData)
            })
            .catch((err) => {
                if (__DEV__) {
                    console.log('err', err)
                }
                reject(err)
            });
    });
}

export {
    fetchRequest,
    uploadImage,
    postJsonImgCode,
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
