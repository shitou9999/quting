/**
 * Created by PVer on 2018/7/22.
 */

import {createAction} from 'redux-actions';
import NetUtil from '../net/NetUtils';
import * as HttpUtil from '../net/HttpUtils';
import {ME} from '../store/type';

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
    return dispatch =>{
        dispatch(createAction(ME.MODIFY_NAME)(userNickName));
    }
}


// signature = UcSignature.signature(
//     DataHelper.getStringSF(application, Constants.PREF_ID), st,
//     DataHelper.getStringSF(application, Constants.PREF_TOKEN));
// token = "code=" + DataHelper.getStringSF(application, Constants.PREF_ID)
//     + ";timestamp=" + st + ";signature=" + signature;

export {
    getQueryUerInfo,
    toResetNickName,
}

