/**
 * Created by PVer on 2018/7/22.
 */

import {createAction} from 'redux-actions'
import * as HttpUtil from '../net/HttpUtils'
import {ME, MODIFY, DETAIL} from '../store/type'
import Toast from "teaset/components/Toast/Toast"


/**
 * 申请实名认证
 * @param param
 * @param callOk
 */
const toAuthentication = (param) => async (dispatch, getState) => {
    let service = '/authentication/approval'
    let response = await HttpUtil.fetchRequest(service, 'POST', param)
        .then(json => {
            if (json.code === "000000") {
                //认证状态 0-审核中 1-审核通过 2-审核不通过（
                dispatch(createAction(MODIFY.AUTHENTICATION)('0'))
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
 * 获取实名认证信息
 * @param userId
 * @param callOk
 * @returns {Function}
 */
const getAuthentication = (userId) => async (dispatch, getState) => {
    let service = `/authentication?userId=${userId}`
    dispatch(createAction(DETAIL.ING)())
    let response = await HttpUtil.fetchRequest(service, 'GET')
        .then(json => {
            if (json.code === "000000") {
                //认证状态 0-审核中 1-审核通过 2-审核不通过（
                dispatch(createAction(DETAIL.DONG)(json.data))
                return json.data
            } else {
                Toast.message(json.msg)
                dispatch(createAction(DETAIL.ERROR)(json.msg))
            }
        })
        .catch(err => dispatch(createAction(DETAIL.ERROR)(err)))
    return response
}


export {
    toAuthentication,
    getAuthentication,
}

