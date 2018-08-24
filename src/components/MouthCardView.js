/**
 * Created by PVer on 2018/8/19.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Alert, Image} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import Label from 'teaset/components/Label/Label'
import Button from 'teaset/components/Button/Button'

class MouthCardView extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    // static navigationOptions = ({ navigation }) => {
    //     return {
    //         title: navigation.getParam('otherParam', 'A Nested Details Screen'),
    //     };
    // };
    componentWillMount() {

    }


    render() {
        return (
            <View style={{
                padding:10,
                backgroundColor: 'white',
                borderRadius:5,
                margin:5
            }}>
                <View style={{backgroundColor:'yellow'}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Image source={{uri: 'https://www.baidu.com/img/bd_logo1.png'}}
                                   style={{width: 30, height: 40}}
                            />
                            <Label size='md' type='title' text='浙123452' style={{marginLeft:5}}/>
                            <Image source={{uri: 'https://www.baidu.com/img/bd_logo1.png'}}
                                   style={{width: 15, height: 15}}
                            />
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Label size='xl' type='title' text='$1000'/>
                            <Label size='md' type='title' text='月卡'/>
                        </View>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'flex-end',marginTop:30}}>
                        <Label size='md' type='title' text='生效时间:'/>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Label size='md' type='title' text='NO:'/>
                        <Label size='md' type='title' text='到期时间:'/>
                    </View>

                    <View style={{flexDirection:'row'}}>
                        <View style={{flex:2}}>
                            <Label size='md' type='title' text='使用范围:'/>
                        </View>
                        <Image source={{uri: 'https://www.baidu.com/img/bd_logo1.png'}}
                               style={{width: 15, height: 15,flex:1,marginRight:60}}
                        />
                    </View>
                </View>
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


MouthCardView.propTypes = {
    // actualMoney: PropTypes.number.isRequired,
    // chargeDeductionMoney: PropTypes.number.isRequired,
    // couponDeductionMoney: PropTypes.number.isRequired,
    // createTime: PropTypes.string.isRequired,
    // id: PropTypes.number.isRequired,
    // invalidTime: PropTypes.string.isRequired,
    // name: PropTypes.string.isRequired,
    // orderStatus: PropTypes.string.isRequired,
    // payableMoney: PropTypes.number.isRequired,
    // plate: PropTypes.string.isRequired,
    // plateColor: PropTypes.string.isRequired,
    // timeOrCode: PropTypes.number.isRequired,
    // typ: PropTypes.string.isRequired,
}

MouthCardView.defaultProps = {
    actualMoney: 0,
    chargeDeductionMoney: 0,
    couponDeductionMoney: 0,
    createTime: "",
    id: 0,
    invalidTime: "",
    name: "",
    orderStatus: "",
    payableMoney: 0,
    plate: "",
    plateColor: "0",
    timeOrCode: 0,
    typ: "1",
}


export default MouthCardView