/**
 * Created by PVer on 2018/7/22.
 */
import Api from "../net/Api";
import * as HttpUtil from "../net/HttpUtils";
import Toast from "teaset/components/Toast/Toast";
import * as OrderUtil from "../utils/OrderUtil";
import Pay from "../components/base/Pay";
// if (!Array.isArray(newData)) {
//     return []
// }
/**
 * 支付宝充值生成充值订单
 * @param userId
 * @param rechargeMoney
 * @param callOk
 */
const toAliRecharge = (userId, rechargeMoney) => async (dispatch, getState) => {
    let service = '/recharge/zfb_order'
    let params = {
        userId: userId,
        rechargeMoney: rechargeMoney
    }
    let response = await Api.toRequest(service, 'POST', params)
    return response
}


/**
 * 微信充值生成充值订单
 * @param userId
 * @param rechargeMoney
 * @param callOk
 * @returns {Function}
 */
const toWeChatRecharge = (userId, rechargeMoney) => async (dispatch, getState) => {
    let service = '/recharge/wx_order'
    let params = {
        userId: userId,
        rechargeMoney: rechargeMoney
    }
    let response = await Api.toRequest(service, 'POST', params)
    return response
}


/**
 * 删除订单
 * @param obPostpaidCode
 * @param recordSrc
 * @param orderType
 * @param callOk
 */
const toDeleteOrder = (obPostpaidCode, recordSrc, orderType) => async (dispatch, getState) => {
    let service = '/me/order/delete'
    let params = {
        obPostpaidCode: obPostpaidCode,
        recordSrc: recordSrc,
        orderType: orderType,
    }
    let response = await Api.toRequest(service, 'POST', params)
    return response
}

/**
 * 取消业务订单
 * @param boCode
 * @param recordSrc
 * @param orderType
 * @param callOk
 */
const toCancelOrder = (boCode, recordSrc, orderType) => async (dispatch, getState) => {
    let service = '/me/order/cancel'
    let params = {
        boCode: boCode,
        recordSrc: recordSrc,
        orderType: orderType
    }
    let response = await Api.toRequest(service, 'POST', params)
    return response
}

const toRequestComplaint = (userId, problemTitle, problemContent, problemType, contact) => async (dipatch, getState) => {
    let service = '/complain';
    let params = {
        userId: userId,
        problemTitle: problemTitle,
        problemContent: problemContent,
        problemType: problemType,
        contact: contact
    }
    let response = await Api.toRequest(service, 'POST', params)
    return response
}
/**
 * 车辆绑定
 * @param userId
 * @param plate
 * @param plateColor
 * @return {function(): (T | {result: boolean})}
 */
const toRequestBindCar = (userId, plate, plateColor) => async () => {
    let service = '/vehicle/bind'
    let params = {
        userId: userId,
        plate: plate,
        plateColor: plateColor
    }
    let response = await Api.toRequest(service, 'POST', params)
    return response
}

const userCardOveragePay = (userId,boCardCode,payPwd) => async (dispatch, getState) => {
    let service = '/card/overage'
    let params = {
        userId: userId,
        boCardCode: boCardCode,
        payPwd: payPwd
    }
    let response = await Api.toRequest(service, 'POST', params)
    return response
}

/**
 * 购买月卡-支付宝
 * @param userId
 * @param boCardCode
 * @return {function(*, *): *}
 */
const userCardAliPay = (userId, boCardCode) => async (dispatch, getState) => {
    let service = '/card/zfb_order'
    let params = {
        userId: userId,
        boCardCode: boCardCode
    }
    let response = await Api.toRequest(service, 'POST', params)
    return response
}

/**
 * 购买月卡-微信
 * @param userId
 * @param boPkinCode
 * @return {function(*, *): *}
 */
const userCardWeChatPay = (userId, boPkinCode) => async (dispatch, getState) => {
    let service = '/card/wx_order'
    let params = {
        userId: userId,
        boPkinCode: boPkinCode
    }
    let response = await Api.toRequest(service, 'POST', params)
    return response
}


const toRequestPayDetail = (userId, start) => async () => {
    let service = `/overage/record?userId=${userId}&start=${start}&length=20&`
    let response = await Api.toRequest2(service, 'GET')
    return response
}


export {
    toAliRecharge,
    toWeChatRecharge,
    toDeleteOrder,
    toCancelOrder,
    toRequestComplaint,
    toRequestBindCar,
    toRequestPayDetail,
    userCardOveragePay,
    userCardAliPay,
    userCardWeChatPay,
}

