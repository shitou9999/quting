import {handleActions} from 'redux-actions'

const defaultMeStatus = {
    isLoading: false,
    loadingType: 'no',
    isError: false,
    errorInfo: {
        message: '出错了',
        code: 0,
    },
}

export default handleActions({}, defaultMeStatus)
