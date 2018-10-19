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
    ImageBackground, Image
} from 'react-native';
import PropTypes from 'prop-types'

class EmptyView extends Component {

    static propTypes = {
        showNoDataMessage: PropTypes.string,
        showNoDataImage: PropTypes.number,
    }

    static defaultProps = {
        showNoDataMessage: '暂无数据',
    }


    render() {
        if (!!this.props.showNoDataImage) {
            return (
                <View style={{
                    width: gScreen.screen_width,
                    height: gScreen.screen_height - 104,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Image style={{
                        width: 120,
                        height: 120,
                        marginTop: 40
                    }}
                           source={this.props.showNoDataImage}
                           resizeMode={'contain'}/>
                    <Text style={{
                        fontSize: 18,
                        color: '#696969',
                        marginTop: 10
                    }}>{this.props.showNoDataMessage}</Text>
                </View>
            )
        } else {
            return (
                <View style={{
                    width: gScreen.screen_width,
                    height: gScreen.screen_height - 104,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Text style={{
                        fontSize: 18,
                        color: '#696969',
                        marginTop: 10
                    }}>{this.props.showNoDataMessage}</Text>
                </View>
            )
        }
    }
}


export default EmptyView
