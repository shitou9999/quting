/**
 * Created by PVer on 2018/8/19.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Alert, Image, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import VehicleGridView from './VehicleGridView'
import {Input, ListRow, Button, Overlay, Label, Toast, SegmentedView} from "../components/teaset/index"
import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from 'react-native-scrollable-tab-view'
import {commonStyle} from '../constants/commonStyle'
import {images} from "../assets"
import CustomTabBar from "./base/tabbar/CustomTabBar"
import TabBar from "./base/tabbar/TabBar"
import Feather from 'react-native-vector-icons/Feather'


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
        let tabs = [
            {name: '省份'},
            {name: '号码'},
            {name: '特殊'},
        ];
        Object.assign(this.state, {
            tabs,
            activeIndex: 0,
            fromIndex: 0
        });
    }

    renderNavBar = props => {
        return (
            <TabBar
                backgroundColor={commonStyle.white}
                activeTextColor={commonStyle.activeTextColor}
                fromIndex={this.state.fromIndex}
                inactiveTextColor={commonStyle.inactiveTextColor}
                underlineStyle={commonStyle.underlineStyle}
                tabContainerWidth={210}
                style={{
                    width: gScreen.screen_width,
                    paddingTop: 10,
                    borderBottomWidth: 0
                }}
                {...props}
                tabs={this.state.tabs}
            />
        )
    }

    onChangeTab = ({i, ref, from}) => {
        if (this.state.activeIndex !== i) {
            this.setState({
                activeIndex: i,
                fromIndex: from
            })
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
                        style={{flex: 1, borderColor: commonStyle.white, color: commonStyle.black, fontSize: 20}}
                        editable={false}
                        placeholder='请输入车牌号码'
                        value={this.state.valueReadonly}
                    />
                    <TouchableOpacity onPress={() => {
                        let tempValue = this.state.valueReadonly
                        let deleteValue = tempValue.substring(0, tempValue.length - 1)
                        this.setState({
                            valueReadonly: deleteValue
                        })
                    }}>
                        <Feather name={'delete'} size={35} color={commonStyle.themeColor}
                                 style={{marginRight: commonStyle.marginRight - 5}}/>
                    </TouchableOpacity>
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
                <View style={{
                    flexDirection: commonStyle.row,
                    justifyContent: commonStyle.around,
                    marginTop: commonStyle.marginTop - 5
                }}>
                    <Button title="取消"
                            size='lg'
                            style={{borderColor: commonStyle.white, flex: 1}}
                            onPress={() => {
                                this.props.cancelBt && this.props.cancelBt()
                            }}/>
                    <Button title="确定"
                            size='lg'
                            style={{
                                borderRadius: 0,
                                flex: 1,
                                borderColor: commonStyle.themeColor,
                                backgroundColor: commonStyle.themeColor,
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
