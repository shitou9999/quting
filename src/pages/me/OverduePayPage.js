import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableWithoutFeedback, StatusBar} from 'react-native';
import PropTypes from 'prop-types'
import {commonStyle} from "../../constants/commonStyle"
import TitleBar from "../../components/base/TitleBar"
import Toast from "teaset/components/Toast/Toast"
import DynamicSearchView from '../../components/DynamicSearchView'


class OverduePayPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            valueCustom: ''
        }
    }

    _submitEditing = () => {
        Toast.message('9666666')
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <TitleBar title={'欠费补缴'}/>
                <DynamicSearchView submitEditing={this._submitEditing}/>

                <View style={{flex: 1, backgroundColor: commonStyle.orange}}>

                </View>
                <View style={{height: 50, backgroundColor: commonStyle.red}}>

                </View>
            </View>
        )
    }

}


export default OverduePayPage