import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Alert, Image} from 'react-native';
import Toast from 'teaset/components/Toast/Toast'
import {MapView, Location as LocationHome} from 'react-native-baidumap-sdk'
import {commonStyle} from "../constants/commonStyle"
import RecommendView from './RecommendView'
import {NavigationEvents} from 'react-navigation'
import * as mapAction from '../actions/map'

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
            name: ''
        }
    }

    async componentDidMount() {
        await LocationHome.init()
        LocationHome.setOptions({gps: true})
        this.listener = LocationHome.addLocationListener(location => {
            console.log('我的位置HomeMapView---->')
            console.log(location)
            console.log('我的位置HomeMapView---->')
            this.setState({location})
            this.location()
        })
        LocationHome.start()
        // this._getRequestRoad()
        this.props.mapAction.toRequestRecommend(this.state.location.latitude, this.state.location.longitude)
            .then(response => {
                if (response.result) {
                    // this.setState({parkRecommend: response.data})
                    this.setState({name: response.data.name})
                }
            })
    }

    componentWillUnmount() {
        // Location.stop()
        // this.listener.remove()
    }

    location = () => this.mapView.setStatus({
        center: this.state.location,
    }, 1000)

    _recommendClick = () => {
        Toast.message('666666666')
    }

    render() {
        return (
            <View style={{height: 190}}>
                <NavigationEvents
                    onWillFocus={payload => console.log('will focus', payload)}
                    onDidFocus={payload => console.log('did focus', payload)}
                    onWillBlur={payload => console.log('will blur', payload)}
                    onDidBlur={payload => {
                        console.log('did blur', payload)
                        LocationHome.stop()
                        this.listener.remove()
                    }}
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
                </MapView>
                <RecommendView {...this.props}
                               location={this.state.location}
                               name={this.state.name}
                               recommendClick={this._recommendClick}
                />
            </View>
        )
    }

}

export default HomeMapView
