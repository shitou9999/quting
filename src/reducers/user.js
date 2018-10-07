/**
 * Created by PVer on 2018/7/22.
 */
import {handleActions} from 'redux-actions';
import {ME, MODIFY, DETAIL} from '../store/type';

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
