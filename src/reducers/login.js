/**
 * Created by PVer on 2018/7/15.
 */
import {
    handleActions
} from 'redux-actions'

import {LOGIN} from '../store/type';
// id = 1100000000095
// nickName =null
// othOpenId =null
// payPwd =null
// regTime = "20180714163517"
// regType = "0"
// sex ="1"
// token = "295bcba203584e1290f55aa6516b1f65"
// userCode ="15669961385"
// userName =null
// userPic =null
// userStatus ="1"
// userType ="1"
// wxOpenId =null
// zfbOpenId =null
const defaultStatus = {
    isLoginSucc: false,
    isShow: false,
    user: {},

};


export default handleActions({
    [LOGIN.ING]: {
        next(state, action) {
            return {
                ...state,
                isLoginSucc: false,
                isShow: true
            }
        }
    },
    [LOGIN.DONG]: {
        next(state, action) {
            return {
                ...state,
                isShow: false,
                isLoginSucc: true,
                user: action.payload
            }
        }
    },
    [LOGIN.ERROR]: {
        next(state, action) {
            return {
                ...state,
                isLoginSucc: false,
                isShow: false
            }
        }
    },
}, defaultStatus)