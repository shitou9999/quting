/**
 * Created by PVer on 2018/8/19.
 */
import React, {PureComponent} from 'react';
import {Platform, StyleSheet, Text, View, Alert, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Label from 'teaset/components/Label/Label'
import Button from 'teaset/components/Button/Button'
import {StateImage} from '../components/base/StateImage'

import * as DateUtil from '../utils/DateUtil'
import {commonStyle} from '../constants/commonStyle'
import * as Constants from '../constants/Constants'
import * as ViewUtil from '../utils/ViewUtil'

class BindPlateView extends PureComponent {

    static propTypes = {
        plate: PropTypes.string,
        plateColor: PropTypes.string,
        approvalStatus: PropTypes.string,
        reason: PropTypes.string,
        owenerName: PropTypes.string,
        vehNo: PropTypes.string,
        drivingLic: PropTypes.string,
        panorama: PropTypes.string,
        sysTime: PropTypes.number,
        itemClick: PropTypes.func,
        itemLongClick: PropTypes.func
    }

    static defaultProps = {
        plate: '',
        plateColor: '0',
        approvalStatus: '',
        reason: '',
        owenerName: '',
        vehNo: '',
        drivingLic: '',
        panorama: '',
        sysTime: 0,
    }

    constructor(props) {
        super(props);
        this.state = {
            storageArr: [],
        }
    }

    componentDidMount() {
        gStorage.getAllDataForKey('APPROVAL+STATUS', status => {
            this.setState({
                storageArr: status
            })
        });
    }

    render() {
        const {plate, plateColor, approvalStatus, reason, owenerName, vehNo, drivingLic, panorama, sysTime} = this.props
        let opTime = DateUtil.formt(sysTime, 'yyyy-MM-dd HH:mm:ss')
        let tempOwenerName = owenerName === null ? "" : owenerName
        let loadUrl = Constants.loadUrl
        let itemCar = {
            plate, plateColor, approvalStatus, reason, owenerName, vehNo, drivingLic, panorama, sysTime
        }
        let tempArr = this.state.storageArr || []
        return (
            <TouchableWithoutFeedback
                onPress={() => {
                    this.props.itemClick && this.props.itemClick(itemCar)
                }}
                onLongPress={() => {
                    this.props.itemLongClick && this.props.itemLongClick(plate, plateColor)
                }}
            >
                <View
                    style={styles.itemStyle}>
                    <StateImage
                        url={`${loadUrl}${panorama}`}
                        style={{width: 88, height: 88, borderRadius: 5, margin: 5}}
                    />
                    <View style={{flex: 1, marginLeft: 5, marginTop: commonStyle.marginTop}}>
                        <View
                            style={{flexDirection: commonStyle.row, justifyContent: commonStyle.between}}>
                            <View
                                style={{flexDirection: commonStyle.row, alignItems: commonStyle.center}}>
                                {ViewUtil.renderPlate(plateColor)}
                                <Label size='md' type='detail' text={plate}/>
                            </View>
                            <View style={{marginRight: commonStyle.marginRight}}>
                                <Button title={ViewUtil.getValue(tempArr, parseInt(approvalStatus), '***')}
                                        size='xs'
                                        disabled={true}/>
                            </View>
                        </View>
                        <Label size='md' type='detail' text={`车主姓名:${tempOwenerName}`}/>
                        <Label size='md' type='detail' text={opTime}/>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}


const styles = StyleSheet.create({
    itemStyle: {
        flexDirection: commonStyle.row,
        borderRadius: 5,
        margin: 5,
        backgroundColor: commonStyle.white
    }
})


export default BindPlateView
