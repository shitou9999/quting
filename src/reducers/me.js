/**
 * Created by PVer on 2018/7/22.
 */
import {handleActions} from 'redux-actions';
import {ME, MODIFY, UP} from '../store/type';
// userCode (string, optional): 用户手机号码,
//     userName (string, optional): 用户名,
//     nickName (string, optional): 用户昵称,
//     userPic (string, optional): 用户头像,
//     sex (string, optional): 性别:数据字典(member平台)--SEX,
//     payPwd (string, optional): 支付密码,
//     overagePrice (number, optional): 可用余额(元),
//     vehicleNum (integer, optional): 用户绑定车牌总数,
//     authenticationStatus (string, optional): 认证状态 0-审核中 1-审核通过 2-审核不通过（数据字典(member平台)：AUTHENTICATION_STATUS）,
// customerPhone (string, optional): 客服电话
const defaultMeStatue = {
    isShow: false,
    user_info: {}
};


export default handleActions({
    [ME.ING]: {
        next(state, action) {
            return {
                ...state,
                isShow: true
            }
        }
    },
    [ME.DONG]: {
        next(state, action) {
            return {
                ...state,
                isShow: false,
                user_info: action.payload
                // userCode: action.payload.userCode,
                // userName: action.payload.userName,
                // nickName: action.payload.nickName,
                // userPic: action.payload.userPic,
                // sex: action.payload.sex,
                // payPwd: action.payload.payPwd,
                // overagePrice: action.payload.overagePrice,
                // vehicleNum: action.payload.vehicleNum,
                // authenticationStatus: action.payload.authenticationStatus,
                // customerPhone: action.payload.customerPhone,
            }
        }
    },
    [ME.ERROR]: {
        next(state, action) {
            return {
                ...state,
                isShow: false
            }
        }
    },
    [MODIFY.MODIFY_NAME]: {
        next(state, action){
            return {
                ...state,
                nickName: action.payload,
            }
        }
    },
    //头像上传
    [UP.ING]: {
        next(state, action){
            return {
                ...state,
            }
        }
    },
    [UP.DONG]: {
        next(state, action){
            return {
                ...state,
                userPic: action.payload
            }
        }
    },
    [UP.ERROR]: {
        next(state, action){
            return {
                ...state,
            }
        }
    }
}, defaultMeStatue)