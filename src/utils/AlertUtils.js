/**
 * Created by PVer on 2018/9/15.
 */
import {Component} from 'react'
import {
    Alert
} from 'react-native'

const showAlert = (msg) => {
    Alert.alert('提示', msg)
}

export {
    showAlert
}
