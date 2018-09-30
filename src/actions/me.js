/**
 * Created by PVer on 2018/7/22.
 */

import {createAction} from 'redux-actions'
import * as HttpUtil from '../net/HttpUtils'
import {ME, MODIFY, DETAIL} from '../store/type'
import Toast from "teaset/components/Toast/Toast"
import SHA1Util from "../utils/SHA1Util";

/**
 * 查询用户信息
 * @param userId
 * @param callSucc
 * @param callFail
 */
const getQueryUerInfo = (userId) => async (dispatch, getState) => {
    // let service = `/member/detail?userId=${userId}`;
    let service = `/mine?userId=${userId}`
    dispatch(createAction(ME.ING)())
    let response = await HttpUtil.fetchRequest(service, 'GET')
        .then(json => {
            if (json.code === "000000") {
                dispatch(createAction(ME.DONG)(json.data))
            } else {
                dispatch(createAction(ME.ERROR)(json.msg))
            }
        })
        .catch(err => dispatch(createAction(ME.ERROR)(err)))
    return response
}

/**
 * 修改昵称
 * @returns {function(*)}
 * @param userId
 * @param nickName
 * @param callOk
 */
function toResetNickName(userId, nickName, callOk) {
    return dispatch => {
        let service = '/member/change'
        let params = {
            userId: userId,
            nickName: nickName,
        }
        HttpUtil.fetchRequest(service, "POST", params)
            .then(json => {
                if (json.code === "000000") {
                    Toast.message('昵称设置成功')
                    //关闭相关页面,刷新我的和用户信息页面
                    dispatch(createAction(MODIFY.NAME)(nickName))
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
 * 修改性别
 * @param userId
 * @param sex
 * @returns {function(*)}
 */
function toResetUserSex(userId, sex) {
    return dispatch => {
        let service = '/member/change'
        let params = {
            userId: userId,
            sex: sex,
        };
        HttpUtil.fetchRequest(service, "POST", params)
            .then(json => {
                if (json.code === "000000") {
                    Toast.message('性别设置成功')
                    dispatch(createAction(MODIFY.SEX)(sex))
                } else {
                    Toast.message(json.msg)
                }
            })
            .catch(err => {
            })
    }
}

/**
 * 修改头像
 * @param userId
 * @param userPic
 * @returns {function(*)}
 */
function toResetUserPic(userId, userPic) {
    return dispatch => {
        let service = '/member/change'
        let params = {
            userId: userId,
            userPic: userPic,
        };
        HttpUtil.fetchRequest(service, "POST", params)
            .then(json => {
                if (json.code === "000000") {
                    Toast.message('头像设置成功')
                    dispatch(createAction(MODIFY.AVATAR)(userPic))
                } else {
                    Toast.message(json.msg)
                }
            })
            .catch(err => {
            })
    }
}

/**
 * 设置支付密码
 * @param userId
 * @param payPwd
 */
function toRequestPayPwd(userId, payPwd) {
    let service = '/member/set_pay_pwd'
    let params = {
        userId: userId,
        payPwd: payPwd
    }
    return dispatch => {
        HttpUtil.fetchRequest(service, 'POST', params)
            .then(json => {
                if (json.code === "000000") {
                    Toast.message('密码设置成功')
                } else {
                    Toast.message(json.msg)
                }
            })
            .catch(err => {
            })
    }
}

/**
 * 是否自动付费
 * @param userId
 * @param isAuto
 */
const toRequestAutoPay = (userId, isAuto) => {
    let service = '/overage/is_auto'
    let params = {
        userId: userId,
        isAuto: isAuto
    }
    return dispatch => {
        HttpUtil.fetchRequest(service, 'POST', params)
            .then(json => {
                if (json.code === "000000") {
                    Toast.message('设置自动支付成功')
                } else {
                    Toast.message(json.msg)
                }
            })
            .catch(err => {
            })
    }
}

/**
 * 重置支付密码
 * @param userId
 * @param newPayPwd
 * @param msgPwd
 * @returns {Function}
 */
const toResetPayPwd = (userId, newPayPwd, msgPwd) => async (dispatch, getState) => {
    let service = '/member/reset_pay_pwd'
    let params = {
        userId: userId,
        newPayPwd: newPayPwd,//新支付密码
        msgPwd: msgPwd,// 验证码
    }
    let response = await HttpUtil.fetchRequest(service, 'POST', params)
        .then(json => {
            if (json.code === "000000") {
                Toast.message('支付密码重置成功')
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
 * 申请认证
 * @param params
 * @param callOk
 */
const toRequestCarApproval = (params, callOk) => {
    let service = '/vehicle/approval'
    return dispatch => {
        HttpUtil.fetchRequest(service, 'POST', params)
            .then(json => {
                if (json.code === "000000") {
                    Toast.message('申请认证成功')
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
 * 解绑车辆
 * @param userId
 * @param plate
 * @param plateColor
 */
const toRequestUnbindCar = (userId, plate, plateColor) => {
    let service = '/vehicle/unbind'
    let params = {
        userId: userId,
        plate: plate,
        plateColor: plateColor
    };
    return dispatch => {
        HttpUtil.fetchRequest(service, 'POST', params)
            .then(json => {
                if (json.code === "000000") {
                    Toast.message('解绑成功')
                } else {
                    Toast.message(json.msg)
                }
            })
            .catch(err => {
            })
    }
}


/**
 * 重置获取验证码
 * @param userPhone
 * @private
 */
const userResetPayVerificationCode = (userCode) => async (dispatch, getState) => {
    let service = '/member/reset_verification_code'
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
 * 重置获取验证码附带图形验证码
 * @private
 */
const userResetImgPayVerificationCode = (userCode, sessionId, verifyCode) => async (dispatch, getState) => {
    let service = '/member/reset_verification_code'
    let sha1_result = SHA1Util.hex_sha1(this.newUuid)
    let params = {
        userCode: userCode,
        sessionId: sha1_result,
        verifyCode: this.state.imgCode,
    }
    let response = await HttpUtil.fetchRequest(service, 'POST', params)
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
 * 上传
 * @param fileUrl
 * @param fileName
 * @param callOk
 */
function onFileUpload(fileUrl, fileName, callOk) {
    return dispatch => {
        let paramsObj = {
            fileUrl: fileUrl,
            fileName: fileName
        }
        HttpUtil.uploadImage(paramsObj)
            .then(json => {
                console.log('文件上传ok--------->' + json)
                callOk()
            })
            .catch(err => {
                Toast.message('文件上传失败')
                console.log('文件上传err--------->' + err)
            })
    }
}

export {
    getQueryUerInfo,
    toResetNickName,
    toResetUserPic,
    toResetUserSex,
    toRequestPayPwd,
    toRequestAutoPay,
    toResetPayPwd,
    toRequestCarApproval,
    toRequestUnbindCar,
    userResetPayVerificationCode,
    userResetImgPayVerificationCode,
    onFileUpload,
}

