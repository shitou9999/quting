/**
 * Created by cyh on 2018/7/12.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import TitleBar from '../components/TitleBar'

export default class MapPage extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const {navigation} = this.props
        return (
            <View style={styles.container}>
                <TitleBar title={'地图'} navigation={navigation}/>
                <Text style={styles.welcome}>MapPage</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});