/**
 * Created by PVer on 2018/8/19.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Alert, Image} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import Label from 'teaset/components/Label/Label'
import Button from 'teaset/components/Button/Button'
import DashLine from './DashLine'
import {commonStyle} from '../constants/commonStyle'

class CouponView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            storageArr: [],
        }
    }

    componentDidMount() {
        gStorage.storage.getAllDataForKey('COUPON+TYPE', status => {
            this.setState({
                storageArr: status
            })
        });
    }

    getValue(key) {
        let tempArr = this.state.storageArr || []
        let searchValue = '优惠券';
        for (let i = 0; i < tempArr.length; i++) {
            let tempKey = tempArr[i].key
            // console.log(typeof tempKey) //number
            // console.log(typeof key) //string
            if (key == tempKey) {
                searchValue = tempArr[i].value
                break
            }
        }
        return searchValue
    }

// {
//     "lookupName": "COUPON_TYPE",
//     "lookupKey": "1",
//     "lookupValue": "代金券"
// },
// {
//     "lookupName": "COUPON_TYPE",
//     "lookupKey": "2",
//     "lookupValue": "次券"
// },

    render() {
        const {
            couponCode, couponType, couponFee, validTime, invalidTime, rangeName
        } = this.props;
        let couponTypeComponent = couponType === 1 ? <Label size='lg' type='title' text={`￥${couponFee}`}/> :
            <Label size='md' type='title' text={`免费停车1次`}/>
        return (
            <View style={{
                padding:10,
                backgroundColor: commonStyle.white,
                borderRadius:5,
                margin:5,
                flexDirection:commonStyle.row,
                flex:5
            }}>
                <View style={{justifyContent:commonStyle.between,flex:3,marginRight:commonStyle.marginRight}}>
                    <View>
                        <Label size='lg' type='title' text={this.getValue(couponType)}/>
                        <Label size='md' type='detail' text={`有效期:${validTime}至${invalidTime}`}/>
                        <DashLine backgroundColor={'red'} len={20} width={105} height={10} flexDirection={'row'}/>
                    </View>
                    <View style={{flexDirection:commonStyle.row,alignItems:commonStyle.center,marginTop:50}}>
                        <Label size='md' type='detail' text={`使用范围:${rangeName}`} style={{flex:1}}/>
                        <View
                            style={{borderRadius:15,borderColor:commonStyle.blue,borderWidth:1,
                            paddingLeft:10,paddingRight:10,paddingTop:3,paddingBottom:3}}>
                            <Text>停车场</Text>
                        </View>
                    </View>
                </View>
                <DashLine backgroundColor={'red'} len={20} width={2} height={120} flexDirection={'column'}/>
                <View style={{flex:2,justifyContent:commonStyle.center,alignItems:commonStyle.center}}>
                    {couponTypeComponent}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});

// couponCode (integer, optional): 优惠券编号,
//     couponType (integer, optional): 优惠券类型:数据字典--COUPON_TYPE,
//     couponFee (number, optional): 优惠券金额 元,
//     validTime (string, optional): 优惠券开始时间：YYYY-MM-DD,
//     invalidTime (string, optional): 优惠券结束时间：YYYY-MM-DD,
//     rangeName (string, optional): 适用停车场名称
CouponView.propTypes = {
    couponCode: PropTypes.number.isRequired,
    couponType: PropTypes.number.isRequired,
    couponFee: PropTypes.number.isRequired,
    validTime: PropTypes.string.isRequired,
    invalidTime: PropTypes.string.isRequired,
    rangeName: PropTypes.string.isRequired,
}

CouponView.defaultProps = {
    couponCode: 0,
    couponType: 0,
    couponFee: 0,
    validTime: '',
    invalidTime: '',
    rangeName: '',
}


export default CouponView