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
                        height={180}
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
                            position: "absolute", justifyContent: commonStyle.between,
                            bottom: 10, right: 0, left: commonStyle.margin,
                        }}>
                            <Label text={'建设“富强美高”新城市'} size='md' type='title'
                                   style={{color: commonStyle.white}}/>
                        </View>
                    </View>
                    <View style={styles.slide}>
                        <Image
                            source={require('../assets/images/img_banner_two.png')}
                            esizeMode='stretch'
                            style={styles.image}/>
                        <View style={{
                            position: "absolute", justifyContent: commonStyle.between,
                            bottom: 10, right: 0, left: commonStyle.margin,
                        }}>
                            <Label text={'建设城市智慧交通系统'} size='md' type='title'
                                   style={{color: commonStyle.white}}/>
                        </View>
                    </View>
                    <View style={styles.slide}>
                        <Image
                            source={require('../assets/images/img_banner_three.png')}
                            esizeMode='stretch'
                            style={styles.image}/>
                        <View style={{
                            position: "absolute", justifyContent: commonStyle.between,
                            bottom: 10, right: 0, left: commonStyle.margin,
                        }}>
                            <Label text={'智慧停车,让城市更快“静”下来'} size='md' type='title'
                                   style={{color: commonStyle.white}}/>
                        </View>
                    </View>
                </Swiper>
            )
        } else {
            return (
                <View style={{height: 180}}>
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
    imgWrapper: {
        width: gScreen.screen_width,
        backgroundColor: commonStyle.clear,
    },
    imgView: {
        flex: 1,
        justifyContent: commonStyle.center,
        backgroundColor: commonStyle.clear
    },
    bannerImg: {
        width: gScreen.screen_width,
        height: 200,
        flex: 1
    },
    slide: {
        flex: 1,
        justifyContent: commonStyle.center,
        backgroundColor: commonStyle.clear
    },
    image: {
        width: gScreen.screen_width,
        flex: 1
    }
});

export default ViewPageComponent
