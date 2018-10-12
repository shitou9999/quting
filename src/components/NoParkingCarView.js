/**
 * Created by PVer on 2018/8/19.
 */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Alert,
    Image,
    ImageBackground
} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import Label from 'teaset/components/Label/Label'
import Button from 'teaset/components/Button/Button'
import Ionicons from 'react-native-vector-icons/Ionicons'

import {commonStyle} from '../constants/commonStyle'
import {images} from "../assets";

/**
 * 无绑定无进行中
 */
class NoParkingCarView extends Component {

    static propTypes = {
        navigation: PropTypes.object.isRequired,
    }

    static defaultProps = {
        userName: ' ',
    }

    constructor(props) {
        super(props);
        this.state = {}
    }


    _userBindCar = () => {
        this.props.navigation.navigate('BindCarPage')
    }

    render() {
        return (
            <ImageBackground
                style={{height: 150,}}
                source={images.home_no_parking_car}
            >
                <View style={{
                    height: 150,
                    backgroundColor: commonStyle.clear,
                    justifyContent: commonStyle.center,
                    alignItems: commonStyle.center
                }}>
                    <Label style={{marginBottom: commonStyle.marginBottom, marginTop: commonStyle.marginTop}} size='md'
                           type='detail'
                           text='暂无车辆信息,请绑定车辆'/>
                    <Button style={{backgroundColor: commonStyle.blue, width: 150}} size='md'
                            onPress={this._userBindCar}>
                        <Ionicons name={'md-add'} size={20} color={commonStyle.white}/>
                        <Label style={{color: commonStyle.white, fontSize: 16, paddingLeft: 8}} text='绑定车辆'/>
                    </Button>
                </View>
            </ImageBackground>
        );
    }
}

export default NoParkingCarView
