/**
 * Created by PVer on 2018/7/15.
 */
import {createAction} from 'redux-actions'
import * as HttpUtil from '../net/HttpUtils'
import {LOGIN} from '../store/type'
import Toast from "teaset/components/Toast/Toast"
import SHA1Util from "../utils/SHA1Util";

// {
//     "lookupName": "AUTHENTICATION_STATUS",
//     "lookupKey": "0",
//     "lookupValue": "审核中"
// }
const getMemberDictionary = () => async (dispatch, getState) => {
    let service = '/dictionary/member'
    let response = await HttpUtil.fetchRequest(service, 'GET')
        .then(json => {
            if (json.code === '000000') {
                console.log('获取member字典正常')
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
                        gStorage.save(newName, lookupKey, temp)
                    } else {
                        gStorage.save(lookupName, lookupKey, temp)
                    }
                }
            } else {
                Toast.message('获取数据字典异常')
            }
        }).catch()
    return response
}

const getMemberDictionary2 = () => {
    let service = '/dictionary/member'
    return dispatch => {
        HttpUtil.fetchRequest(service, 'GET')
            .then(json => {
                if (json.code === '000000') {
                    console.log('获取member字典正常')
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
                            gStorage.save(newName, lookupKey, temp)
                        } else {
                            gStorage.save(lookupName, lookupKey, temp)
                        }
                    }
                } else {
                    Toast.message('获取数据字典异常')
                }
            }).catch()
    }
}


const getDcLotDictionary = () => async (dispatch, getState) => {
    let service = '/dictionary/dclot'
    return HttpUtil.fetchRequest(service, 'GET')
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
                        gStorage.save(newName, lookupKey, temp)
                    } else {
                        gStorage.save(lookupName, lookupKey, temp)
                    }
                }
            } else {
                Toast.message('获取数据字典异常')
            }
        }).catch()
}


/**
 * 用户登录
 * @param username
 * @param password 登录方式 0-验证码， 1-登录密码
 * @param loginType
 * @returns {function(*)}
 */
const userLogin = (username, password, loginType) => async (dispatch, getState) => {
    let service = '/member/login'
    if (loginType === 1) {
        //密码登录
        let params = {
            userCode: username,
            pwd: password,
            clientId: '',
            type: 1,
        }
        dispatch(createAction(LOGIN.ING)())
        let response = await HttpUtil.fetchRequest(service, 'POST', params)
            .then(json => {
                if (json.code === "000000") {
                    dispatch(createAction(LOGIN.DONG)(json.data))
                    let data = json.data
                    gStorage.saveKey('id', data.id)
                    gStorage.saveKey('token', data.token)
                    gStorage.saveKey('userCode', data.userCode)
                    return {
                        result: true,
                        data: json.data,
                        code: json.code,
                        msg: json.msg,
                    }
                } else {
                    dispatch(createAction(LOGIN.ERROR)(json.msg))
                    return {
                        result: false,
                        data: json.data,
                        code: json.code,
                        msg: json.msg,
                    }
                }
            })
            .catch(error => dispatch(createAction(LOGIN.ERROR)(error)))
        return response
    } else if (loginType === 0) {
        //验证码登录
        let params = {
            userCode: username,
            clientId: '',
            type: 0,
        }
        dispatch(createAction(LOGIN.ING)())
        let response = await HttpUtil.fetchRequest(service, 'POST', params)
            .then(json => {
                if (json.code === "000000") {
                    dispatch(createAction(LOGIN.DONG)(json.data))
                } else {
                    dispatch(createAction(LOGIN.ERROR)(json.msg))
                }
            })
            .catch(error => dispatch(createAction(LOGIN.ERROR)(error)))
        return response
    }

}


/**
 * 登录获取验证码(验证码登录)
 * @private
 */
const userLoginVerificationCode = (userCode) => async (dispatch, getState) => {
    let service = '/member/login_verification_code'
    let params = {
        userCode: userCode,
    }
    let response = await HttpUtil.fetchRequest(service, 'POST', params)
        .then(json => {
            if (json.code === "000000") {
                Toast.message('获取验证码成功')
                let isShowImgCode = json.data
                return {
                    data: isShowImgCode,
                }
            } else {
                Toast.message(json.msg)
            }
        })
        .catch(err => {
        })
    return response
}

/**
 * 登录获取验证码含图形验证码
 * @private
 */
const userAgainLoginVerificationCode = (params) => async (dispatch, getState) => {
    let service = '/member/login_verification_code'
    let response = await HttpUtil.fetchRequest(service, "POST", params)
        .then(json => {
            if (json.code === "000000") {
                Toast.message('获取验证码成功')
                return {
                    result: true,
                }
            } else {
                Toast.message(json.msg)
            }
        })
        .catch(err => {
        })
    return response
}


/**
 * 用户注册
 * @param params
 * @param callOk
 * @returns {Function}
 */
const userRegisterApp = (params) => async (dispatch, getState) => {
    let service = '/member/register'
    let response = await HttpUtil.fetchRequest(service, "POST", params)
        .then(json => {
            if (json.code === "000000") {
                //注册成功登录
                return {
                    result: true
                }
            } else {
                Toast.message(json.msg)
            }
        })
        .catch(err => {
        })
    return response
}

/**
 * 用户重置登录密码
 * @param params
 * @param callOk
 * @returns {Function}
 */
const userResetLoginPwd = (params) => async (dispatch, getState) => {
    let service = '/member/reset_login_pwd'
    let response = await HttpUtil.fetchRequest(service, "POST", params)
        .then(json => {
            if (json.code === "000000") {
                return {
                    result: true
                }
            } else {
                Toast.message(json.msg)
            }
        })
        .catch(err => {
        })
    return response
}


/**
 * 重置获取验证码--附带图形验证码请求验证码
 * @param userCode
 * @param sessionId
 * @param verifyCode
 * @returns {Function}
 */
const toResetRegisterVerificationCode = (userCode, sessionId, verifyCode) => async (dispatch, getState) => {
    let service = '/member/reset_verification_code'
    let params = {
        userCode: userCode,
        sessionId: sessionId,
        verifyCode: verifyCode,
    }
    let response = await HttpUtil.fetchRequest(service, "POST", params)
        .then(json => {
            if (json.code === "000000") {
                Toast.message('获取验证码成功')
            } else {
                Toast.message(json.msg)
            }
        })
        .catch(err => {
        })
    return response
}

/**
 * 重置获取验证码(忘记密码)
 * @param userPhone
 * @returns {function(*, *): T}
 */
const userResetYzm = (userPhone) => async (dispatch, getState) => {
    let service = '/member/reset_verification_code'
    let params = {
        userCode: userPhone,
    }
    let response = await HttpUtil.fetchRequest(service, 'POST', params)
        .then(json => {
            if (json.code === "000000") {
                Toast.message('获取验证码成功')
                let isShowImgCode = json.data
                return {
                    result: isShowImgCode
                }
            } else {
                Toast.message(json.msg)
            }
        })
        .catch(err => {
        })
    return response
}

/**
 * 注册获取验证码
 * @param userCode
 * @returns {function(*, *): T}
 */
const getRegisterVerificationCode = (userCode) => async (dispatch, getState) => {
    let service = '/member/register_verification_code'
    let params = {
        userCode: userCode,
    }
    let response = await HttpUtil.fetchRequest(service, 'POST', params)
        .then(json => {
            if (json.code === "000000") {
                Toast.message('获取验证码成功')
                let isShowImgCode = json.data
                return {
                    result: isShowImgCode
                }
            } else {
                Toast.message(json.msg)
            }
        })
        .catch(err => {
        })
    return response
}

/**
 * 注册附带图形验证码请求验证码
 * @param userCode
 * @param sessionId
 * @param verifyCode
 * @returns {function(*, *): T}
 */
const toAgainRegisterVerificationCode = (userCode, sessionId, verifyCode) => async (dispatch, getState) => {
    let service = '/member/register_verification_code'
    let params = {
        userCode: userCode,
        sessionId: sessionId,
        verifyCode: verifyCode,
    }
    let response = await HttpUtil.fetchRequest(service, "POST", params)
        .then(json => {
            if (json.code === "000000") {
                Toast.message('获取验证码成功')
            } else {
                Toast.message(json.msg)
            }
        })
        .catch(err => {
        })
    return response
}


export {
    getMemberDictionary,
    getDcLotDictionary,
    userRegisterApp,
    userResetLoginPwd,
    userLogin,
    userAgainLoginVerificationCode,
    userLoginVerificationCode,
    toResetRegisterVerificationCode,
    userResetYzm,
    toAgainRegisterVerificationCode,
    getRegisterVerificationCode,
}
