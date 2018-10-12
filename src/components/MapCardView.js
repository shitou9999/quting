/**
 * Created by PVer on 2018/8/19.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Alert, Image, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Label from 'teaset/components/Label/Label'
import Divide from '../components/base/Divide'
import MapLinkUtil from '../utils/MapLinkUtil'
import {commonStyle} from '../constants/commonStyle'
import {images} from "../assets";

class MapCardView extends Component {

    static propTypes = {
        code: PropTypes.string,
        name: PropTypes.string,
        lat: PropTypes.number,
        lng: PropTypes.number,
        berthTotalNum: PropTypes.number,
        berthEmptyNum: PropTypes.number,
        address: PropTypes.string,
        distance: PropTypes.string,
        description: PropTypes.string,
        location: PropTypes.object
    }

    static defaultProps = {
        code: 0,
        name: '',
        lat: 0,
        lng: 0,
        berthTotalNum: 0,
        berthEmptyNum: 0,
        address: '',
        distance: '0',
        description: '',
        location: {},
    }


    render() {
        return (
            <View style={styles.rootStyle}>
                <Label text={this.props.name} size={'md'} type={'title'}/>
                <View style={{
                    flexDirection: commonStyle.row,
                    justifyContent: commonStyle.around,
                    flex: 3,
                    height: 40,
                    alignItems: commonStyle.center
                }}>
                    <Label text={`空车位:${this.props.name}`} size={'md'} type={'title'} style={{flex: 1.1}}/>
                    <Label text={`里程:${this.props.berthEmptyNum}km`} size={'md'} type={'title'} style={{
                        flex: 0.8,
                        justifyContent: commonStyle.center,
                    }}/>
                    <Label text={`收费规则:${this.props.description}`} size={'md'} type={'title'} style={{flex: 1.1}}/>
                </View>
                <Divide orientation={'horizontal'} color={commonStyle.lineColor} width={commonStyle.lineHeight}/>
                <View style={{
                    flexDirection: commonStyle.row,
                    justifyContent: commonStyle.around,
                    height: 30,
                    alignItems: commonStyle.center,
                    marginTop: 5,
                }}>
                    <TouchableOpacity onPress={() => {
                        MapLinkUtil.planRoute({
                            lat: this.props.location.latitude,
                            lng: this.props.location.longitude,
                            title: '起点'
                        }, {
                            lat: this.props.lat,
                            lng: this.props.lng,
                            title: '终点'
                        }, 'drive');
                    }}>
                        <View style={{flexDirection: commonStyle.row, alignItems: commonStyle.center}}>
                            <Label text={'路线'} size={'md'} type={'title'}/>
                            <Image source={images.map_route}
                                   resizeMode={commonStyle.contain}
                                   style={{width: 15, height: 15}}/>
                        </View>
                    </TouchableOpacity>
                    <View style={{height: 30, width: commonStyle.lineWidth, backgroundColor: commonStyle.lineColor}}/>
                    <TouchableOpacity onPress={() => {
                        MapLinkUtil.navigate({lat: this.props.lat, lng: this.props.lng, title: `${this.props.name}`});
                    }}>
                        <View style={{flexDirection: commonStyle.row, alignItems: commonStyle.center}}>
                            <Label text={'导航'} size={'md'} type={'title'}/>
                            <Image source={images.map_navigation}
                                   resizeMode={commonStyle.contain}
                                   style={{width: 15, height: 15}}/>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

}


const styles = StyleSheet.create({
    rootStyle: {
        padding: 5,
        borderRadius: 5,
        borderColor: commonStyle.white,
        borderWidth: 1,
        borderStyle: 'solid',
        backgroundColor: commonStyle.white,
        margin: 5,
    },
});


export default MapCardView
