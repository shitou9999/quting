/**
 * Created by PVer on 2018/7/15.
 */
import {
    handleActions
} from 'redux-actions'

import {LOGIN} from '../store/type';

const defaultStatus = {
    isLoading: false,
    loadingType: 'no',
    isError: false,
    errorInfo: {
        message: '出错了',
        code: 0,
    },
    loginYes: false,
    user: {},
}


export default handleActions({
    [LOGIN.ING]: {
        next(state, action) {
            return {
                ...state,
                isLoading: true,
            }
        }
    },
    [LOGIN.DONG]: {
        next(state, action) {
            return {
                ...state,
                isLoading: false,
                loginYes: true,
                user: action.payload
            }
        }
    },
    [LOGIN.ERROR]: {
        next(state, action) {
            return {
                ...state,
                isLoading: false,
                isError: false,
                loginYes: false,
            }
        }
    },
}, defaultStatus)
