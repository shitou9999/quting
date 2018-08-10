/**
 * Created by cyh on 2018/7/19.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import PropTypes from 'prop-types';
// orientation: PropTypes.oneOfType(['horizontal', 'vertical']), //方向
//     width: PropTypes.number, //宽度
//     color: PropTypes.string,//颜色

export default class Divide extends Component {

    static orientations = {
        horizontal: 'horizontal',
        vertical: 'vertical'
    }

    static propTypes = {
        orientation: PropTypes.oneOfType(['horizontal', 'vertical']), //方向
        width: PropTypes.number, //宽度
        color: PropTypes.string,//颜色
    }

    static defaultProps = {
        orientation: 'horizontal',
        width: StyleSheet.hairlineWidth,
        color: '#EFEFF4',
    }

    render() {
        let propsA = Object.assign({}, this.props);
        propsA.style = propsA.style ? propsA.style : {};

        if (propsA.orientation && propsA.orientation === 'horizontal') {
            propsA.style = Object.assign(propsA.style, {height: propsA.width});
        } else {
            propsA.style = Object.assign(propsA.style, {width: propsA.width});
        }
        propsA.style = Object.assign(propsA.style, {backgroundColor: propsA.color});

        return (
            <View style={propsA.style}/>
        );
    }
}