/**
 * Created by PVer on 2018/7/22.
 */

import {createAction} from 'redux-actions'
import * as HttpUtil from '../net/HttpUtils'
import {ME, MODIFY, DETAIL, LOGIN} from '../store/type'
import Toast from "teaset/components/Toast/Toast"
import SHA1Util from "../utils/SHA1Util";
import BeeUtil from "../utils/BeeUtil";
import Api from "../net/Api";

/**
 * 查询用户信息
 * @param userId
 * @return {function(*, *): *}
 */
const getQueryUerInfo = (userId) => async (dispatch, getState) => {
    // let service = `/member/detail?userId=${userId}`;
    let service = `/mine?userId=${userId}`
    dispatch(createAction(ME.ING)())
    let response = await Api.toRequest(service, 'GET')
    if (response.result) {
        dispatch(createAction(ME.DONG)(response.data))
    } else {
        dispatch(createAction(ME.ERROR)(response.msg))
    }
    return response
}

/**
 * 修改昵称
 * @param userId
 * @param nickName
 * @return {function(*, *): *}
 */
const toResetNickName = (userId, nickName) => async (dispatch, getState) => {
    let service = '/member/change'
    let params = {
        userId: userId,
        nickName: nickName,
    }
    let response = await Api.toRequest(service, "POST", params)
    if (response.result) {
        //关闭相关页面,刷新我的和用户信息页面
        dispatch(createAction(MODIFY.NAME)(nickName))
    } else {
        Toast.message(response.msg)
    }
    return response
}

/**
 * 修改性别
 * @param userId
 * @param sex
 * @return {function(*, *): *}
 */
const toResetUserSex = (userId, sex) => async (dispatch, getState) => {
    let service = '/member/change'
    let params = {
        userId: userId,
        sex: sex,
    }
    let response = await Api.toRequest(service, "POST", params)
    if (response.result) {
        Toast.message('性别设置成功')
        dispatch(createAction(MODIFY.SEX)(sex))
    }
    return response
}

/**
 * 修改头像
 * @param userId
 * @param userPic
 * @return {function(*, *): *}
 */
const toResetUserPic = (userId, userPic) => async (dispatch, getState) => {
    let service = '/member/change'
    let params = {
        userId: userId,
        userPic: userPic,
    }
    let response = await Api.toRequest(service, "POST", params)
    if (response.result) {
        dispatch(createAction(MODIFY.AVATAR)(userPic))
    }
    return response
}

const toModifyLoginPwd = (userId, oldPwd, newPwd) => async (dispatch, getState) => {
    let service = '/member/change_login_pwd'
    let params = {
        userId: userId,
        oldPwd: oldPwd,
        newPwd: newPwd,
    };
    let response = await Api.toRequest(service, "POST", params)
    return response
}

/**
 * 设置支付密码
 * @param userId
 * @param payPwd
 */
const toRequestPayPwd = (userId, payPwd) => async (dispatch, getState) => {
    let service = '/member/set_pay_pwd'
    let params = {
        userId: userId,
        payPwd: payPwd
    }
    let response = await Api.toRequest(service, 'POST', params)
    return response
}

/**
 * 是否自动付费
 * @param userId
 * @param isAuto
 */
const toRequestAutoPay = (userId, isAuto) => async (dispatch, getState) => {
    let service = '/overage/is_auto'
    let params = {
        userId: userId,
        isAuto: isAuto
    }
    let response = await Api.toRequest(service, 'POST', params)
    return response
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
    let response = await Api.toRequest(service, 'POST', params)
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
const toRequestUnbindCar = (userId, plate, plateColor) => async (dispatch, getState) => {
    let service = '/vehicle/unbind'
    let params = {
        userId: userId,
        plate: plate,
        plateColor: plateColor
    }
    let response = await Api.toRequest(service, 'POST', params)
    return response
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
    let response = await Api.toRequest(service, 'POST', params)
    return response
}

/**
 * 重置获取验证码附带图形验证码
 * @private
 */
const userResetImgPayVerificationCode = (userCode, sessionId, verifyCode) => async (dispatch, getState) => {
    let service = '/member/reset_verification_code'
    let params = {
        userCode: userCode,
        sessionId: sessionId,
        verifyCode: verifyCode,
    }
    let response = await Api.toRequest(service, 'POST', params)
    return response
}


const getVehicleList = userId => async (dispatch, getState) => {
    let service = `/vehicle/list?userId=${userId}`
    let response = await Api.toRequest(service)
    return response
}

/**
 * 绑定
 * @returns {Function}
 */
const toBindCar = num => async (dispatch, getState) => {
    dispatch(createAction(MODIFY.BIND)(num))
}


/**
 * 解绑
 * @returns {Function}
 */
const toUnBindCar = num => async (dispatch, getState) => {
    dispatch(createAction(MODIFY.UNBIND)(num))
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
    toModifyLoginPwd,
    toResetPayPwd,
    toRequestCarApproval,
    toRequestUnbindCar,
    userResetPayVerificationCode,
    userResetImgPayVerificationCode,
    getVehicleList,
    toBindCar,
    toUnBindCar,
    onFileUpload,
}

