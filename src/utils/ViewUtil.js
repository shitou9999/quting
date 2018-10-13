/**
 * Created by cyh on 2018/9/12.
 */
import React, {Component} from 'react';
import {Image} from 'react-native';
import {images} from "../assets"

function renderPlate(plateColor) {
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
function getValue(storageArr, key, defaultValue) {
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
 * 读取单个字典
 * @param flag 如:PLATE+COLOR
 * @param key
 * @returns {Promise<void>}
 */
async function getKeyValue(flag, key) {
    let itemValue = await gStorage.storage.loadId(flag, key, result => {
        console.log('读取单个字典')
        console.log(result)//{key:'0',value:'蓝'}
        return result.value
    })
    return itemValue
}


export {
    renderPlate,
    getValue,
    getKeyValue
}
