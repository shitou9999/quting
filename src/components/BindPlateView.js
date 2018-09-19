/**
 * Created by PVer on 2018/8/19.
 */
import React, {PureComponent} from 'react';
import {Platform, StyleSheet, Text, View, Alert, Image, TouchableWithoutFeedback} from 'react-native';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Label from 'teaset/components/Label/Label'
import Button from 'teaset/components/Button/Button'
import ImageView from '../components/ImageView'

import * as DateUtil from '../utils/DateUtil'
import {commonStyle} from '../constants/commonStyle'
import * as Constants from '../constants/Constants'
import * as ViewUtil from '../utils/ViewUtil'

class BindPlateView extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            storageArr: [],
        }
    }

    componentDidMount() {
        gStorage.storage.getAllDataForKey('APPROVAL+STATUS', status => {
            status.forEach((item) => {
                console.log(item)
            });
            this.setState({
                storageArr: status
            })
        });
    }

//     onLongPress={()=>{
//     this.props.itemLongClick && this.props.itemLongClick(plate,plateColor)
// }}

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
            <TouchableWithoutFeedback onPress={() => {
                this.props.itemClick && this.props.itemClick(itemCar)
            }}
            >
                <View
                    style={styles.itemStyle}>
                    <ImageView
                        source={{uri: `${loadUrl}${panorama}`}}
                        placeholderSource={require('../assets/images/me_car_empty.png')}
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
                                <Button title={ViewUtil.getValue(tempArr, approvalStatus, '***')}
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
});

//     plate (string, optional): 车牌号码,
//     plateColor (string, optional): 车牌颜色:数据字典(member平台)--PLATE_COLOR,
//     approvalStatus (string, optional): 认证状态： 0-未认证 1-审核中 2-已通过 3-未通过（数据字典(member平台)：APPROVAL_STATUS）,
//     reason (string, optional): 审核失败原因,
//     owenerName (string, optional): 车主姓名,
//     vehNo (string, optional): 车架号,
//     drivingLic (string, optional): 行驶证照片,
//     panorama (string, optional): 车辆全景图片,
//     sysTime (integer, optional): 系统时间,毫秒数

BindPlateView.propTypes = {
    // navigation: PropTypes.object.isRequired,
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
};


BindPlateView.defaultProps = {
    plate: '',
    plateColor: '',
    approvalStatus: '',
    reason: '',
    owenerName: '',
    vehNo: '',
    drivingLic: '',
    panorama: '',
    sysTime: '',
};

export default BindPlateView
