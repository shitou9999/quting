/**
 * Created by cyh on 2018/8/20.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Alert, Image, TouchableOpacity} from 'react-native';
import Swiper from 'react-native-swiper'
import Label from 'teaset/components/Label/Label'

import {commonStyle} from '../constants/commonStyle'

class ViewPageComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visibleSwiper: false,
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                visibleSwiper: true
            });
        }, 1)
    }

    render() {
        // paginationStyle={{bottom: -23, left: null, right: 10}}
        if (this.state.visibleSwiper) {
            return (
                <Swiper style={styles.imgWrapper}
                        height={150}
                        removeClippedSubviews={false}
                        onMomentumScrollEnd={(e, state, context) => console.log('index:', state.index)}
                        autoplay={!__DEV__ ? true : false}
                        dot={<View style={{
                            backgroundColor: '#e6e6e6',
                            width: 5,
                            height: 5,
                            borderRadius: 4,
                            marginLeft: 3,
                            marginRight: 3,
                            marginTop: 3,
                            marginBottom: 3
                        }}/>}
                        activeDot={<View style={{
                            backgroundColor: 'red',
                            width: 8,
                            height: 8,
                            borderRadius: 4,
                            marginLeft: 3,
                            marginRight: 3,
                            marginTop: 3,
                            marginBottom: 3
                        }}/>}
                        paginationStyle={{
                            bottom: 10, left: null, right: 10
                        }}
                >
                    <View style={styles.slide}>
                        <Image
                            source={require('../assets/images/img_banner_one.png')}
                            esizeMode='stretch'
                            style={styles.image}/>
                        <View style={{
                            position: "absolute", justifyContent: 'space-between',
                            alignItems: 'center', bottom: 10, right: 0, left: 0,
                        }}>
                            <Label text='Aussie tourist dies at Bali hotel' size='md' type='title'/>
                        </View>
                    </View>
                    <View style={styles.slide}>
                        <Image
                            source={require('../assets/images/img_banner_two.png')}
                            esizeMode='stretch'
                            style={styles.image}/>
                        <View style={{
                            position: "absolute", justifyContent: 'space-between',
                            alignItems: 'center', bottom: 10, right: 0, left: 0,
                        }}>
                            <Label text='Aussie tourist dies at Bali hotel' size='md' type='title'/>
                        </View>
                    </View>
                    <View style={styles.slide}>
                        <Image
                            source={require('../assets/images/img_banner_three.png')}
                            esizeMode='stretch'
                            style={styles.image}/>
                        <View style={{
                            position: "absolute", justifyContent: 'space-between',
                            alignItems: 'center', bottom: 10, right: 0, left: 0,
                        }}>
                            <Label text='Aussie tourist dies at Bali hotel' size='md' type='title'/>
                        </View>
                    </View>
                </Swiper>
            )
        } else {
            return (
                <View style={{height: 150}}>
                    <View style={styles.imgView}>
                        <Image source={require('../assets/images/img_banner_one.png')} style={styles.bannerImg}
                               resizeMode='stretch'/>
                    </View>
                </View>
            );
        }
    }

}

const styles = StyleSheet.create({
    wrapper: {
        height: 100,
    },
    container: {
        flex: 1,
        height: 240,
    },
    imgWrapper: {
        width: gScreen.screen_width,
        backgroundColor: 'transparent',
    },
    imgView: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    bannerImg: {
        width: gScreen.screen_width,
        height: 200,
        flex: 1
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    image: {
        width: gScreen.screen_width,
        flex: 1
    }
});

export default ViewPageComponent