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
                    onSelect={(index, value) => this.onSelect(index, value)}>
                    <RadioButton Button value="路内"
                                 style={{
                                     alignItems: commonStyle.center,
                                     justifyContent: commonStyle.center
                                 }}>
                        <View style={{
                            alignItems: commonStyle.center,
                            justifyContent: commonStyle.center
                        }}>
                            <Image
                                source={require('../assets/images/pay_ali_pay.png')}
                                resizeMode='contain'
                                style={{width: 28, height: 28}}
                            />
                            <Label size='md' type='title' text='路内'/>
                        </View>
                    </RadioButton>
                    <RadioButton Button value="停车场"
                                 style={{
                                     alignItems: commonStyle.center,
                                     justifyContent: commonStyle.center,
                                 }}>
                        <View style={{
                            alignItems: commonStyle.center,
                            justifyContent: commonStyle.center
                        }}>
                            <Image
                                source={require('../assets/images/pay_we_chat.png')}
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


const styles = StyleSheet.create({
    rootStyle: {
        width: 80,
        borderRadius: 5,
        borderColor: commonStyle.white,
        borderWidth: 1,
        borderStyle: 'solid',
        backgroundColor: commonStyle.white,
    },
});


TypeChoiceView.propTypes = {
    // navigation: PropTypes.object.isRequired,
    parklotName: PropTypes.string,
    inTime: PropTypes.string,
    outTime: PropTypes.string,
    plate: PropTypes.string,
    plateColor: PropTypes.string,
    inPic: PropTypes.string,
    outPic: PropTypes.string,
};


TypeChoiceView.defaultProps = {
    parklotName: '',
    inTime: '',
    outTime: '',
    plate: '',
    plateColor: '',
    inPic: '',
    outPic: '',
};

export default TypeChoiceView
