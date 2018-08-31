/**
 * Created by PVer on 2018/7/22.
 */

import {createAction} from 'redux-actions';
import * as HttpUtil from '../net/HttpUtils';
import {HOME} from '../store/type';

/**
 * 生成后付费业务订单前置--获取缴费信息
 * @param userId
 */
function getRequestParkingPre(userId, recordCode) {
    let service = '/pay_parklot/bo/pkin_pre'
    let params = {
        "userId": '1100000000073',
        "recordCode": recordCode
    }
    return dispatch => {
        dispatch(createAction(HOME.ING)());
        HttpUtil.fetchRequest(service, 'POST', params)
            .then(json => {
                    if (json.code === "000000") {
                        dispatch(createAction(HOME.DONG)(json.data));
                    } else {
                        dispatch(createAction(HOME.ERROR)(json.msg));
                    }
                }
            )
            .catch(err => {
                dispatch(createAction(HOME.ERROR)(err));
            })
    }
}


export {
    getRequestParkingPre,
}

