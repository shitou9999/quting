/**
 * Created by PVer on 2018/7/22.
 */

import {createAction} from 'redux-actions'
import * as HttpUtil from '../net/HttpUtils'
import {ME, MODIFY, UP} from '../store/type'
import Toast from "teaset/components/Toast/Toast";

/**
 * 查询用户信息
 * @param userId
 */
function getQueryUerInfo(userId, callSucc, callFail) {
    // let service = `/member/detail?userId=${userId}`;
    let service = `/mine?userId=${userId}`
    return dispatch => {
        dispatch(createAction(ME.ING)())
        HttpUtil.fetchRequest(service, 'GET')
            .then(json => {
                if (json.code === "000000") {
                    dispatch(createAction(ME.DONG)(json.data))
                    callSucc()
                } else {
                    dispatch(createAction(ME.ERROR)(json.msg))
                    callFail(json.msg)
                }
            })
            .catch(err => {
                dispatch(createAction(ME.ERROR)(err))
                callFail(err)
            })
    }
}

/**
 * 修改昵称
 * @param userNickName
 * @returns {function(*)}
 */
function toResetNickName(userId, nickName, callOk) {
    return dispatch => {
        let service = '/member/change'
        let params = {
            userId: userId,
            nickName: nickName,
        };
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
 * @param sex
 * @returns {function(*)}
 */
function toResetUserSex(userId,sex) {
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
 * @param userPic
 * @returns {function(*)}
 */
function toResetUserPic(userId,userPic) {
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
 * 上传
 * @param params
 * @param file
 * @param fileName
 */
function onFileUpload(fileUrl, fileName,callOk) {
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
    onFileUpload,
}

