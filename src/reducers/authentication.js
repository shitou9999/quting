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
//redux-actions有两大法宝createAction和handleActions.
// const timer = handleActions({
//     START: (state, action) => ({ ...state, runStatus: true }),
//     STOP: (state, action) => ({ ...state, runStatus: false }),
//     RESET: (state, action) => ({ ...state, seconds: 0 }),
//     RUN_TIMER: (state, action) => ({ ...state, seconds: state.seconds + 1 }),
// }, defaultState);
//     [DETAIL.DONG]:(state, action) => ({ ...state, runStatus: true }),
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
