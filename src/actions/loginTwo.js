/**
 * Created by PVer on 2018/7/15.
 */
import {createAction} from 'redux-actions'
import * as HttpUtil from '../net/HttpUtils'
import {LOGIN} from '../store/type'
import Toast from "teaset/components/Toast/Toast"

// {
//     "lookupName": "AUTHENTICATION_STATUS",
//     "lookupKey": "0",
//     "lookupValue": "审核中"
// }
const getMemberDictionary = () => async (dispatch, getState) => {
    let service = '/dictionary/member'
    return HttpUtil.fetchRequest(service, 'GET')
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
        let params = {
            userCode: username,
            pwd: password,
            clientId: '',
            type: 1,
        }
        dispatch(createAction(LOGIN.ING)())
        return HttpUtil.fetchRequest(service, 'POST', params)
            .then(json => {
                if (json.code === "000000") {
                    dispatch(createAction(LOGIN.DONG)(json.data))
                    let data = json.data
                    gStorage.saveKey('id', data.id)
                    gStorage.saveKey('token', data.token)
                    gStorage.saveKey('userCode', data.userCode)
                } else {
                    dispatch(createAction(LOGIN.ERROR)(json.msg))
                }
            })
            .catch(error => dispatch(createAction(LOGIN.ERROR)(error)));
    } else if (loginType === 0) {
        let params = {
            userCode: username,
            clientId: '',
            type: 0,
        }
        dispatch(createAction(LOGIN.ING)())
        return HttpUtil.fetchRequest(service, 'POST', params)
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


/**
 * 登录获取验证码(验证码登录)
 * @private
 */
const userLoginVerificationCode = (userCode, callOk) => {
    let service = '/member/login_verification_code'
    let params = {
        userCode: userCode,
    }
    return dispatch => {
        HttpUtil.fetchRequest(service, 'POST', params)
            .then(json => {
                if (json.code === "000000") {
                    Toast.message('获取验证码成功')
                    let isShowImgCode = json.data
                    callOk(isShowImgCode)
                } else {
                    Toast.message(json.msg)
                }
            })
            .catch(err => {
            })
    }
}

/**
 * 登录获取验证码含图形验证码
 * @private
 */
const userAgainLoginVerificationCode = (params, callOk) => {
    let service = '/member/login_verification_code'
    return dispatch => {
        HttpUtil.fetchRequest(service, "POST", params)
            .then(json => {
                if (json.code === "000000") {
                    Toast.message('获取验证码成功')
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
    userAgainLoginVerificationCode,
    userLoginVerificationCode,
}
