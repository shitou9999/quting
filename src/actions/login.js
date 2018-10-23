/**
 * Created by PVer on 2018/7/15.
 */
import {createAction} from 'redux-actions'
import * as HttpUtil from '../net/HttpUtils'
import {LOGIN} from '../store/type'
import Toast from "teaset/components/Toast/Toast"
import Api from '../net/Api'

const getMemberDictionary = () => async (dispatch, getState) => {
    let service = '/dictionary/member'
    let response = await HttpUtil.fetchRequest(service)
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
        HttpUtil.fetchRequest(service)
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
    return HttpUtil.fetchRequest(service)
        .then(json => {
            if (json.code === '000000') {
                console.log('获取dclot字典正常')
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

const getDcRoadDictionary = () => async (dispatch, getState) => {
    let service = '/dictionary/dcroad'
    return HttpUtil.fetchRequest(service)
        .then(json => {
            if (json.code === '000000') {
                console.log('获取dcroad字典正常')
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
        let response = await Api.toRequest(service, 'POST', params)
        if (response.result) {
            let data = response.data
            gStorage.saveKey('id', data.id)
            gStorage.saveKey('token', data.token)
            gStorage.saveKey('userCode', data.userCode)
            dispatch(createAction(LOGIN.DONG)(response.data))
        } else {
            dispatch(createAction(LOGIN.ERROR)(response.msg))
        }
        return response
    } else if (loginType === 0) {
        //验证码登录
        let params = {
            userCode: username,
            pwd: password,
            clientId: '',
            type: 0,
        }
        dispatch(createAction(LOGIN.ING)())
        // let response = await HttpUtil.fetchRequest(service, 'POST', params)
        //     .then(json => {
        //         if (json.code === "000000") {
        //             dispatch(createAction(LOGIN.DONG)(json.data))
        //         } else {
        //             dispatch(createAction(LOGIN.ERROR)(json.msg))
        //         }
        //     })
        //     .catch(error => dispatch(createAction(LOGIN.ERROR)(error)))
        let response = await Api.toRequest(service, 'POST', params)
        if (response.result) {
            dispatch(createAction(LOGIN.DONG)(response.data))
        } else {
            dispatch(createAction(LOGIN.ERROR)(response.msg))
        }
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
    let response = await Api.toRequest(service, 'POST', params)
    return response
}

/**
 * 登录获取验证码含图形验证码
 * @private
 */
const userAgainLoginVerificationCode = (params) => async (dispatch, getState) => {
    let service = '/member/login_verification_code'
    let response = await Api.toRequest(service, "POST", params)
    return response
}

/**
 * 获取图形验证码
 * @param sessionId
 * @param random
 * @returns {function()}
 */
const getImageCode = (sessionId, random) => async () => {
    let service = '/member/verify_code'
    let params = {
        sessionId: sessionId,
        random: random,
    }
    let response = await HttpUtil.postJsonImgCode(service, params)
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
    let response = await Api.toRequest(service, "POST", params)
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
    let response = await Api.toRequest(service, "POST", params)
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
    let response = await Api.toRequest(service, "POST", params)
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
    let response = await Api.toRequest(service, 'POST', params)
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
    let response = await Api.toRequest(service, 'POST', params)
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
    let response = await Api.toRequest(service, "POST", params)
    if (response && response.result) {
        Toast.message('获取验证码成功')
    } else {
        Toast.message(response.msg)
    }
    return response
}


export {
    getMemberDictionary,
    getDcLotDictionary,
    getDcRoadDictionary,
    userRegisterApp,
    userResetLoginPwd,
    userLogin,
    userAgainLoginVerificationCode,
    userLoginVerificationCode,
    toResetRegisterVerificationCode,
    userResetYzm,
    toAgainRegisterVerificationCode,
    getRegisterVerificationCode,
    getImageCode,
}
