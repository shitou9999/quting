/**
 * Created by PVer on 2018/7/22.
 */

import {createAction} from 'redux-actions'
import * as HttpUtil from '../net/HttpUtils'
import {HOME} from '../store/type'
import Toast from "teaset/components/Toast/Toast";

/**
 * 生道路停车缴费生成前置业务订单
 * @param userId
 * @param recordCode
 */
function getRequestParkingPre(params) {
    let service = '/me/order/road/bo/pkin_pre'
    return dispatch => {
        dispatch(createAction(HOME.ING)());
        HttpUtil.fetchRequest(service, 'POST', params)
            .then(json => {
                    if (json.code === "000000") {
                        dispatch(createAction(HOME.DONG)(json.data))
                    } else {
                        dispatch(createAction(HOME.ERROR)(json.msg))
                    }
                }
            )
            .catch(err => {
                dispatch(createAction(HOME.ERROR)(err))
            })
    }
}

/**
 * 道路-生成业务订单
 * @returns
 */
const createRoadBusiness = (userId, recordCode, callOk) => {
    let service = '/pay_section/business'
    let params = {
        userId: userId,
        recordCode: recordCode,
    }
    return dispatch => {
        HttpUtil.fetchRequest(service, 'POST', params)
            .then(json => {
                if (json.code === "000000") {
                    Toast.message('生成业务订单成功')
                    let data = json.data
                    callOk(data)
                    navigation.navigate('ParkingPayPage', {
                        boPkinCode: data.boPkinCode,//场内付费-付费业务订单编号,
                        payMoney: data.payMoney,
                        couponCode: '',
                    })
                } else {
                    Toast.message('生成业务订单失败')
                }
            })
            .catch()
    }
}

/**
 * 钱包支付
 * @param userId
 * @param recordCode
 * @param boPostpaidCode
 * @param payPwd
 * @param callOk
 * @returns {Function}
 */
const userOveragePay = (userId, recordCode, boPostpaidCode, payPwd, callOk) => {
    let service = '/pay_section/overage'
    let params = {
        userId: userId,
        recordCode: recordCode,
        boPostpaidCode: boPostpaidCode,
        payPwd: payPwd,
    }
    return dispatch => {
        HttpUtil.fetchRequest(service, 'POST', params)
            .then(json => {
                if (json.code === "000000") {
                    Toast.message('钱包支付成功')
                    callOk()
                } else {
                    Toast.message('钱包支付失败')
                }
            })
            .catch()
    }
}

/**
 * 支付宝支付生成后付费订单
 * @param userId
 * @param recordCode
 * @param boPostpaidCode
 * @param callOk
 * @returns {Function}
 */
const userAliPay = (userId, recordCode, boPostpaidCode, callOk) => {
    let service = '/pay_section/zfb_order'
    let params = {
        userId: userId,
        recordCode: recordCode,
        boPostpaidCode: boPostpaidCode
    }
    return dispatch => {
        HttpUtil.fetchRequest(service, 'POST', params)
            .then(json => {
                if (json.code === "000000") {
                    Toast.message('生成结算订单成功')
                    let order = json.data
                    callOk(order)
                } else {
                    Toast.message('生成结算订单失败')
                }
            })
            .catch()
    }
}

/**
 * 微信支付生成后付费订单
 * @param userId
 * @param recordCode
 * @param boPostpaidCode
 * @param callOk
 * @returns {Function}
 */
const userWeChatPay = (userId, recordCode, boPostpaidCode, callOk) => {
    let service = '/pay_section/wx_order'
    let params = {
        userId: userId,
        recordCode: recordCode,
        boPostpaidCode: boPostpaidCode
    }
    return dispatch => {
        HttpUtil.fetchRequest(service, 'POST', params)
            .then(json => {
                if (json.code === "000000") {
                    Toast.message('生成结算订单成功')
                    let order = json.data
                    callOk(order)
                } else {
                    Toast.message('生成结算订单失败')
                }
            })
            .catch()
    }
}


export {
    getRequestParkingPre,
    createRoadBusiness,
    userOveragePay,
    userAliPay,
    userWeChatPay,
}

