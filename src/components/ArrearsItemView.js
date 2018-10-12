/**
 * Created by PVer on 2018/8/19.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Label from 'teaset/components/Label/Label'
import {StateImage} from "./base/StateImage"
import {commonStyle} from '../constants/commonStyle'
import * as Constants from '../constants/Constants'
import * as ViewUtil from '../utils/ViewUtil'
import {images} from "../assets"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default class ArrearsItemView extends Component {

    static propTypes = {
        arrearCode: PropTypes.string,//欠费记录编号
        sectionCode: PropTypes.string,//路段编号
        sectionName: PropTypes.string,//路段编号
        berthCode: PropTypes.string,
        plate: PropTypes.string,
        plateColor: PropTypes.string,
        arrearMoney: PropTypes.number,
        startTime: PropTypes.string,
        endTime: PropTypes.string,
        pic1: PropTypes.string,
        pic2: PropTypes.string,
        isSelect: PropTypes.bool,
        itemClick: PropTypes.func
    }

    static defaultProps = {
        arrearCode: '',
        sectionCode: '',
        sectionName: '',
        berthCode: '',
        plate: '',
        plateColor: '',
        arrearMoney: 0,
        startTime: '',
        endTime: '',
        pic1: '',
        pic2: '',
        isSelect: false,
    }

//checkbox-blank-circle-outline
    //check-circle
    render() {
        let {arrearCode, sectionCode, sectionName, berthCode, plate, plateColor, arrearMoney, startTime, endTime, pic1, pic2, isSelect} = this.props
        let loadUrl = Constants.loadUrl
        return (
            <TouchableOpacity onPress={() => {
                this.props.itemClick && this.props.itemClick(arrearCode, arrearMoney, isSelect)
            }}>
                <View style={styles.rootStyle}>
                    <View style={{alignItems: commonStyle.center, justifyContent: commonStyle.center}}>
                        <MaterialCommunityIcons name={isSelect ? 'check-circle' : 'checkbox-blank-circle-outline'}
                                                size={25}
                                                color={commonStyle.themeColor}/>
                    </View>
                    <View style={{flex: 1, marginLeft: commonStyle.marginLeft - 5}}>
                        <View style={{flexDirection: commonStyle.row, justifyContent: commonStyle.between}}>
                            <View style={{flexDirection: commonStyle.row}}>
                                <StateImage
                                    url={`${loadUrl}${pic1}`}
                                    style={{width: 80, height: 80, borderRadius: 5}}
                                />
                                <View style={{marginLeft: 5}}>
                                    <Label size='md' type='title' text={sectionName}/>
                                    <View style={{flexDirection: commonStyle.row, alignItems: commonStyle.center}}>
                                        {ViewUtil.renderPlate(plateColor)}
                                        <Label size='md' type='title' text={plate}/>
                                    </View>
                                </View>
                            </View>
                            <View style={{flexDirection: commonStyle.row, alignItems: commonStyle.center}}>
                                <Label text={arrearMoney} size={'lg'} style={{color: commonStyle.themeColor}}/>
                                <Label text={'元'} size={'md'}/>
                            </View>
                        </View>
                        <View style={{marginTop: commonStyle.marginTop}}>
                            <View style={{flexDirection: commonStyle.row, alignItems: commonStyle.center}}>
                                <Image source={images.img_in}
                                       resizeMode='contain'
                                       style={{width: 15, height: 15}}
                                />
                                <Label size='md' type='title' text={`驶入时间:${startTime}`}/>
                            </View>
                            <View style={{flexDirection: commonStyle.row, alignItems: commonStyle.center}}>
                                <Image source={images.img_out}
                                       resizeMode='contain'
                                       style={{width: 15, height: 15}}
                                />
                                <Label size='md' type='title' text={`离开时间:${endTime}`}/>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}


const styles = StyleSheet.create({
    rootStyle: {
        flexDirection: commonStyle.row,
        padding: 5,
        borderRadius: 5,
        borderColor: commonStyle.white,
        borderWidth: 1,
        borderStyle: 'solid',
        backgroundColor: commonStyle.white,
        margin: 5
    },
});



