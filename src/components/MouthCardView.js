/**
 * Created by PVer on 2018/8/19.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ImageBackground, Image} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import Label from 'teaset/components/Label/Label'
import Button from 'teaset/components/Button/Button'
import {commonStyle} from '../constants/commonStyle'
import * as ViewUtil from "../utils/ViewUtil"
import Feather from 'react-native-vector-icons/Feather'

class MouthCardView extends Component {

    static propTypes = {
        id: PropTypes.number,
        plate: PropTypes.string,
        plateColor: PropTypes.string,
        typ: PropTypes.string,
        price: PropTypes.number,
        term: PropTypes.number,
        range: PropTypes.string,
        validTime: PropTypes.string,
        invalidTime: PropTypes.string,
    }

    static defaultProps = {
        id: 0,
        plate: '',
        plateColor: '0',
        typ: '',
        price: 0,
        term: 0,
        range: '',
        validTime: '',
        invalidTime: '',
    }

    constructor(props) {
        super(props);
        this.state = {
            storageArr: [],
        }
    }

    componentDidMount() {
        gStorage.storage.getAllDataForKey('CARD+TYPE', status => {
            this.setState({
                storageArr: status
            })
        });
    }


    render() {
        const {id, plate, plateColor, type, price, term, range, validTime, invalidTime} = this.props
        return (
            <View style={{
                padding: 10,
                borderRadius: 5,
                backgroundColor: commonStyle.white,
                margin: 5,
            }}>
                <View style={{flexDirection: commonStyle.row, justifyContent: commonStyle.between}}>
                    <View style={{flexDirection: commonStyle.row, alignItems: commonStyle.center}}>
                        <Image source={{uri: 'https://www.baidu.com/img/bd_logo1.png'}}
                               style={{width: 30, height: 40}}
                        />
                        <Label size='md' type='title' text={plate} style={{marginLeft: 5}}/>
                        {ViewUtil.renderPlate(plateColor)}
                    </View>
                    <View style={{flexDirection: commonStyle.row, alignItems: commonStyle.center}}>
                        <Label size='xl' type='title' text={`￥${price}`}/>
                        <Label size='md' type='title' text={ViewUtil.getValue(this.state.storageArr, type, '*卡')}/>
                    </View>
                </View>
                <View style={{flexDirection: commonStyle.row, justifyContent: 'flex-end', marginTop: 30}}>
                    <Label size='md' type='title' text={`生效时间:${validTime}`}/>
                </View>
                <View style={{flexDirection: commonStyle.row, justifyContent: commonStyle.between}}>
                    <Label size='md' type='title' text={`NO:${id}`}/>
                    <Label size='md' type='title' text={`到期时间:${invalidTime}`}/>
                </View>

                <View style={{flexDirection: commonStyle.row, alignItems: commonStyle.center, flex: 3}}>
                    <View style={{flex: 2}}>
                        <Label size='md' type='title' text={`使用范围:${range}`}/>
                    </View>
                    <View style={{flex: 1}}>
                        <Feather name={'chevron-right'} size={20} color={commonStyle.lightGray}/>
                    </View>
                </View>
            </View>

        );
    }
}


// id (integer, optional): 卡编号,
// plate (string, optional): 车牌号码,
// plateColor (string, optional): 车牌颜色:数据字典——PLATE_COLOR,
// type (string, optional): 卡类型:数据字典——CARD_TYPE,
// price (number, optional): 价格：元,
// term (integer, optional): 有效期：天,
// range (string, optional): 适用范围,
// validTime (string, optional): 生效时间：YYYY-MM-DD,
// invalidTime (string, optional): 结束时间：YYYY-MM-DD

export default MouthCardView
