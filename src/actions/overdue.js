import Api from "../net/Api";
import {createAction} from 'redux-actions'
import {OVERDUE, ADD, REMOVE} from "../store/type"

const getArrearsList = (userId, start, length) => async (dispatch, getState) => {
    let service = `/parking_record/section_arrear/page?userId=${userId}&start=${start}&length=${length}&`
    // dispatch(createAction(OVERDUE.ING)(null))
    let response = await Api.toRequest2(service)
    if (response.result) {
        let data = response.data
        if (data && data.length > 0) {
            let tempData = data.map((item, index) => {
                return Object.assign(item, {isSelect: false})
            })
            dispatch(createAction(OVERDUE.DONG)(tempData))
        } else {
            dispatch(createAction(OVERDUE.DONG)([]))
        }
    } else {
        dispatch(createAction(OVERDUE.ERROR)(response.msg))
    }
    return response
}

const addOverdueStore = (arrearCode, arrearMoney) => async (dispatch, getState) => {
    dispatch(createAction(ADD.DONG)({arrearCode, arrearMoney}))
}


const removeOverdueStore = (arrearCode, arrearMoney) => async (dispatch, getState) => {
    dispatch(createAction(REMOVE.DONG)({arrearCode, arrearMoney}))
}

export {
    getArrearsList,
    addOverdueStore,
    removeOverdueStore,
}
