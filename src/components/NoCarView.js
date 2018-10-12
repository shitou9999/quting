/**
 * Created by PVer on 2018/8/19.
 */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Alert,
    ImageBackground
} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import Label from 'teaset/components/Label/Label'

import {commonStyle} from '../constants/commonStyle'
import {images} from "../assets";

/**
 * 有绑定无进行中
 */
class NoCarView extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }


    render() {
        const {navigation} = this.props;
        return (
            <ImageBackground
                style={{height: 150,}}
                source={images.home_no_bind_car}
            >
                <View style={{
                    height: 150,
                    backgroundColor: commonStyle.clear,
                    justifyContent: commonStyle.center,
                    alignItems: commonStyle.center
                }}>
                    <Label style={{marginBottom: commonStyle.marginBottom, marginTop: commonStyle.marginTop}} size='lg'
                           type='detail'
                           text='暂无停车信息'/>
                </View>
            </ImageBackground>
        );
    }
}


export default NoCarView
