/**
 * Created by PVer on 2018/7/22.
 */

import {createAction} from 'redux-actions'
import * as HttpUtil from '../net/HttpUtils'
import {HOME} from '../store/type'
import Toast from "teaset/components/Toast/Toast";
import Api from "../net/Api";


/**
 * 查询车辆信息
 * @private
 */
const getRequestUserCar = (userId) => async (dispatch, getState) => {
    let service = `/vehicle/list?userId=${userId}`
    let response = await Api.toRequest(service)
    return response
}


/**
 * 当前停车记录
 * @private
 */
const getRequestParkingRecordCache = (userId) => async (dispatch, getState) => {
    let service = `/parking_record/cache?userId=${userId}`
    let response = await Api.toRequest(service)
    return response
}


/**
 * 生道路停车缴费生成前置业务订单
 * @param params
 * @return {function(*, *): *}
 */
const getRequestParkingPre = (params) => async (dispatch, getState) => {
    let service = '/me/order/road/bo/pkin_pre'
    dispatch(createAction(HOME.ING)())
    let response = await Api.toRequest(service, 'POST', params)
    if (response && response.result) {
        dispatch(createAction(HOME.DONG)(response.data))
    } else {
        dispatch(createAction(HOME.ERROR)(response.msg))
    }
    return response
}

/**
 * 道路-生成业务订单
 * @param userId
 * @param recordCode
 * @return {function(*, *): *}
 */
const createRoadBusiness = (userId, recordCode) => async (dispatch, getState) => {
    let service = '/pay_section/business'
    let params = {
        userId: userId,
        recordCode: recordCode,
    }
    let response = await Api.toRequest(service, 'POST', params)
    return response
}

/**
 * 钱包支付
 * @param userId
 * @param recordCode
 * @param boPostpaidCode
 * @param payPwd
 * @return {function(*, *): *}
 */
const userOveragePay = (userId, recordCode, boPostpaidCode, payPwd) => async (dispatch, getState) => {
    let service = '/pay_section/overage'
    let params = {
        userId: userId,
        recordCode: recordCode,
        boPostpaidCode: boPostpaidCode,
        payPwd: payPwd,
    }
    let response = await Api.toRequest(service, 'POST', params)
    return response
}

/**
 * 支付宝支付生成后付费订单
 * @param userId
 * @param recordCode
 * @param boPostpaidCode
 * @returns {Function}
 */
const userAliPay = (userId, recordCode, boPostpaidCode) => async (dispatch, getState) => {
    let service = '/pay_section/zfb_order'
    let params = {
        userId: userId,
        recordCode: recordCode,
        boPostpaidCode: boPostpaidCode
    }
    let response = await Api.toRequest(service, 'POST', params)
    return response
}

/**
 * 微信支付生成后付费订单
 * @param userId
 * @param recordCode
 * @param boPostpaidCode
 * @param callOk
 * @returns {Function}
 */
const userWeChatPay = (userId, recordCode, boPostpaidCode) => async (dispatch, getState) => {
    let service = '/pay_section/wx_order'
    let params = {
        userId: userId,
        recordCode: recordCode,
        boPostpaidCode: boPostpaidCode
    }
    let response = await Api.toRequest(service, 'POST', params)
    return response
}


export {
    getRequestUserCar,
    getRequestParkingRecordCache,
    getRequestParkingPre,
    createRoadBusiness,
    userOveragePay,
    userAliPay,
    userWeChatPay,
}

