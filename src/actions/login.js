/**
 * Created by PVer on 2018/7/15.
 */
import {createAction} from 'redux-actions';
import NetUtil from '../net/NetUtils';
import * as HttpUtils from '../net/HttpUtils';
import {LOGIN} from '../store/type';

import * as Storage from '../utils/storage';

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
/**
 * 用户登录
 * @param username
 * @param password 登录方式 0-验证码， 1-登录密码
 * @returns {function(*)}
 */
function userLogin(username, password, loginType) {
    let service = '/member/login';
    if (loginType == 1) {
        return dispatch => {
            dispatch(createAction(LOGIN.ING)());
            let params = {
                userCode: username,
                pwd: password,
                clientId: '',
                type: 1,
            };
            HttpUtils.fetchRequest(service, 'POST', params)
                .then(json => {
                    if (json.code === "000000") {
                        dispatch(createAction(LOGIN.DONG)(json.data))
                    } else {
                        dispatch(createAction(LOGIN.ERROR)(json.msg))
                    }
                })
                .catch(error => dispatch(createAction(LOGIN.ERROR)(error)));
        }
    } else {
        return dispatch => {
            dispatch(createAction(LOGIN.ING)());
            let params = {
                userCode: username,
                clientId: '',
                type: 0,
            };
            HttpUtils.fetchRequest(service, 'POST', params)
                .then(json => {
                    if (json.code === "000000") {
                        dispatch(createAction(LOGIN.DONG)(json.data))

                        Storage.storage.save('PREF_ID',json.data.id)
                        Storage.storage.save('PREF_TOKEN',json.data.token)
                        Storage.storage.save('PREF_USERCODE',json.data.userCode)
                    } else {
                        dispatch(createAction(LOGIN.ERROR)(json.msg))
                    }
                })
                .catch(error => dispatch(createAction(LOGIN.ERROR)(error)));
        }
    }

}


/**
 * 登录获取验证码(验证码登录)
 * @param userCode 手机号码
 * @param sessionId 会话ID-使用SHA1加签,
 * @param verifyCode 图形验证码
 */
function userLoginVerificationCode(userCode) {
    let service = '/member/login_verification_code'


}

/**
 * 获取图形验证码
 * @param sessionId 会话ID-使用SHA1加签,
 * @param random 随机码使用UUID|去除'-'连接符
 */
function getVerifyCode(sessionId, random) {
    let service = '/member/verify_code'


}


export {
    userLogin,
    getVerifyCode,
    userLoginVerificationCode,
}
