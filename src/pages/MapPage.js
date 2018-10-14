/**
 * Created by cyh on 2018/7/12.
 */
import React, {Component} from 'react'
import {Platform, StyleSheet, Alert, View} from 'react-native'
import {bindActionCreators} from "redux"
import * as mapAction from "../actions/map"
import connect from "react-redux/es/connect/connect"
import {MapCardView, TypeChoiceView, SearchView} from "../components/index"
import {MapView, Location as LocationMap} from 'react-native-baidumap-sdk'
import {commonStyle} from "../constants/commonStyle"
import {NavigationEvents} from "react-navigation"


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
        await LocationMap.init()
        LocationMap.setOptions({gps: true})
        this.listener = LocationMap.addLocationListener(location => {
            console.log('我的位置MapPage---->')
            console.log(location)
            console.log('我的位置MapPage---->')
            this.setState({location})
            //设置中心点
            this.location()
        })

        this._getRequestRoad()
    }

    componentWillUnmount() {
        LocationMap.stop()
        this.listener.remove()
    }

    location = () => this.mapView.setStatus({
        center: this.state.location,
    }, 1000)


    _getRequestRoad = () => {
        const {location, markers} = this.state
        if (markers && markers.length > 0) {
            markers.splice(0, markers.length)
            this.setState({
                markers: []
            })
        }
        this.props.mapAction.toRequestRoad(location.latitude, location.longitude)
            .then(response => {
                if (response.result) {
                    let allData = response.data
                    let newData = []
                    newData = allData
                    this.setState({
                        markers: newData
                    })
                }
            })
    }


    _getRequestLot = () => {
        const {location, markers} = this.state
        if (markers && markers.length > 0) {
            // tempMarkers.length = 0
            markers.splice(0, markers.length)
            this.setState({
                markers: []
            })
        }
        this.props.mapAction.toRequestLot(location.latitude, location.longitude)
            .then(response => {
                if (response.result) {
                    let allData = response.data
                    let newData = []
                    newData = allData
                    this.setState({
                        markers: newData
                    })
                }
            })
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

    _searchClick = () => {
        this.props.navigation.navigate('SearchPage')
    }


// onClick={point => console.log(point)}
    render() {
        let isShowCard = this.state.isShow
        let itemMarker = this.state.itemMarker
        return (
            <View style={styles.container}>
                <SearchView searchClick={this._searchClick}/>
                <NavigationEvents
                    onWillFocus={payload => console.log('will blur', payload)}
                    onDidFocus={payload => LocationMap.start()}
                    onWillBlur={payload => {
                        LocationMap.stop()
                        this.listener.remove()
                    }}
                    onDidBlur={payload => console.log('did blur', payload)}
                />
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
                            location={this.state.location}
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
        // flexDirection: 'column',
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

const mapState = (state) => ({
    nav: state.nav,
    login: state.login,
    me: state.me,
    map: state.map,
})

const dispatchAction = (dispatch) => ({
    mapAction: bindActionCreators(mapAction, dispatch),
})

export default connect(mapState, dispatchAction)(MapPage)

