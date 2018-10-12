import Api from "../net/Api";

/**
 * 道路
 * @param latitude
 * @param longitude
 * @return {function(): *}
 */
const toRequestRoad = (latitude, longitude) => async () => {
    let service = `/range/section?lng=${longitude}&lat=${latitude}`
    let response = await Api.toRequest(service)
    return response
}


/**
 * 停车场
 * @param latitude
 * @param longitude
 * @return {function(): *}
 */
const toRequestLot = (latitude, longitude) => async () => {
    let service = `/range/parklot?lng=${longitude}&lat=${latitude}`
    let response = await Api.toRequest(service)
    return response
}

/**
 * 推荐
 * @param latitude
 * @param longitude
 * @returns {function(): *}
 */
const toRequestRecommend = (latitude, longitude) => async () => {
    let service = `/range/recommend?lng=${longitude}&lat=${latitude}`
    let response = await Api.toRequest(service)
    return response
}


export {
    toRequestRoad,
    toRequestLot,
    toRequestRecommend,
}
