/**
 * Created by PVer on 2018/7/22.
 */

import {createAction} from 'redux-actions'
import * as HttpUtil from '../net/HttpUtils'
import Toast from "teaset/components/Toast/Toast"
// if (!Array.isArray(newData)) {
//     return []
// }
/**
 * 支付宝充值生成充值订单
 * @param userId
 * @param rechargeMoney
 * @param callOk
 */
const toAliRecharge = (userId, rechargeMoney, callOk) => {
    let service = '/recharge/zfb_order'
    let params = {
        userId: userId,
        rechargeMoney: rechargeMoney
    }
    return dispatch => {
        HttpUtil.fetchRequest(service, 'POST', params)
            .then(json => {
                if (json.code === "000000") {
                    Toast.message('生成充值订单成功')
                    callOk(json)
                } else {
                    Toast.message('生成充值订单失败')
                }
            })
            .catch()
    }
}


/**
 * 微信充值生成充值订单
 * @param userId
 * @param rechargeMoney
 * @param callOk
 * @returns {Function}
 */
const toWeChatRecharge = (userId, rechargeMoney, callOk) => {
    let service = '/recharge/wx_order'
    let params = {
        userId: userId,
        rechargeMoney: rechargeMoney
    }
    return dispatch => {
        HttpUtil.fetchRequest(service, 'POST', params)
            .then(json => {
                if (json.code === "000000") {
                    Toast.message('生成充值订单成功')
                    callOk(json)
                } else {
                    Toast.message('生成充值订单失败')
                }
            })
            .catch()
    }
}


/**
 * 删除订单
 * @param obPostpaidCode
 * @param recordSrc
 * @param orderType
 * @param callOk
 */
function toDeleteOrder(obPostpaidCode, recordSrc, orderType, callOk) {
    let service = '/me/order/delete'
    let params = {
        obPostpaidCode: obPostpaidCode,
        recordSrc: recordSrc,
        orderType: orderType,
    }
    return dispatch => {
        HttpUtil.fetchRequest(service, 'POST', params)
            .then(json => {
                if (json.code === "000000") {
                    Toast.message('订单删除成功')
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
 * 取消业务订单
 * @param boCode
 * @param recordSrc
 * @param orderType
 * @param callOk
 */
const toCancelOrder = (boCode, recordSrc, orderType, callOk) => {
    let service = '/me/order/cancel'
    let params = {
        boCode: boCode,
        recordSrc: recordSrc,
        orderType: orderType
    }
    return dispatch => {
        HttpUtil.fetchRequest(service, 'POST', params)
            .then(json => {
                if (json.code === "000000") {
                    Toast.message('订单取消成功')
                    callOk()
                } else {
                    Toast.message(json.msg)
                }
            })
            .catch(err => {
            })
    }
}


export {
    toAliRecharge,
    toWeChatRecharge,
    toDeleteOrder,
    toCancelOrder,
}

