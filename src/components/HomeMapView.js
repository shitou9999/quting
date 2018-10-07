import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Alert, Image} from 'react-native';
import Toast from 'teaset/components/Toast/Toast'
import {MapView, Location} from 'react-native-baidumap-sdk'
import {commonStyle} from "../constants/commonStyle"
import RecommendView from './RecommendView'

class HomeMapView extends Component {

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

    // async componentDidMount() {
    //     await Location.init()
    //     Location.setOptions({gps: true})
    //     this.listener = Location.addLocationListener(location => {
    //         console.log('我的位置---->')
    //         console.log(location)
    //         console.log('我的位置---->')
    //         this.setState({location})
    //         //设置中心点
    //         this.location()
    //     })
    //     Location.start()
    //     // this._getRequestRoad()
    // }

    // componentWillUnmount() {
    //     Location.stop()
    //     this.listener.remove()
    // }

    location = () => this.mapView.setStatus({
        center: this.state.location,
    }, 1000)

    _recommendClick = () => {
        Toast.message('666666666')
    }

    render() {
        return (
            <View style={{height: 190}}>
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
                </MapView>
                <RecommendView location={this.state.location} recommendClick={this._recommendClick}/>
            </View>
        )
    }

}

export default HomeMapView
