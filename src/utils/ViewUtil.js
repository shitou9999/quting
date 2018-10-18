/**
 * Created by cyh on 2018/9/12.
 */
import React, {Component} from 'react';
import {Image} from 'react-native';
import {images} from "../assets"

const renderPlate = (plateColor) => {
    let tempColor = parseInt(plateColor)
    if (tempColor === 0) {
        return <Image source={images.lanpai}
                      resizeMode='contain'
                      style={{width: 15, height: 15}}
        />
    } else if (tempColor === 1) {
        return <Image source={images.huangpai}
                      resizeMode='contain'
                      style={{width: 15, height: 15}}
        />
    } else if (tempColor === 2) {
        return <Image source={images.heipai}
                      resizeMode='contain'
                      style={{width: 15, height: 15}}
        />
    } else if (tempColor === 3) {
        return <Image source={images.baipai}
                      resizeMode='contain'
                      style={{width: 15, height: 15}}
        />
    } else {
        return <Image source={images.baipai}
                      resizeMode='contain'
                      style={{width: 15, height: 15}}
        />
    }
}


// {this.renderPlate()}
// renderPlate() {
//     let plateColor = this.props.plateColor
//     if (plateColor == 0) {
//         return <Image source={require('../assets/images/lanpai.png')}
//                       resizeMode='contain'
//                       style={{width: 15, height: 15}}
//         />
//     } else if (plateColor == 1) {
//         return <Image source={require('../assets/images/huangpai.png')}
//                       resizeMode='contain'
//                       style={{width: 15, height: 15}}
//         />
//     }
// }
/**
 *
 * @param storageArr
 * @param key 查询key(string)
 * @param defaultValue 默认值
 * @returns {*}
 */
const getValue = (storageArr, key, defaultValue) => {
    // let tempArr = this.state.storageArr || []
    console.log('查询缓存数据')
    console.log(storageArr)
    let searchValue = defaultValue
    for (let i = 0; i < storageArr.length; i++) {
        let tempKey = storageArr[i].key
        // console.log('tempKey类型和查询key类型')
        // console.log(typeof tempKey)
        // console.log(typeof key)
        if (key === parseInt(tempKey)) {
            searchValue = storageArr[i].value
            break
        }
    }
    return searchValue
}

/**
 * 读取单个字典 undefined
 * @param flag 如:PLATE+COLOR
 * @param key
 * @returns {Promise<void>}
 */
const getKeyValue = async (flag, key) => {
    let itemValue = await gStorage.loadId(flag, key, result => {
        console.log('读取单个字典')
        console.log(result)//{key:'0',value:'蓝'}
        return result
    })
    // let itemValue = gStorage.loadId(flag, key, result => result.value)
    //     .then(result => {
    //         return result
    //     })
    return itemValue
}

const getOrderInfo = (order) => {
    let orderInfo = "partner=" + "\"" + order.partner + "\"";  // 签约合作者身份ID* // 商户PID
    orderInfo += "&seller_id=" + "\"" + order.seller_id + "\""; // 签约卖家支付宝账号*//商户收款账号
    orderInfo += "&out_trade_no=" + "\"" + order.out_trade_no + "\""; // 商户网站唯一订单号**********
    orderInfo += "&subject=" + "\"" + order.subject + "\""; // 商品名称********
    orderInfo += "&body=" + "\"" + order.body + "\"";// 商品详情**********
    orderInfo += "&total_fee=" + "\"" + order.total_fee + "\"";     // 商品金额*********
    orderInfo += "&notify_url=" + "\"" + order.notify_url + "\"";// 服务器异步通知页面路径
    orderInfo += "&service=" + "\"" + order.service + "\""; // 服务接口名称， 固定值
    orderInfo += "&payment_type=" + "\"" + order.payment_type + "\"";// 支付类型， 固定值
    orderInfo += "&_input_charset=" + "\"" + order._input_charset + "\""; // 参数编码， 固定值
//        // 设置未付款交易的超时时间默认30分钟，一旦超时，该笔交易就会自动被关闭。取值范围：1m～15d。
//        // m-分钟，h-小时，d-天，1c-当天（无论交易何时创建，都在0点关闭）。该参数数值不接受小数点，如1.5h，可转换为90m。
    orderInfo += "&it_b_pay=" + "\"" + order.it_b_pay + "\"";
    // extern_token为经过快登授权获取到的alipay_open_id,带上此参数用户将使用授权的账户进行支付
    // orderInfo += "&extern_token=" + "\"" + extern_token + "\"";
    // 支付宝处理完请求后，当前页面跳转到商户指定页面的路径，可空
    orderInfo += "&show_url=" + "\"" + order.show_url + "\"";
    //        orderInfo += "&return_url=" + "\"" + show_url + "\"";
    // 调用银行卡支付，需配置此参数，参与签名， 固定值 （需要签约《无线银行卡快捷支付》才能使用）
    // orderInfo += "&paymethod=\"expressGateway\"";
    return orderInfo
}


export {
    renderPlate,
    getValue,
    getKeyValue,
    getOrderInfo,
}
