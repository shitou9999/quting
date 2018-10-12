/**
 * Created by PVer on 2018/8/19.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Alert, Image, TouchableWithoutFeedback} from 'react-native';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Label from 'teaset/components/Label/Label'
import SegmentedView from 'teaset/components/SegmentedView/SegmentedView'
import VehicleGridView from './VehicleGridView'
import Button from 'teaset/components/Button/Button'
import Input from 'teaset/components/Input/Input'
import {commonStyle} from '../constants/commonStyle'
import {images} from "../assets"

let titles = ["京", "津", "渝", "冀", "豫",
    "云", "辽", "黑", "湘", "鲁", "新", "赣", "鄂", "桂", "甘",
    "晋", "蒙", "陕", "吉", "闽", "贵", "粤", "青", "藏", "川", "宁", "琼"]
let vehicleNum = ["A", "B", "C", "D", "E", "F",
    "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S",
    "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5",
    "6", "7", "8", "9"]
let specNum = ["杭", "州", "军", "空", "海", "北", "沈", "兰",
    "济", "南", "广", "成", "武", "警", "学", "消", "医", ".", "-", "#", "&",
    "@", "$", "*", "%", "(", ")", "[", "]", "{", "}"]

class VehicleKeyBordView extends Component {

    // 默认属性
    static defaultProps = {};

    // 属性类型
    static propTypes = {
        cancelBt: PropTypes.func,
        sureBt: PropTypes.func,
    };

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            valueReadonly: ''
        }
    }

    _itemClick = (content) => {
        let tempValue = this.state.valueReadonly
        this.setState({valueReadonly: `${tempValue}${content}`})
    }

    _oneClick = (content) => {
        let tempValue = this.state.valueReadonly
        this.setState({valueReadonly: `${tempValue}${content}`})
    }

    _twoClick = (content) => {
        let tempValue = this.state.valueReadonly
        this.setState({valueReadonly: `${tempValue}${content}`})
    }

    _threeClick = (content) => {
        let tempValue = this.state.valueReadonly
        this.setState({valueReadonly: `${tempValue}${content}`})
    }

    _fourClick = (content) => {
        let tempValue = this.state.valueReadonly
        this.setState({valueReadonly: `${tempValue}${content}`})
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <View
                    style={{
                        height: 50,
                        flexDirection: commonStyle.row,
                        justifyContent: commonStyle.between,
                        alignItems: commonStyle.center
                    }}>
                    <Input
                        style={{flex: 1, borderColor: commonStyle.white}}
                        editable={false}
                        placeholder='请输入车牌号码'
                        value={this.state.valueReadonly}
                    />
                    <TouchableWithoutFeedback onPress={() => {
                        let tempValue = this.state.valueReadonly
                        let deleteValue = tempValue.substring(0, tempValue.length - 1)
                        this.setState({
                            valueReadonly: deleteValue
                        })
                    }}>
                        <Image source={images.me_delete}
                               resizeMode='contain'
                               style={{width: 40, height: 30}}
                        />
                    </TouchableWithoutFeedback>
                </View>
                <SegmentedView
                    style={{flex: 1, height: 50}}
                    type={'projector'}
                    indicatorType={'boxWidth'}
                    indicatorLineColor={commonStyle.themeColor}
                    indicatorLineWidth={1}
                    indicatorPositionPadding={3}
                    activeIndex={this.state.activeIndex}
                    onChange={index => this.setState({activeIndex: index})}
                >
                    <SegmentedView.Sheet title='省份'>
                        <View style={{flex: 1, alignItems: commonStyle.center, justifyContent: commonStyle.center}}>
                            <VehicleGridView titles={titles}
                                             flag={true}
                                             itemClick={this._itemClick}
                                             oneClick={this._oneClick}
                                             twoClick={this._twoClick}
                                             threeClick={this._threeClick}
                                             fourClick={this._fourClick}/>
                        </View>
                    </SegmentedView.Sheet>
                    <SegmentedView.Sheet title='号码'>
                        <View style={{flex: 1, alignItems: commonStyle.center, justifyContent: commonStyle.center}}>
                            <VehicleGridView titles={vehicleNum}
                                             flag={false}
                                             itemClick={this._itemClick}/>
                        </View>
                    </SegmentedView.Sheet>
                    <SegmentedView.Sheet title='特殊'>
                        <View style={{flex: 1, alignItems: commonStyle.center, justifyContent: commonStyle.center}}>
                            <VehicleGridView titles={specNum}
                                             flag={false}
                                             itemClick={this._itemClick}/>
                        </View>
                    </SegmentedView.Sheet>
                </SegmentedView>
                <View style={{flexDirection: commonStyle.row, justifyContent: commonStyle.around,}}>
                    <Button title="取消"
                            size='lg'
                            style={{borderColor: commonStyle.white, flex: 1}}
                            onPress={() => {
                                this.props.cancelBt && this.props.cancelBt()
                            }}/>
                    <Button title="确定"
                            size='lg'
                            style={{
                                borderColor: commonStyle.orange,
                                borderRadius: 0,
                                flex: 1,
                                backgroundColor: commonStyle.orange
                            }}
                            onPress={() => {
                                this.props.sureBt && this.props.sureBt(this.state.valueReadonly)
                            }}/>
                </View>
            </View>
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


export default VehicleKeyBordView
