/**
 * Created by cyh on 2018/9/12.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Alert, Image, TouchableWithoutFeedback} from 'react-native';

function renderPlate(plateColor) {
    if (plateColor == 0) {
        return <Image source={require('../assets/images/lanpai.png')}
                      resizeMode='contain'
                      style={{width: 15, height: 15}}
        />
    } else if (plateColor == 1) {
        return <Image source={require('../assets/images/huangpai.png')}
                      resizeMode='contain'
                      style={{width: 15, height: 15}}
        />
    } else if (plateColor == 2) {
        return <Image source={require('../assets/images/heipai.png')}
                      resizeMode='contain'
                      style={{width: 15, height: 15}}
        />
    } else if (plateColor == 3) {
        return <Image source={require('../assets/images/baipai.png')}
                      resizeMode='contain'
                      style={{width: 15, height: 15}}
        />
    } else {
        return <Image source={require('../assets/images/baipai.png')}
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
 * @param key 查询key
 * @param defaultValue 默认值
 * @returns {*}
 */
function getValue(storageArr, key, defaultValue) {
    // let tempArr = this.state.storageArr || []
    let searchValue = defaultValue
    for (let i = 0; i < storageArr.length; i++) {
        let tempKey = storageArr[i].key
        if (key === tempKey) {
            searchValue = storageArr[i].value
            break
        }
    }
    return searchValue
}

async function getKeyValue(flag, key) {
    //读取单个字典
    let itemValue = await gStorage.storage.loadId(flag, key, results => {
        console.log(results)
        return results
    })
    return itemValue
}


export {
    renderPlate,
    getValue,
    getKeyValue
}
