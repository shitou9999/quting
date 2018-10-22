import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    DeviceEventEmitter,
} from 'react-native';
import ProPtypes from 'prop-types'
import {Label} from './teaset/index'
import {commonStyle} from "../constants/commonStyle";


class MsgItemView extends Component {

    static propTypes = {
        title: ProPtypes.string,
        text: ProPtypes.string,
        date: ProPtypes.string,
    }

    static defaultProps = {
        title: '',
        text: '',
        date: '',
    }

    render() {
        return (
            <View style={{
                borderRadius: 5,
                margin: commonStyle.margin - 5,
                padding: commonStyle.padding - 5,
                backgroundColor: commonStyle.white
            }}>
                <Label text={`标题:${this.props.title}`} size={'md'} type={'title'}/>
                <Label text={`内容:${this.props.text}`} size={'md'} type={'title'}/>
                <Label text={`推送日期:${this.props.date}`} size={'md'} type={'title'}/>
            </View>
        )
    }

}

export default MsgItemView
