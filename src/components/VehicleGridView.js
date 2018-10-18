/**
 * Created by PVer on 2018/8/19.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, Image, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Input, ListRow, Button, Overlay, Label, Toast} from "../components/teaset/index"
import Grid from 'react-native-grid-component'
import {commonStyle} from '../constants/commonStyle'

// 一些常量设置
const numColumns = 6 // 列数
const left = 5 // 左右边距
const top = 5 // 上下边距
const itemWH = (gScreen.screen_width - (numColumns + 1) * left) / numColumns // item大小


class VehicleGridView extends Component {

    static defaultProps = {}

    static propTypes = {
        titles: PropTypes.array.isRequired,
        flag: PropTypes.bool.isRequired,
        oneClick: PropTypes.func,
        twoClick: PropTypes.func,
        threeClick: PropTypes.func,
        fourClick: PropTypes.func,
        itemClick: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            data: generateRandomColorsArray(21),
        }
    }

// <View style={[{ backgroundColor: data }, styles.item]} key={i}/>
//     _renderItem = (data, i) => (
//         <TouchableOpacity onPress={() => {
//             this.props.itemClick && this.props.itemClick(data)
//         }}>
//             <View style={{height: 50, width: 50, justifyContent: commonStyle.center, alignItems: commonStyle.center}}>
//                 <Label text={data} size='md' type='title'/>
//             </View>
//         </TouchableOpacity>
//     )

    _renderRow = (data) => (
        <TouchableOpacity onPress={() => {
            this.props.itemClick && this.props.itemClick(data.item)
        }}>
            <View style={{height: 50, width: 50, justifyContent: commonStyle.center, alignItems: commonStyle.center}}>
                <Label text={data.item} size='md' type='title'/>
            </View>
        </TouchableOpacity>
    )

    // _renderPlaceholder = i => <View style={styles.item} key={i}/>

    _keyExtractor = (item, index) => index

    render() {
        let isShow = this.props.flag ?
            <View
                style={{
                    flexDirection: commonStyle.row,
                    justifyContent: commonStyle.around,
                    alignItems: commonStyle.center,
                    marginTop: commonStyle.marginTop
                }}>
                <TouchableOpacity onPress={() => {
                    this.props.oneClick && this.props.oneClick('苏')
                }}>
                    <Label text='苏' size='md' type='title'/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    this.props.twoClick && this.props.twoClick('沪')
                }}>
                    <Label text='沪' size='md' type='title'/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    this.props.threeClick && this.props.threeClick('皖')
                }}>
                    <Label text='皖' size='md' type='title'/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    this.props.fourClick && this.props.fourClick('浙')
                }}>
                    <Label text='浙' size='md' type='title'/>
                </TouchableOpacity>
            </View> : null
        return (
            <View style={{flex: 1}}>
                {isShow}
                {/*<Grid*/}
                {/*style={{flex: 1}}*/}
                {/*renderItem={this._renderItem}*/}
                {/*renderPlaceholder={this._renderPlaceholder}*/}
                {/*data={this.props.titles}*/}
                {/*itemsPerRow={6}*/}
                {/*itemHasChanged={(d1, d2) => d1 !== d2}*/}
                {/*/>*/}
                <FlatList
                    style={{backgroundColor: commonStyle.white}}
                    renderItem={this._renderRow}
                    data={this.props.titles}
                    keyExtractor={this._keyExtractor}
                    numColumns={numColumns}
                    columnWrapperStyle={styles.columnStyle}
                    horizontal={false}
                />
            </View>
        );
    }

//     onEndReached={() =>
//     this.setState({
//     data: [...this.state.data, ...generateRandomColorsArray(21)],
// })}

}

const styles = StyleSheet.create({
    item: {
        flex: 1,
        height: 160,
        margin: 1,
    },
    columnStyle: {
        // marginLeft: 10,
        // marginRight: 10
    },
    innerViewStyle: {
        width: itemWH,
        height: itemWH * 0.8,
        marginLeft: left,
        marginTop: top,
        // 文字内容居中对齐
        alignItems: 'center'
    },
    iconStyle: {
        width: itemWH,
        height: itemWH * 0.8,
    },
})


const colors = [
    '#F44336',
    '#E91E63',
]

function generateRandomColorsArray(length) {
    return Array.from(Array(length)).map(
        () => colors[Math.floor(Math.random() * colors.length)]
    )
}


export default VehicleGridView
