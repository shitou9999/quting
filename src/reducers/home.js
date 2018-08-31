/**
 * Created by PVer on 2018/7/22.
 */
import {handleActions} from 'redux-actions';
import {ME, MODIFY, HOME} from '../store/type';
// recordCode (string, optional): 停车记录编号,
// payFee (number, optional): 应付金额,分,
// parkingTime (integer, optional): 停车时长,分,
// chargeStartTime (string, optional): 计费开始时间,yyyy-MM-dd HH:mm:ss,
// chargeEndTime (string, optional): 计费结束时间,yyyy-MM-dd HH:mm:ss,
// userCouponList (array[UserCouponDto], optional): 用户可使用优惠券列表

// couponCode (integer, optional): 优惠券编号,
// couponType (integer, optional): 优惠券类型:数据字典--COUPON_TYPE,
// couponFee (number, optional): 优惠券金额 元,
// validTime (string, optional): 优惠券开始时间：YYYY-MM-DD,
// invalidTime (string, optional): 优惠券结束时间：YYYY-MM-DD,
// rangeName (string, optional): 适用停车场名称
const defaultHomeStatue = {
    isShow: false,
    bo_parking_pre_dto: {},
    user_coupon_list: [],
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
                bo_parking_pre_dto: action.payload,
                user_coupon_list: action.payload.userCouponList,
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
}, defaultHomeStatue)