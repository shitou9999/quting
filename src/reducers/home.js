/**
 * Created by PVer on 2018/7/22.
 */
import {handleActions} from 'redux-actions';
import {ME, MODIFY, HOME} from '../store/type';
// BoPkinPreDto {
//     parklotCode (string, optional): 停车场编号,
//         payFee (integer, optional): 应付金额,分,
//         parkingTime (integer, optional): 停车时长,分,
//         chargeStartTime (string, optional): 计费开始时间,yyyy-MM-dd HH:mm:ss,
//         chargeEndTime (string, optional): 计费结束时间,yyyy-MM-dd HH:mm:ss,
//         coupons (array[MebCouponDto], optional): 优惠券信息
// }
// MebCouponDto {
//     couponCode (string, optional): 优惠券编号,
//         couponType (integer, optional): 优惠券类型:数据字典--COUPON_TYPE,
//         couponFee (integer, optional): 优惠券金额,
//         validTime (string, optional): 优惠券开始时间：YYYY-MM-DD,
//         invalidTime (string, optional): 优惠券结束时间：YYYY-MM-DD,
//         range (string, optional): 适用范围,
//         couponSrc (string, optional): 优惠券来源
// }
const defaultMeStatus = {
    isShow: false,
    bo_pre_dto: {},
    coupons: [],
};

export default handleActions({
    [HOME.ING]: {
        next(state, action) {
            return {
                ...state,
                isShow: true
            }
        }
    },
    [HOME.DONG]: {
        next(state, action) {
            return {
                ...state,
                isShow: false,
                bo_pre_dto: action.payload,
                coupons: action.payload.coupons,
            }
        }
    },
    [HOME.ERROR]: {
        next(state, action) {
            return {
                ...state,
                isShow: false
            }
        }
    },
}, defaultMeStatus)
