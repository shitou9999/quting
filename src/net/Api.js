import * as HttpUtil from "./HttpUtils"

const toRequest = async (service, method = 'GET', params = '') => {
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
        .catch(err => {
            return {
                result: false,
                data: null,
                code: 0,
                msg: err,
            }
        })
    return response
}

const toRequest2 = async (service, method = 'GET') => {
    let response = await HttpUtil.fetchRequest(service, method)
        .then(json => {
            let data = json.aaData
            if (data && data.length > 0) {
                return {
                    result: true,
                    data: data,
                    code: json.code,
                    msg: json.msg,
                }
            } else {
                return {
                    result: false,
                    data: [],
                    code: 0,
                    msg: json.msg,
                }
            }
        })
        .catch(err => {
            return {
                result: false,
                data: [],
                code: 0,
                msg: err,
            }
        })
    return response
}


export default {
    toRequest,
    toRequest2,
}
