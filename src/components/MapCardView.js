/**
 * Created by PVer on 2018/8/19.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Alert, Image, TouchableWithoutFeedback} from 'react-native';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Label from 'teaset/components/Label/Label'
import Toast from 'teaset/components/Toast/Toast'
import Divide from '../components/base/Divide'

import {commonStyle} from '../constants/commonStyle'
import * as Constants from '../constants/Constants'

class MapCardView extends Component {

    // code (string, optional): 停车场编号,
    // name (string, optional): 停车场名称,
    // lat (number, optional): 纬度,
    // lng (number, optional): 经度,
    // berthTotalNum (integer, optional): 总泊位数,
    // berthEmptyNum (integer, optional): 空泊位数,
    // address (string, optional): 停车场地址,
    // distance (string, optional): 距离,
    // description  (string, optional): 收费规则描述

    static propTypes = {
        code: PropTypes.string,
        name: PropTypes.string,
        lat: PropTypes.number,
        lng: PropTypes.number,
        berthTotalNum: PropTypes.number,
        berthEmptyNum: PropTypes.number,
        address: PropTypes.string,
        distance: PropTypes.string,
        description: PropTypes.string,
    }

    static defaultProps = {
        code: 0,
        name: '',
        lat: 0,
        lng: 0,
        berthTotalNum: 0,
        berthEmptyNum: 0,
        address: '',
        distance: '0',
        description: '',
    }


    render() {
        return (
            <View style={styles.rootStyle}>
                <Label text={this.props.name} size={'md'} type={'title'}/>
                <View style={{
                    flexDirection: commonStyle.row,
                    justifyContent: commonStyle.around,
                    flex: 3,
                    height: 40,
                    alignItems: commonStyle.center
                }}>
                    <Label text={`空车位:${this.props.name}`} size={'md'} type={'title'} style={{flex: 1.1}}/>
                    <Label text={`里程:${this.props.berthEmptyNum}km`} size={'md'} type={'title'} style={{
                        flex: 0.8,
                        justifyContent: commonStyle.center,
                    }}/>
                    <Label text={`收费规则:${this.props.description}`} size={'md'} type={'title'} style={{flex: 1.1}}/>
                </View>
                <Divide orientation={'horizontal'} color={commonStyle.lineColor} width={commonStyle.lineHeight}/>
                <View style={{
                    flexDirection: commonStyle.row,
                    justifyContent: commonStyle.around,
                    height: 30,
                    alignItems: commonStyle.center,
                    marginTop: 5,
                }}>
                    <TouchableWithoutFeedback onPress={() => {
                        Toast.message('点击路线')
                    }}>
                        <View style={{flexDirection: commonStyle.row, alignItems: commonStyle.center}}>
                            <Label text={'路线'} size={'md'} type={'title'}/>
                            <Image source={require('../assets/images/map_route.png')}
                                   resizeMode={commonStyle.contain}
                                   style={{width: 15, height: 15}}/>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={{height: 30, width: commonStyle.lineWidth, backgroundColor: commonStyle.lineColor}}/>
                    <TouchableWithoutFeedback onPress={() => {
                        Toast.message('点击导航')
                    }}>
                        <View style={{flexDirection: commonStyle.row, alignItems: commonStyle.center}}>
                            <Label text={'导航'} size={'md'} type={'title'}/>
                            <Image source={require('../assets/images/map_navigation.png')}
                                   resizeMode={commonStyle.contain}
                                   style={{width: 15, height: 15}}/>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        );
    }


}


const styles = StyleSheet.create({
    rootStyle: {
        padding: 5,
        borderRadius: 5,
        borderColor: commonStyle.white,
        borderWidth: 1,
        borderStyle: 'solid',
        backgroundColor: commonStyle.white,
        margin: 5,
    },
});


export default MapCardView
