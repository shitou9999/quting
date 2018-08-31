/**
 * Created by PVer on 2018/8/19.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Alert, Image, TouchableWithoutFeedback} from 'react-native';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Label from 'teaset/components/Label/Label'

import DateUtil from '../utils/DateUtil'

class BindPlateView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            storageArr: [],
        }
    }


    componentDidMount() {
        gStorage.storage.getAllDataForKey('APPROVAL+STATUS', status => {
            this.setState({
                storageArr: status
            })
        });
    }

    getValue(key) {
        let tempArr = this.state.storageArr || []
        let searchValue;
        for (let i = 0; i < tempArr.length; i++) {
            let tempKey = tempArr[i].key
            if (key === tempKey) {
                searchValue = tempArr[i].value
                break
            }
        }
        return searchValue
    }

    render() {
        const {plate, plateColor, approvalStatus, reason, owenerName, vehNo, drivingLic, panorama, sysTime} = this.props
        let opTime = DateUtil.formt(sysTime, 'yyyy-MM-dd HH:mm:ss');
        return (
            <TouchableWithoutFeedback onPress={()=>{
                this.props.itemClick && this.props.itemClick(plate)
            }}>
                <View style={{flex:1,flexDirection:'row',borderRadius:5,margin:5,backgroundColor:'white'}}>
                    <Image
                        source={{uri: 'https://www.baidu.com/img/bd_logo1.png'}}
                        style={{width: 88, height: 88,borderRadius:5,margin:5}}
                    />
                    <View style={{marginLeft:5,marginTop:10}}>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <View style={{flex:1,flexDirection:'row'}}>
                                <Image source={{uri: 'https://www.baidu.com/img/bd_logo1.png'}}
                                       style={{width: 18, height: 18}}
                                />
                                <Label size='md' type='detail' text={plate}/>
                            </View>
                            <Label size='md' type='detail' text={this.getValue(approvalStatus)}/>
                        </View>
                        <Label size='md' type='detail' text={`车主姓名:${owenerName}`}/>
                        <Label size='md' type='detail' text={opTime}/>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}


const styles = StyleSheet.create({
    rootStyle: {
        padding: 5,
        borderRadius: 5,
        borderColor: 'gray',
        borderWidth: 1,
        borderStyle: 'solid',
        backgroundColor: 'white',
        margin: 5
    },
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
    itemClick: PropTypes.func
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