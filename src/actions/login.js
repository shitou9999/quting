/**
 * Created by PVer on 2018/7/15.
 */
import {createAction} from 'redux-actions';
import NetUtil from '../net/NetUtils';
import {LOGIN} from '../store/type';

// let url = 'http://beta..cc:32080/_app-inf';
// let service = '/member/login';
// let params = {
//     "userCode": "15669961385",
//     "pwd": "123456",
//     "type": "1" //登录方式 0-验证码， 1-登录密码
// };
// await NetUtils.postJson(url + service, service, params, (result) => {
//     Toast.success('result' + result);
// });

// return dispatch => {
//     dispatch(createAction(LOGIN.ING)());
//     NetUtil.postJson(url + service, null, {
//         userCode: username,
//         pwd: password,
//         type: 1,
//     }, (result) => {
//         dispatch(createAction(LOGIN.DONG)(result.data))
//     })
//     // .then(res => dispatch(createAction(LOGIN.DONG)(res.data)))
//         .catch(error => dispatch(createAction(LOGIN.ERROR)(error)))//catch有问题

function userLogin(username, password) {
    let url = 'http://beta..cc:32080/_app-inf';
    let service = '/member/login';
    return dispatch => {
        dispatch(createAction(LOGIN.ING)());
        NetUtil.postJson(url + service, null, {
            userCode: username,
            pwd: password,
            type: 1,
        })
            .then(res => dispatch(createAction(LOGIN.DONG)(res.data)))
            .catch(error => dispatch(createAction(LOGIN.ERROR)(error)))
    }
}

export {
    userLogin
}
