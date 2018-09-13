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
//     } else if (plateColor == 2) {
//         return <Image source={require('../assets/images/heipai.png')}
//                       resizeMode='contain'
//                       style={{width: 15, height: 15}}
//         />
//     } else if (plateColor == 3) {
//         return <Image source={require('../assets/images/baipai.png')}
//                       resizeMode='contain'
//                       style={{width: 15, height: 15}}
//         />
//     } else {
//         return <Image source={require('../assets/images/baipai.png')}
//                       resizeMode='contain'
//                       style={{width: 15, height: 15}}
//         />
//     }
// }

export {
    renderPlate
}