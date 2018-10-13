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
import {images} from "../assets";

class RecordView extends Component {

    static propTypes = {
        recordCode: PropTypes.string,
        parklotName: PropTypes.string,
        inTime: PropTypes.string,
        outTime: PropTypes.string,
        plate: PropTypes.string,
        plateColor: PropTypes.string,
        inPic: PropTypes.string,
        outPic: PropTypes.string,
        itemClick: PropTypes.func,
    }

    static defaultProps = {
        recordCode: '',
        parklotName: '',
        inTime: '',
        outTime: '',
        plate: '',
        plateColor: '',
        inPic: '',
        outPic: '',
    }

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        let {recordCode, parklotName, inTime, outTime, plate, plateColor, inPic, outPic} = this.props
        let item = {recordCode, parklotName, inTime, outTime, plate, plateColor, inPic, outPic}
        let loadUrl = Constants.loadUrl
        return (
            <TouchableOpacity onPress={() => {
                this.props.itemClick && this.props.itemClick(item)
            }}>
                <View style={styles.rootStyle}>
                    <View style={{flexDirection: commonStyle.row}}>
                        <StateImage
                            url={`${loadUrl}${inPic}`}
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
                            <Image source={images.img_in}
                                   resizeMode='contain'
                                   style={{width: 15, height: 15}}
                            />
                            <Label size='md' type='title' text={`驶入时间:${inTime}`}/>
                        </View>
                        <View style={{flexDirection: commonStyle.row, alignItems: commonStyle.center}}>
                            <Image source={images.img_out}
                                   resizeMode='contain'
                                   style={{width: 15, height: 15}}
                            />
                            <Label size='md' type='title' text={`离开时间:${outTime}`}/>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>

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
    }
})


export default RecordView
