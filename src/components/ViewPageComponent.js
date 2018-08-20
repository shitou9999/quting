/**
 * Created by cyh on 2018/8/20.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Alert, Image} from 'react-native';
import Carousel from 'teaset/components/Carousel/Carousel'

class ViewPageComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            swiperShow: false,
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                swiperShow: true
            });
        }, 10)
    }

    render() {
        return (
            <View style={styles.container}>
                <Carousel style={{height: 200}} control={
                <Carousel.Control
                  style={{alignItems: 'flex-end'}}
                  dot={<Text style={{backgroundColor: 'rgba(0, 0, 0, 0)', color: '#5bc0de', padding: 4}}>□</Text>}
                  activeDot={<Text style={{backgroundColor: 'rgba(0, 0, 0, 0)', color: '#5bc0de', padding: 4}}>■</Text>}
                  />
              }>
                    <Image style={{width: 375, height: 200}} resizeMode='cover'
                           source={require('../assets/images/img_banner_one.png')}/>
                    <Image style={{width: 375, height: 200}} resizeMode='cover'
                           source={require('../assets/images/img_banner_two.png')}/>
                    <Image style={{width: 375, height: 200}} resizeMode='cover'
                           source={require('../assets/images/img_banner_three.png')}/>
                </Carousel>
            </View> )
    }

}

const
    styles = StyleSheet.create({
        wrapper: {
            height: 100,
        },
        container: {
            flex: 1,
            height: 240,
        },
        slide: {
            flex: 1,
            justifyContent: 'center',
            backgroundColor: 'red',
            height: 200,
        },
        text: {
            color: '#fff',
            fontSize: 30,
            fontWeight: 'bold'
        },

        image: {
            width: gScreen.screen_width,
            flex: 1,
            height: 240
        }
    });

export
default
ViewPageComponent