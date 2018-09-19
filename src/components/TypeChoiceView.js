/**
 * Created by PVer on 2018/8/19.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Alert, Image} from 'react-native';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Label from 'teaset/components/Label/Label'
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'

import {commonStyle} from '../constants/commonStyle'
import * as Constants from '../constants/Constants'

class TypeChoiceView extends Component {

    static propTypes = {
        selectClick: PropTypes.func,
    }

    constructor(props) {
        super(props);
        this.onSelect = this.onSelect.bind(this)
        this.state = {
            selectIndex: 0,
        }
    }

    onSelect(index, value) {
        this.setState({
            selectIndex: index,
        })
    }

//     activeBgColor={commonStyle.blue}
// inactiveBgColor={commonStyle.green}
    render() {
        return (
            <View style={styles.rootStyle}>
                <RadioGroup
                    thickness={0}
                    size={0}
                    selectedIndex={0}
                    highlightColor={commonStyle.red}
                    style={{backgroundColor: commonStyle.white}}
                    onSelect={(index, value) => {
                        this.onSelect(index, value)
                        this.props.selectClick && this.props.selectClick(index)
                    }}>
                    <RadioButton Button value="路 内">
                        <View style={{
                            alignItems: commonStyle.center,
                            justifyContent: commonStyle.center
                        }}>
                            <Image
                                source={require('../assets/images/map_road_select.png')}
                                resizeMode='contain'
                                style={{width: 28, height: 28}}
                            />
                            <Label size='md' type='title' text='路内'/>
                        </View>
                    </RadioButton>
                    <RadioButton Button value="停车场">
                        <View style={{
                            alignItems: commonStyle.center,
                            justifyContent: commonStyle.center
                        }}>
                            <Image
                                source={require('../assets/images/map_parking_select.png')}
                                resizeMode='contain'
                                style={{width: 28, height: 28}}
                            />
                            <Label size='md' type='title' text='停车场'/>
                        </View>
                    </RadioButton>
                </RadioGroup>
            </View>
        );
    }
}

// style={{
//     alignItems: commonStyle.center,
//         justifyContent: commonStyle.center,
// }}

const styles = StyleSheet.create({
    rootStyle: {
        width: 70,
        borderRadius: 5,
        borderColor: commonStyle.white,
        borderWidth: 1,
        borderStyle: 'solid',
        backgroundColor: commonStyle.white,
    },
});

export default TypeChoiceView
