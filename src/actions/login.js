/**
 * Created by PVer on 2018/7/15.
 */
import {createAction} from 'redux-actions'
import * as HttpUtil from '../net/HttpUtils'
import {LOGIN} from '../store/type'
import {storage} from '../utils/storage'
import Toast from "teaset/components/Toast/Toast"

// let url = 'http://beta..cc:32080/_app-inf';
// let service = '/member/login';
// let params = {
//     "userCode": "15669961385",
//     "pwd": "123456",
//     "type": "1" //登录方式 0-验证码， 1-登录密码
// };
// await NetUtils.postJson(url + service, service, params, (result) => {
//     Toast.success('result' + result);
// });

// return dispatch => {
//     dispatch(createAction(LOGIN.ING)());
//     NetUtil.postJson(url + service, null, {
//         userCode: username,
//         pwd: password,
//         type: 1,
//     }, (result) => {
//         dispatch(createAction(LOGIN.DONG)(result.data))
//     })
//     // .then(res => dispatch(createAction(LOGIN.DONG)(res.data)))
//         .catch(error => dispatch(createAction(LOGIN.ERROR)(error)))//catch有问题

const getMemberDictionary = () => {
    let service = '/dictionary/member'
    return dispatch => {
        HttpUtil.fetchRequest(service, 'GET')
            .then(json => {
                if (json.code === '000000') {
                    // let mapVo = new Map()
                    for (let index in json.data) {
                        let lookupName = json.data[index].lookupName
                        let lookupKey = json.data[index].lookupKey
                        let lookupValue = json.data[index].lookupValue
                        let temp = {
                            key: lookupKey,
                            value: lookupValue
                        }
                        if (lookupName.includes('_')) {
                            let newName = lookupName.replace(/_/g, '+')
                            // console.log(newName)
                            gStorage.storage.save(newName, lookupKey, temp)
                        } else {
                            gStorage.storage.save(lookupName, lookupKey, temp)
                        }
                    }
                } else {
                    Toast.message('获取数据字典异常')
                }
            }).catch()
    }
}


const getDcLotDictionary = () => {
    let service = '/dictionary/dclot'
    return dispatch => {
        HttpUtil.fetchRequest(service, 'GET')
            .then(json => {
                if (json.code === '000000') {
                    // let mapVo = new Map()
                    for (let index in json.data) {
                        let lookupName = json.data[index].lookupName
                        let lookupKey = json.data[index].lookupKey
                        let lookupValue = json.data[index].lookupValue
                        let temp = {
                            key: lookupKey,
                            value: lookupValue
                        }
                        if (lookupName.includes('_')) {
                            let newName = lookupName.replace(/_/g, '+')
                            // console.log(newName)
                            gStorage.storage.save(newName, lookupKey, temp)
                        } else {
                            gStorage.storage.save(lookupName, lookupKey, temp)
                        }
                    }
                } else {
                    Toast.message('获取数据字典异常')
                }
            }).catch()
    }
}


/**
 * 用户登录
 * @param username
 * @param password 登录方式 0-验证码， 1-登录密码
 * @param loginType
 * @returns {function(*)}
 */
function userLogin(username, password, loginType) {
    let service = '/member/login'
    if (loginType === 1) {
        let params = {
            userCode: username,
            pwd: password,
            clientId: '',
            type: 1,
        }
        return dispatch => {
            dispatch(createAction(LOGIN.ING)())
            HttpUtil.fetchRequest(service, 'POST', params)
                .then(json => {
                    if (json.code === "000000") {
                        dispatch(createAction(LOGIN.DONG)(json.data))
                        let data = json.data
                        console.log(data.id)
                        storage.save('user', 'PREF+ID', data.id)
                        storage.save('user', 'PREF+TOKEN', data.token)
                        storage.save('user', 'PREF+USERCODE', data.userCode)
                    } else {
                        dispatch(createAction(LOGIN.ERROR)(json.msg))
                    }
                })
                .catch(error => dispatch(createAction(LOGIN.ERROR)(error)));
        }
    } else if (loginType === 0) {
        let params = {
            userCode: username,
            clientId: '',
            type: 0,
        }
        return dispatch => {
            dispatch(createAction(LOGIN.ING)())
            HttpUtil.fetchRequest(service, 'POST', params)
                .then(json => {
                    if (json.code === "000000") {
                        dispatch(createAction(LOGIN.DONG)(json.data))
                    } else {
                        dispatch(createAction(LOGIN.ERROR)(json.msg))
                    }
                })
                .catch(error => dispatch(createAction(LOGIN.ERROR)(error)))
        }
    }

}


/**
 * 登录获取验证码(验证码登录)
 * @param userCode 手机号码
 * @param sessionId 会话ID-使用SHA1加签,
 * @param verifyCode 图形验证码
 */
function userLoginVerificationCode(userCode) {
    let service = '/member/login_verification_code'


}

/**
 * 获取图形验证码
 * @param sessionId 会话ID-使用SHA1加签,
 * @param random 随机码使用UUID|去除'-'连接符
 */
function getVerifyCode(sessionId, random) {
    let service = '/member/verify_code'


}

/**
 * 用户注册
 * @param params
 * @param callOk
 * @returns {Function}
 */
const userRegisterApp = (params, callOk) => {
    let service = '/member/register'
    return dispatch => {
        HttpUtil.fetchRequest(service, "POST", params)
            .then(json => {
                if (json.code === "000000") {
                    Toast.message('注册成功')
                    //注册成功登录
                    callOk()
                } else {
                    Toast.message(json.msg)
                }
            })
            .catch(err => {
            })
    }
}

/**
 * 用户重置登录密码
 * @param params
 * @param callOk
 * @returns {Function}
 */
const userResetLoginPwd = (params, callOk) => {
    let service = '/member/reset_login_pwd'
    return dispatch => {
        HttpUtil.fetchRequest(service, "POST", params)
            .then(json => {
                if (json.code === "000000") {
                    Toast.message('重置密码成功')
                    callOk()
                } else {
                    Toast.fail(json.msg)
                }
            })
            .catch(err => {
            })
    }
}


export {
    getMemberDictionary,
    getDcLotDictionary,
    userRegisterApp,
    userResetLoginPwd,
    userLogin,
    getVerifyCode,
    userLoginVerificationCode,
}
