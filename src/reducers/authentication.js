/**
 * Created by PVer on 2018/7/22.
 */
import {handleActions} from 'redux-actions';
import {DETAIL} from '../store/type'

const defaultMeStatus = {
    isLoading: false,
    loadingType: 'no',
    isError: false,
    errorInfo: {
        message: '出错了',
        code: 0,
    },
}

export default handleActions({
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
