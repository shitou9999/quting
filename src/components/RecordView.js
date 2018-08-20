/**
 * Created by PVer on 2018/8/19.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Alert, Image} from 'react-native';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Label from 'teaset/components/Label/Label'

/**
 * 停车记录
 */
class RecordView extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentWillMount() {

    }

    //在props被改变时更新一些东西
    componentWillReceiveProps(nextProps) {

    }

    render() {
        let {parklotName, inTime, outTime, plate, plateColor, inPic, outPic} = this.props
        return (
            <View style={styles.rootStyle}>
                <View style={{flexDirection: 'row'}}>
                    <Image source={{uri: 'https://www.baidu.com/img/bd_logo1.png'}}
                           style={{width: 80, height: 80,borderRadius:5}}
                    />
                    <View style={{marginLeft: 5}}>
                        <Label size='md' type='title' text={parklotName}/>
                        <View style={{flexDirection: 'row'}}>
                            <Image source={{uri: 'https://www.baidu.com/img/bd_logo1.png'}}
                                   style={{width: 15, height: 15}}
                            />
                            <Label size='md' type='title' text={plate}/>
                        </View>
                    </View>
                </View>
                <View style={{marginTop: 10}}>
                    <View style={{flexDirection: 'row'}}>
                        <Image source={{uri: 'https://www.baidu.com/img/bd_logo1.png'}}
                               style={{width: 15, height: 15}}
                        />
                        <Label size='md' type='title' text="驶入时间:"/>
                        <Label size='md' type='title' text={inTime}/>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Image source={{uri: 'https://www.baidu.com/img/bd_logo1.png'}}
                               style={{width: 15, height: 15}}
                        />
                        <Label size='md' type='title' text='离开时间:'/>
                        <Label size='md' type='title' text={outTime}/>
                    </View>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {},
    rootStyle: {
        padding: 5,
        borderRadius: 5,
        borderColor: 'gray',
        borderWidth: 1,
        borderStyle: 'solid',
        backgroundColor: 'red',
        margin: 5
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});


// {
//     "recordCode": "1400000000004",
//     "parklotCode": "100046",
//     "parklotName": "优橙科技停车场",
//     "berthCode": null,
//     "plate": "鲁ABC965",
//     "plateColor": "0",
//     "inTime": "2018-07-15 16:11:15",
//     "outTime": "2018-07-15 16:11:28",
//     "inPic": "05180715100046_0_415F48EB816241E3DB9B_1_20180715161115.jpg",
//     "outPic": "05180715100046_1_415F48EB816241E3DB9B_2_20180715161128.jpg"
// }

RecordView.propTypes = {
    // navigation: PropTypes.object.isRequired,
    parklotName: PropTypes.string,
    inTime: PropTypes.string,
    outTime: PropTypes.string,
    plate: PropTypes.string,
    plateColor: PropTypes.string,
    inPic: PropTypes.string,
    outPic: PropTypes.string,
};


RecordView.defaultProps = {
    parklotName: '',
    inTime: '',
    outTime: '',
    plate: '',
    plateColor: '',
    inPic: '',
    outPic: '',
};

export default RecordView