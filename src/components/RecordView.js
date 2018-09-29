/**
 * Created by PVer on 2018/8/19.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Alert, Image} from 'react-native';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Label from 'teaset/components/Label/Label'
import ImageView from '../components/base/ImageView'

import {commonStyle} from '../constants/commonStyle'
import * as Constants from '../constants/Constants'
import * as ViewUtil from '../utils/ViewUtil'

class RecordView extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        let {parklotName, inTime, outTime, plate, plateColor, inPic, outPic} = this.props
        let loadUrl = Constants.loadUrl
        return (
            <View style={styles.rootStyle}>
                <View style={{flexDirection: commonStyle.row}}>
                    <ImageView source={{uri: `${loadUrl}${inPic}`}}
                               placeholderSource={require('../assets/images/me_car_empty.png')}
                               style={{width: 80, height: 80, borderRadius: 5}}
                    />
                    <View style={{marginLeft: 5}}>
                        <Label size='md' type='title' text={parklotName}/>
                        <View style={{flexDirection: commonStyle.row, alignItems: commonStyle.center}}>
                            {ViewUtil.renderPlate(plateColor)}
                            <Label size='md' type='title' text={plate}/>
                        </View>
                    </View>
                </View>
                <View style={{marginTop: commonStyle.marginTop}}>
                    <View style={{flexDirection: commonStyle.row, alignItems: commonStyle.center}}>
                        <Image source={require('../assets/images/img_in.png')}
                               resizeMode='contain'
                               style={{width: 15, height: 15}}
                        />
                        <Label size='md' type='title' text={`驶入时间:${inTime}`}/>
                    </View>
                    <View style={{flexDirection: commonStyle.row, alignItems: commonStyle.center}}>
                        <Image source={require('../assets/images/img_out.png')}
                               resizeMode='contain'
                               style={{width: 15, height: 15}}
                        />
                        <Label size='md' type='title' text={`离开时间:${outTime}`}/>
                    </View>
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
    welcome: {
        fontSize: 20,
        textAlign: commonStyle.center,
        margin: commonStyle.margin,
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

RecordView.propTypes = {
    // navigation: PropTypes.object.isRequired,
    parklotName: PropTypes.string,
    inTime: PropTypes.string,
    outTime: PropTypes.string,
    plate: PropTypes.string,
    plateColor: PropTypes.string,
    inPic: PropTypes.string,
    outPic: PropTypes.string,
};


RecordView.defaultProps = {
    parklotName: '',
    inTime: '',
    outTime: '',
    plate: '',
    plateColor: '',
    inPic: '',
    outPic: '',
};

export default RecordView
