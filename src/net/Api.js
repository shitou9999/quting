import * as HttpUtil from "./HttpUtils";
import createAction from "redux-actions/es/createAction";
import {LOGIN} from "../store/type";


const toRequest = async (service, method = 'GET', params) => {
    let response = await HttpUtil.fetchRequest(service, method, params)
        .then(json => {
            if (json.code === "000000") {
                return {
                    result: true,
                    data: json.data,
                    code: json.code,
                    msg: json.msg,
                }
            } else {
                return {
                    result: false,
                    data: json.data,
                    code: json.code,
                    msg: json.msg,
                }
            }
        })
        .catch(error => {
            return {
                result: false,
                data: null,
                code: 0,
                msg: error,
            }
        })
    return response
}


export {
    toRequest,
}
