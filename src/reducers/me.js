/**
 * Created by PVer on 2018/7/22.
 */
import {handleActions} from 'redux-actions';
import {ME, MODIFY, DETAIL} from '../store/type';
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
const defaultMeStatus = {
    isLoading: false,
    loadingType: 'no',
    isError: false,
    errorInfo: {
        message: '出错了',
        code: 0,
    },
    user_info: {},
}


export default handleActions({
    [ME.ING]: {
        next(state, action) {
            return {
                ...state,
                isLoading: true
            }
        }
    },
    [ME.DONG]: {
        next(state, action) {
            return {
                ...state,
                isLoading: false,
                user_info: action.payload
            }
        }
    },
    [ME.ERROR]: {
        next(state, action) {
            return {
                ...state,
                isLoading: false,
                isError: true,
            }
        }
    },
    //用户
    [MODIFY.NAME]: {
        next(state, action) {
            return {
                ...state,
                user_info: Object.assign({}, state.user_info, {
                    nickName: action.payload
                })
            }
        }
    },
    [MODIFY.AVATAR]: {
        next(state, action) {
            return {
                ...state,
                user_info: Object.assign({}, state.user_info, {
                    userPic: action.payload
                })
            }
        }
    },
    [MODIFY.SEX]: {
        next(state, action) {
            return {
                ...state,
                user_info: Object.assign({}, state.user_info, {
                    sex: action.payload
                })
            }
        }
    },
    [DETAIL.ING]: {
        next(state, action) {
            return {
                ...state,
                isLoading: true
            }
        }
    },
    [DETAIL.DONG]: {
        next(state, action) {
            return {
                ...state,
                isLoading: false,
            }
        }
    },
    [DETAIL.ERROR]: {
        next(state, action) {
            return {
                ...state,
                isLoading: false,
                isError: true,
            }
        }
    },

}, defaultMeStatus)
//realName (string, optional): 真实姓名,
// sex (string, optional): 性别:数据字典(member平台)--SEX,
// tel (string, optional): 联系方式,
// idNum (string, optional): 身份证号码,
// frontPic (string, optional): 身份证正面图片,
// sidePic (string, optional): 身份证反面图片,
// authenticationStatus (string, optional): 认证状态 0-审核中 1-审核通过 2-审核不通过（数据字典(member平台)：AUTHENTICATION_STATUS）
