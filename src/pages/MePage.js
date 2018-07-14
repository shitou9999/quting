/**
 * Created by cyh on 2018/7/12.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {
    Button,
} from 'teaset';

export default class MePage extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    login() {
        const {navigation} = this.props;
        navigation.navigate('ComplaintPage');
    }

    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <Button
                    type="primary"
                    size="lg"
                    title="投诉建议"
                    onPress={() => this.login()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});