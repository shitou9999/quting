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
    Image
} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import Label from 'teaset/components/Label/Label'
import Button from 'teaset/components/Button/Button'

/**
 * 无绑定无进行中
 */
class NoParkingCarView extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentWillMount() {

    }

    _userBindCar = () => {
        const {navigation} = this.props;
        navigation.navigate('BindCarPage')
    }

    render() {
        const {navigation} = this.props;
        return (
            <View style={{
                height: 130,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Label style={{marginTop: 5, marginBottom: 10, marginTop: 10}} size='md' type='detail'
                       text='暂无车辆信息,请绑定车辆'/>
                <Button style={{backgroundColor: 'blue', width: 150}} size='md' onPress={this._userBindCar}>
                    <Image style={{width: 16, height: 16, tintColor: '#8a6d3b'}}
                           source={{uri: 'https://www.baidu.com/img/bd_logo1.png'}}/>
                    <Label style={{color: 'white', fontSize: 16, paddingLeft: 8}} text='绑定车辆'/>
                </Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});


NoParkingCarView.propTypes = {
    navigation: PropTypes.object.isRequired,
};


NoParkingCarView.defaultProps = {
    userName: ' ',
};

export default NoParkingCarView