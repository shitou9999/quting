import {handleActions} from 'redux-actions';
import {OVERDUE, ADD, REMOVE, RESET} from '../store/type'
import {ElementaryArithmeticUtils} from '../utils/index'

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
                data: state.data.concat(action.payload)
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
    [RESET.DONG]: {
        next(state, actions) {
            return {
                ...state,
                allMoney: 0
            }
        }
    }
}, defaultStatus)
