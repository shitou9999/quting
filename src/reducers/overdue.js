import {handleActions} from 'redux-actions';
import {OVERDUE, ADD, REMOVE} from '../store/type'

import * as ElementaryArithmeticUtils from '../utils/ElementaryArithmeticUtils'

const defaultStatus = {
    isLoading: false,
    loadingType: 'no',
    isError: false,
    errorInfo: {
        message: '出错了',
        code: 0,
    },

    data: [],
    allMoney: 0,
    arrearCode: [],
}

export default handleActions({
    [OVERDUE.ING]: {
        next(state, action) {
            return {
                ...state,
                isLoading: true
            }
        }
    },
    [OVERDUE.DONG]: {
        next(state, action) {
            return {
                ...state,
                isLoading: false,
                // data: action.payload.map((item, index) => {
                //     return Object.assign(item, {isSelect: false})
                // })
                data: action.payload
            }
        }
    },
    [OVERDUE.ERROR]: {
        next(state, action) {
            return {
                ...state,
                isLoading: false,
                isError: false,
            }
        }
    },
    [ADD.DONG]: {
        next(state, action) {
            return {
                ...state,
                data: state.data.map((item, index) => {
                    if (item.arrearCode === action.payload.arrearCode) {
                        return Object.assign(item, {isSelect: true})
                    } else {
                        return item
                    }
                }),
                allMoney: ElementaryArithmeticUtils.add(state.allMoney, action.payload.arrearMoney),
                // data: state.data.forEach((item, index) => {
                //     if (item.arrearCode === action.payload) {
                //         return item.isSelect = true
                //     }
                // })
            }
        }

    },
    [REMOVE.DONG]: {
        next(state, action) {
            return {
                ...state,
                data: state.data.map((item, index) => {
                    if (item.arrearCode === action.payload.arrearCode) {
                        return Object.assign(item, {isSelect: false})
                    } else {
                        return item
                    }
                }),
                allMoney: ElementaryArithmeticUtils.subtract(state.allMoney, action.payload.arrearMoney)
                // data: state.data.forEach((item, index) => {
                //     if (item.arrearCode === action.payload) {
                //         return item.isSelect = false
                //     }
                // }),
            }
        }
    },
}, defaultStatus)
