/**
 * Created by PVer on 2018/7/22.
 */

import {createAction} from 'redux-actions';
import NetUtil from '../net/NetUtils';
import * as HttpUtil from '../net/HttpUtils';
import {ME, UP} from '../store/type';

/**
 * 查询用户信息
 * @param userId
 */
function getQueryUerInfo(userId, callSucc, callFail) {
    let service = `/member/detail?userId=${userId}`;
    return dispatch => {
        dispatch(createAction(ME.ING)());
        HttpUtil.fetchRequest(service, 'GET')
            .then(json => {
                if (json.code === "000000") {
                    dispatch(createAction(ME.DONG)(json.data));
                    callSucc()
                } else {
                    dispatch(createAction(ME.ERROR)(json.msg));
                    callFail(json.msg)
                }
            })
            .catch(err => {
                dispatch(createAction(ME.ERROR)(err));
                callFail(err)
            })
    }
}

/**
 * 修改昵称
 * @param userNickName
 * @returns {function(*)}
 */
function toResetNickName(userNickName) {
    return dispatch => {
        dispatch(createAction(ME.MODIFY_NAME)(userNickName));
    }
}

/**
 * 头像上传
 * @param params
 * @param file
 * @param fileName
 */
function onFileUpload(params, file, fileName) {
    return dispatch => {
        let params = {
            userId: 'abc12345',
            path: 'file:///storage/emulated/0/Pictures/image.jpg'
        }
        HttpUtil.uploadImage('/upload.do?file=', params)
            .then(json => {
                dispatch(createAction(UP.DONG)(json));
            })
            .catch(err => {
                dispatch(createAction(UP.ERROR)(err));
            })
    }
}

export {
    getQueryUerInfo,
    toResetNickName,
    onFileUpload,
}

