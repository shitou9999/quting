/**
 * Created by cyh on 2018/8/20.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Alert, Image} from 'react-native';
import Swiper from 'react-native-swiper'

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
                        height={200}
                        removeClippedSubviews={false}
                        autoplay={true}
                        dot={<View style={{backgroundColor: '#e6e6e6', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
                        activeDot={<View style={{backgroundColor: 'red', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
                >
                    <View style={styles.imgView}>
                        <Image source={ require('../assets/images/img_banner_one.png')} style={styles.bannerImg}
                               resizeMode='stretch'/>
                        <View style={{backgroundColor:'transparent'}}>
                            <Text numberOfLines={1} style={{color:'red'}}>Aussie tourist dies at Bali hotel</Text>
                        </View>
                    </View>
                    <View style={styles.imgView}>
                        <Image source={ require('../assets/images/img_banner_two.png')} style={styles.bannerImg}
                               resizeMode='stretch'/>
                        <View style={{backgroundColor:'transparent',opacity:0.5}}>
                            <Text numberOfLines={1} style={{color:'red'}}>Aussie tourist dies at Bali hotel</Text>
                        </View>
                    </View>
                    <View style={styles.imgView}>
                        <Image source={ require('../assets/images/img_banner_three.png')} style={styles.bannerImg}
                               resizeMode='stretch'/>
                        <View style={{backgroundColor:'transparent',opacity:0.5}}>
                            <Text numberOfLines={1} style={{color:'red'}}>Aussie tourist dies at Bali hotel</Text>
                        </View>
                    </View>
                </Swiper>
            )
        } else {
            return (
                <View style={{height:200}}>
                    <View style={styles.imgView}>
                        <Image source={ require('../assets/images/img_banner_one.png')} style={styles.bannerImg}
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
    }
});

export default ViewPageComponent