/**
 * Created by PVer on 2018/7/15.
 */
import {
    handleActions
} from 'redux-actions'

import {LOGIN} from '../store/type';

const defaultStatus = {
    isLoginSucc: false,
    isShow: false,
    user:{}
};


export default handleActions({
    [LOGIN.ING]: {
        next(state, action) {
            return {
                ...state,
                isLoginSucc: false,
                isShow:true
            }
        }
    },
    [LOGIN.DONG]: {
        next(state, action) {
            return {
                ...state,
                isShow:false,
                isLoginSucc:true,
                user:action.payload
            }
        }
    },
    [LOGIN.ERROR]: {
        next(state, action) {
            return {
                ...state,
                isLoginSucc: false,
                isShow:false
            }
        }
    },
}, defaultStatus)