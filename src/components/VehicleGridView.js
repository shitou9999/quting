/**
 * Created by PVer on 2018/8/19.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Alert, Image, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Input, ListRow, Button, Overlay, Label, Toast} from "../components/teaset/index"
import Grid from 'react-native-grid-component'
import {commonStyle} from '../constants/commonStyle'

class VehicleGridView extends Component {

    // 默认属性
    static defaultProps = {};

    // 属性类型
    static propTypes = {
        titles: PropTypes.array.isRequired,
        flag: PropTypes.bool.isRequired,
        oneClick: PropTypes.func,
        twoClick: PropTypes.func,
        threeClick: PropTypes.func,
        fourClick: PropTypes.func,
        itemClick: PropTypes.func.isRequired,
    };

    // 构造
    constructor(props) {
        super(props);
        this.state = {
            data: generateRandomColorsArray(21),
        };
    }

// <View style={[{ backgroundColor: data }, styles.item]} key={i}/>
    _renderItem = (data, i) => (
        <TouchableOpacity onPress={() => {
            this.props.itemClick && this.props.itemClick(data)
        }}>
            <View style={{height: 50, width: 50, justifyContent: commonStyle.center, alignItems: commonStyle.center}}>
                <Label text={data} size='md' type='title'/>
            </View>
        </TouchableOpacity>
    );

    _renderPlaceholder = i => <View style={styles.item} key={i}/>;

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
            <View>
                {isShow}
                <Grid
                    style={styles.list}
                    renderItem={this._renderItem}
                    renderPlaceholder={this._renderPlaceholder}
                    data={this.props.titles}
                    itemsPerRow={6}
                    itemHasChanged={(d1, d2) => d1 !== d2}
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
    list: {
        flex: 1,
    },
});

// Helper functions
// thanks materialuicolors.co
const colors = [
    '#F44336',
    '#E91E63',
    '#9C27B0',
    '#673AB7',
    '#3F51B5',
    '#2196F3',
    '#03A9F4',
    '#00BCD4',
    '#009688',
    '#4CAF50',
    '#8BC34A',
    '#CDDC39',
    '#FFEB3B',
    '#FFC107',
    '#FF9800',
    '#FF5722',
    '#795548',
    '#9E9E9E',
    '#607D8B',
];

function generateRandomColorsArray(length) {
    return Array.from(Array(length)).map(
        () => colors[Math.floor(Math.random() * colors.length)]
    );
}


export default VehicleGridView
