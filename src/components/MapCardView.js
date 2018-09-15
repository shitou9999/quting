/**
 * Created by PVer on 2018/8/19.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Alert, Image} from 'react-native';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Label from 'teaset/components/Label/Label'

import {commonStyle} from '../constants/commonStyle'
import * as Constants from '../constants/Constants'

class MapCardView extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <View style={styles.rootStyle}>
                <Label text={'测试停车场dd'} size={'md'} type={'title'}/>
                <View style={{flexDirection: commonStyle.row, justifyContent: commonStyle.around}}>
                    <Label text={'空车位'} size={'md'} type={'title'}/>
                    <Label text={'里程'} size={'md'} type={'title'}/>
                    <Label text={'收费规则'} size={'md'} type={'title'}/>
                </View>
                <View style={{flexDirection: commonStyle.row, justifyContent: commonStyle.around}}>
                    <Label text={'路线'} size={'md'} type={'title'}/>
                    <Label text={'导航'} size={'md'} type={'title'}/>
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
        margin: 5
    },
});

// recordCode (string, optional): 停车记录编号,
//     parklotCode (string, optional): 停车场编号,
//     parklotName (string, optional): 停车场名称,
//     berthCode (string, optional): 泊位编号,
//     plate (string, optional): 车牌号码,
//     plateColor (string, optional): 车牌颜色:数据字典(dclot平台)--PLATE_COLOR,
//     inTime (string, optional): 进场时间，格式：yyyy-MM-dd HH:mm:ss,
//     outTime (string, optional): 出场时间，格式：yyyy-MM-dd HH:mm:ss,
//     inPic (string, optional): 车进图片,
//     outPic (string, optional): 车出图片

MapCardView.propTypes = {
    // navigation: PropTypes.object.isRequired,
    parklotName: PropTypes.string,
    inTime: PropTypes.string,
    outTime: PropTypes.string,
    plate: PropTypes.string,
    plateColor: PropTypes.string,
    inPic: PropTypes.string,
    outPic: PropTypes.string,
};


MapCardView.defaultProps = {
    parklotName: '',
    inTime: '',
    outTime: '',
    plate: '',
    plateColor: '',
    inPic: '',
    outPic: '',
};

export default MapCardView
