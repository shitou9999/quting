/**
 * Created by cyh on 2018/7/12.
 */
import React, {Component} from 'react'
import {Platform, StyleSheet, Alert, View} from 'react-native'
import TitleBar from '../components/TitleBar'
import Label from 'teaset/components/Label/Label'
import Toast from 'teaset/components/Toast/Toast'
import MapCardView from "../components/MapCardView"
import {MapView, Location} from 'react-native-baidumap-sdk'

import {commonStyle} from "../constants/commonStyle"
import TypeChoiceView from "../components/TypeChoiceView"
import * as HttpUtil from '../net/HttpUtils'


export default class MapPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            location: {
                latitude: 30.283789,
                longitude: 120.020472
            },
            markers: []
        };
    }

    async componentDidMount() {
        await Location.init()
        Location.setOptions({gps: true})
        this.listener = Location.addLocationListener(location => {
            console.log('我的位置---->')
            console.log(location)
            console.log('我的位置---->')
            this.setState({location})
            //设置中心点
            this.location()
        })
        Location.start()
        this.getRequestLot()
    }

    componentWillUnmount() {
        Location.stop()
        this.listener.remove()
    }

    location = () => this.mapView.setStatus({
        center: this.state.location,
    }, 1000)


    getRequestLot = () => {
        const {location} = this.state
        let service = `/range/parklot?lng=${location.longitude}&lat=${location.latitude}`
        HttpUtil.fetchRequest(service, 'GET')
            .then(json => {
                if (json.code === "000000") {
                    let allData = json.data
                    let newData = []
                    newData = allData
                    this.setState({
                        mapData: newData
                    })
                    // this.addMarker()
                } else {
                    Toast.message(json.msg)
                }
            })
            .catch()
    }


    getRequestRoad = () => {
        const {location} = this.state
        let service = `/range/section?lng=${location.longitude}&lat=${location.latitude}`
        HttpUtil.fetchRequest(service, 'GET')
            .then(json => {
                if (json.code === "000000") {
                    let allData = json.data
                    let newData = []
                    newData = allData

                } else {
                    Toast.message(json.msg)
                }
            })
            .catch()
    }

//     const coordinate = {
//         latitude: 39.706901,
//         longitude: 116.397972,
//     }
//
// <MapView.Marker image='flag' coordinate={coordinate}>
// <View style={styles.customInfoWindow}>
// <Text>自定义信息窗体</Text>
// </View>
// </MapView.Marker>

    addMarker = coordinate => this.setState({
        markers: [...this.state.markers, {
            coordinate,
            key: Math.random(),
        }],
    })

    removeMarker(marker) {
        this.setState({markers: this.state.markers.filter(item => item !== marker)})
    }

    renderMarker = () => {
        return this.state.markers.map((item, index) => (
            <MapView.Marker
                selected
                title="This is a image marker"
                image="flag"
                style={{width: 30, height: 30}}
                onPress={() => Alert.alert('You pressed the marker!')}
                onCalloutPress={() => Alert.alert('You pressed the callout!')}
                coordinate={{latitude: 39.914884, longitude: 116.403883}}
            />
        ))

    }

    // onClick={point => console.log(point)}
    render() {
        const {navigation} = this.props
        return (
            <View style={styles.container}>
                <TitleBar title={'地图'} navigation={navigation}/>
                <MapView
                    ref={ref => this.mapView = ref}
                    zoomLevel={11}
                    style={{flex: 1, justifyContent: commonStyle.center, alignItems: commonStyle.center}}
                    locationEnabled={true}
                    location={this.state.location}
                    onLoad={() => console.log('onLoad')}
                    onStatusChange={status => console.log(status)}
                >
                    {/*{this.state.markers.map(item => (*/}
                    {/*<MapView.Marker {...item} onPress={() => this.removeMarker(item)}/>*/}
                    {/*))}*/}
                    {this.renderMarker}
                </MapView>
                <View style={styles.p1}>
                    <TypeChoiceView/>
                </View>
                <View style={styles.p2}>
                    <MapCardView/>
                </View>
            </View>
        );
    }

    //import icon from '../../images/ic_my_location.png'
// <Image style={style.icon} source={icon} />
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    p1: {
        position: 'absolute',
        right: 20,
        top: 100
    },
    p2: {
        width: gScreen.screen_width,
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center'
    }
});
