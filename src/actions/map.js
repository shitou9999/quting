
import Api from "../net/Api";

/**
 * 道路
 * @param latitude
 * @param longitude
 * @return {function(): *}
 */
const toRequestRoad = (latitude, longitude) => async () => {
    let service = `/range/section?lng=${longitude}&lat=${latitude}`
    let response = await Api.toRequest(service, 'GET', '')
    return response
}


/**
 * 道路
 * @param latitude
 * @param longitude
 * @return {function(): *}
 */
const toRequestLot = (latitude, longitude) => async () => {
    let service = `/range/parklot?lng=${longitude}&lat=${latitude}`
    let response = await Api.toRequest(service, 'GET', '')
    return response
}


export {
    toRequestRoad,
    toRequestLot,
}