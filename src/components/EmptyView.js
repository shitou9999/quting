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

class EmptyView extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }


    render() {
        const {navigation} = this.props
        return (
            <View style={{
                flex: 1,
                justifyContent: commonStyle.center,
                alignItems: commonStyle.center,
                marginTop: 230,
            }}>
                <Label size='lg'
                       type='detail'
                       text='暂无数据'/>
            </View>
        );
    }
}


export default EmptyView