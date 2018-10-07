/**
 * Created by PVer on 2018/7/22.
 */

import {createAction} from 'redux-actions'
import {MODIFY, DETAIL} from '../store/type'
import Api from "../net/Api";


/**
 * 申请实名认证
 * @param param
 * @param callOk
 */
const toAuthentication = (param) => async (dispatch, getState) => {
    let service = '/authentication/approval'
    let response = await Api.toRequest(service, 'POST', param)
    if (response && response.result) {
        //认证状态 0-审核中 1-审核通过 2-审核不通过（
        dispatch(createAction(MODIFY.AUTHENTICATION)('0'))
    }
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
    let response = await Api.toRequest(service, 'GET')
    if (response && response.result) {
        //认证状态 0-审核中 1-审核通过 2-审核不通过（
        dispatch(createAction(DETAIL.DONG)(response.data))
    } else {
        dispatch(createAction(DETAIL.ERROR)(response.msg))
    }
    return response
}


export {
    toAuthentication,
    getAuthentication,
}

