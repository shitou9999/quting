/**
 * Created by PVer on 2018/8/19.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Alert, Image, TouchableWithoutFeedback} from 'react-native';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Label from 'teaset/components/Label/Label'
import SegmentedView from 'teaset/components/SegmentedView/SegmentedView'
import VehicleGridView from './VehicleGridView'
import Toast from 'teaset/components/Toast/Toast'
import Button from 'teaset/components/Button/Button'
import Input from 'teaset/components/Input/Input'

import {commonStyle} from '../constants/commonStyle'

class UnbindPopView extends Component {

    // 默认属性
    static defaultProps = {};

    // 属性类型
    static propTypes = {
        userUnbindCar:PropTypes.func,
        userClose:PropTypes.func,
    };

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {

        }
    }


    render() {
        return (
            <View
                style={{
                        backgroundColor: commonStyle.white,
                        minWidth: 260,
                        borderRadius: 5,
                        justifyContent: commonStyle.center,
                        alignItems: commonStyle.center
                    }}>
                <View
                    style={{
                            height: 50,
                            width: 260,
                            borderTopLeftRadius: 5,
                            borderTopRightRadius: 5,
                            justifyContent: commonStyle.center,
                            alignItems: commonStyle.center
                        }}>
                    <Label text='注意'/>
                </View>
                <View
                    style={{
                            height: 50,
                            alignItems: commonStyle.center,
                            justifyContent: commonStyle.center
                        }}>
                    <Label text='解绑车辆会影响你的停车业务,确定解绑该车辆吗?'/>
                </View>
                <View style={{flexDirection: commonStyle.row, height: 50}}>
                    <Button title='取消' type='link'
                            style={{flex: 1}}
                            onPress={() => {
                                    this.props.userClose && this.props.userClose()
                                }}/>
                    <Button title='确定' type='link'
                            style={{flex: 1}}
                            onPress={() => {
                                    this.props.userUnbindCar && this.props.userUnbindCar()
                                }}/>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    rootStyle: {
        padding: 5,
        borderRadius: 5,
        borderColor: 'gray',
        borderWidth: 1,
        borderStyle: 'solid',
        backgroundColor: 'white',
        margin: 5
    },
});


export default UnbindPopView