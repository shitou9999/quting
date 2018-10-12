/**
 * Created by PVer on 2018/7/22.
 */
import Api from "../net/Api";
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

const userCardOveragePay = (userId, boCardCode, payPwd) => async (dispatch, getState) => {
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

/**
 * 支付详情
 * @param userId
 * @param start
 * @returns {function(): *}
 */
const toRequestPayDetail = (userId, start) => async () => {
    let service = `/overage/record?userId=${userId}&start=${start}&length=20&`
    let response = await Api.toRequest2(service)
    return response
}

/**
 * 路内(道路)历史停车记录-分页
 * @param userId
 * @param start
 * @param length
 * @returns {function(*, *): *}
 */
const getSectionHis = (userId, start, length) => async (dispatch, getState) => {
    let service = `/parking_record/section_his/page?userId=${userId}&start=${start}&length=${length}&`
    let response = await Api.toRequest2(service)
    return response
}

/**
 * 路外(停车场)历史停车记录-分页
 * @param userId
 * @param start
 * @param length
 * @returns {function(*, *): *}
 */
const getParkLotHis = (userId, start, length) => async (dispatch, getState) => {
    let service = `/parking_record/parklot_his/page?userId=${userId}&start=${start}&length=${length}&`
    let response = await Api.toRequest2(service)
    return response
}

/**
 * 查询用户所拥有未失效的优惠券
 * @param userId
 * @param start
 * @param length
 * @returns {function(*, *): *}
 */
const getCouponList = (userId, start, length) => async (dispatch, getState) => {
    let service = `/app/member/coupon/list?userId=${userId}&start=${start}&length=${length}&`
    let response = await Api.toRequest(service)
    return response
}

const getCouponHis = (userId, start, length) => async (dispatch, getState) => {
    let service = `/app/member/coupon/his?userId=${userId}&start=${start}&length=${length}&`
    let response = await Api.toRequest(service)
    return response
}

/**
 * 分页查询未过期的会员卡
 * @param userId
 * @param start
 * @param length
 * @returns {function(*, *): *}
 */
const getMouthValid = (userId, start, length) => async (dispatch, getState) => {
    let service = `/card/user/valid?userId=${userId}&start=${start}&length=${length}&`
    let response = await Api.toRequest2(service)
    return response
}

const getCardPage = (searchText) => async (dispatch, getState) => {
    let service = `/card/page?start=0&length=30&parklotName=${searchText}`
    let response = await Api.toRequest2(service)
    return response
}

const getSearchPage = (parklotName) => async (dispatch, getState) => {
    let service = `/range/parklot/name_list?parklotName=${parklotName}`
    let response = await Api.toRequest(service)
    return response
}


/**
 * 钱包欠费补缴
 * @param userId
 * @param recordCode
 * @param boPostpaidCode
 * @param payPwd
 * @return {function(*, *): *}
 */
const userOveragePay = (userId, arrearCode, payPwd) => async (dispatch, getState) => {
    let service = '/pay_arrear/overage'
    let params = {
        userId: userId,
        // userCode: userCode,
        arrearCode: arrearCode,
        payPwd: payPwd
    }
    let response = await Api.toRequest(service, 'POST', params)
    return response
}

/**
 * 支付宝欠费补缴生成欠费补缴订单
 * @param userId
 * @param recordCode
 * @param boPostpaidCode
 * @returns {Function}
 */
const userAliPay = (userId, arrearCode) => async (dispatch, getState) => {
    let service = '/pay_arrear/zfb_order'
    let params = {
        userId: userId,
        arrearCode: arrearCode
    }
    let response = await Api.toRequest(service, 'POST', params)
    return response
}

/**
 * 微信欠费补缴生成欠费补缴订单
 * @param userId
 * @param recordCode
 * @param boPostpaidCode
 * @param callOk
 * @returns {Function}
 */
const userWeChatPay = (userId, arrearCode) => async (dispatch, getState) => {
    let service = '/pay_arrear/wx_order'
    let params = {
        userId: userId,
        arrearCode: arrearCode
    }
    let response = await Api.toRequest(service, 'POST', params)
    return response
}


export default {
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
    getSectionHis,
    getParkLotHis,
    getCouponList,
    getCouponHis,
    getMouthValid,
    getCardPage,
    getSearchPage,
    userOveragePay,
    userAliPay,
    userWeChatPay,
}

