/**
 * Created by cyh on 2018/7/12.
 */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Alert,
} from 'react-native';
import {commonStyle} from '../../constants/commonStyle'
import BaseContainer from "../../components/base/BaseContainer"
import LoadingSpinner from "../../components/base/LoadingSpinner"
import ErrorView from "../../components/base/ErrorView"


class MessagePage extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }


    renderView = () => {
        // return 'page' === 'page' ? <LoadingSpinner isVisible={true}/> : <View style={{flex: 1}}>
        return 'page' === 'page' ? <LoadingSpinner isVisible={true}/> : <View style={{flex: 1}}>
            <View style={{width: 400, height: 200, backgroundColor: 'red'}}/>
            <LoadingSpinner isVisible={true}/>
        </View>
    }

    renderChildren = () => {
        return (
            <View style={{width: 50, height: 100, backgroundColor: 'blue'}}/>
        )
    }


    render() {
        return (
            <BaseContainer
                style={styles.container} isTopNavigator={true} title={'通知消息'}
                onWillBlur={(payload) => {
                    console.log('页面将要失去焦点', payload);
                }}
                onDidBlur={(payload) => {
                    console.log('页面已经失去焦点', payload);
                }}
                onWillFocus={(payload) => {
                    console.log('页面将要获得焦点', payload);
                }}
                onDidFocus={(payload) => {
                    console.log('页面已经获得焦点', payload);
                }}
            >
                {this.renderView()}
                <ErrorView title={'暂无数据'}/>
            </BaseContainer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});

export default MessagePage;
