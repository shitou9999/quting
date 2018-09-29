/**
 * Created by cyh on 2018/7/12.
 */
import React, {Component} from 'react'
import {Platform, StyleSheet, Alert, View} from 'react-native'
import TitleBar from '../components/base/TitleBar'
import Label from 'teaset/components/Label/Label'
import Toast from 'teaset/components/Toast/Toast'
import MapCardView from "../components/MapCardView"
import {MapView, Location} from 'react-native-baidumap-sdk'

import {commonStyle} from "../constants/commonStyle"
import TypeChoiceView from "../components/TypeChoiceView"
import * as HttpUtil from '../net/HttpUtils'
import ArrayList from '../utils/ArrayUtil'


class MapPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            location: {
                latitude: 30.283789,
                longitude: 120.020472
            },
            markers: [],
            isShow: false,
            itemMarker: {},
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
        this._getRequestRoad()
    }

    componentWillUnmount() {
        Location.stop()
        this.listener.remove()
    }

    location = () => this.mapView.setStatus({
        center: this.state.location,
    }, 1000)


    //道路
    _getRequestRoad = () => {
        const {location, markers} = this.state
        if (markers && markers.length > 0) {
            markers.splice(0, markers.length)
            this.setState({
                markers: []
            })
        }
        let service = `/range/section?lng=${location.longitude}&lat=${location.latitude}`
        HttpUtil.fetchRequest(service, 'GET')
            .then(json => {
                if (json.code === "000000") {
                    let allData = json.data
                    let newData = []
                    newData = allData
                    this.setState({
                        markers: newData
                    })
                } else {
                    Toast.message(json.msg)
                }
            })
            .catch()
    }


    //停车场
    _getRequestLot = () => {
        const {location, markers} = this.state
        if (markers && markers.length > 0) {
            // tempMarkers.length = 0
            markers.splice(0, markers.length)
            this.setState({
                markers: []
            })
        }
        let service = `/range/parklot?lng=${location.longitude}&lat=${location.latitude}`
        HttpUtil.fetchRequest(service, 'GET')
            .then(json => {
                if (json.code === "000000") {
                    let allData = json.data
                    let newData = []
                    newData = allData
                    this.setState({
                        markers: newData
                    })
                } else {
                    Toast.message(json.msg)
                }
            })
            .catch()
    }

    addMarker = coordinate => this.setState({
        markers: [...this.state.markers, {
            coordinate,
            key: Math.random(),
        }],
    })

    removeMarker(marker) {
        this.setState({markers: this.state.markers.filter(item => item !== marker)})
    }


    _renderMarker = () => {
        console.log('---------->renderMarker')
        return this.state.markers.map((item, index) => (
            this.returnItemMarker(item)
        ))
    }


    _userOnSelectMarker = () => {
        // this.marker.select()选中标记，相当于一次手动点击标记
    }

    _renderMapCardView = (item) => {
        return <MapCardView/>
    }

    returnItemMarker = (item, index) => {
        if (item.berthEmptyNum > 20) {
            return <MapView.Marker
                ref={ref => this.marker = ref}
                key={Math.random()}
                image="map_park_green"
                style={{width: 30, height: 30}}
                onPress={() => this.setState({
                    isShow: true,
                    itemMarker: item
                })}
                coordinate={{latitude: item.lat, longitude: item.lng}}
            />
        } else if (item.berthEmptyNum > 5 && item.berthEmptyNum <= 20) {
            return <MapView.Marker
                ref={ref => this.marker = ref}
                key={Math.random()}
                image="map_park_red"
                style={{width: 30, height: 30}}
                onPress={() => this.setState({
                    isShow: true,
                    itemMarker: item
                })}
                coordinate={{latitude: item.lat, longitude: item.lng}}
            />
        } else {
            return <MapView.Marker
                ref={ref => this.marker = ref}
                key={Math.random()}
                image="map_park_yellow"
                style={{width: 30, height: 30}}
                onPress={() => this.setState({
                    isShow: true,
                    itemMarker: item
                })}
                coordinate={{latitude: item.lat, longitude: item.lng}}
            />
        }
    }

    _userSelectClick = (index) => {
        if (index === 0) {
            this._getRequestRoad()
        } else if (index === 1) {
            this._getRequestLot()
        }
    }


// onClick={point => console.log(point)}
    render() {
        const {navigation} = this.props
        let isShowCard = this.state.isShow
        let itemMarker = this.state.itemMarker
        return (
            <View style={styles.container}>
                <TitleBar title={'地图'} navigation={navigation}/>
                <MapView
                    ref={ref => this.mapView = ref}
                    zoomLevel={11}
                    style={{flex: 1, justifyContent: commonStyle.center, alignItems: commonStyle.center}}
                    locationEnabled={true}
                    location={this.state.location}
                    onClick={latlng => {
                        this.setState({
                            isShow: false
                        })
                    }}
                    onLoad={() => console.log('onLoad')}
                    onStatusChange={status => console.log(status)}
                >
                    {/*{this.state.markers.map(item => (*/}
                    {/*<MapView.Marker {...item} onPress={() => this.removeMarker(item)}/>*/}
                    {/*))}*/}
                    {this._renderMarker()}
                </MapView>
                <View style={styles.p1}>
                    <TypeChoiceView selectClick={this._userSelectClick}/>
                </View>
                <View style={styles.p2}>
                    {
                        this.state.isShow ? <MapCardView
                            name={itemMarker.name}
                            distance={itemMarker.distance}
                            address={itemMarker.address}
                            berthEmptyNum={itemMarker.berthEmptyNum}
                            berthTotalNum={itemMarker.berthTotalNum}
                            description={itemMarker.description}
                            code={itemMarker.code}
                            lat={itemMarker.lat}
                            lng={itemMarker.lng}/> : null
                    }
                </View>
            </View>
        );
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

export default MapPage
