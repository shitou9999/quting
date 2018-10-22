/**
 * Created by cyh on 2018/7/12.
 */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    DeviceEventEmitter,
} from 'react-native';
import {commonStyle} from '../../constants/commonStyle'
import {ErrorView, BaseContainer, LoadingSpinner, SFListView} from "../../components/base"
import {MsgItemView} from '../../components/index'


class MessagePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            storageArr: []
        }
    }

    componentDidMount() {
        this._onRefresh()

    }

    _onRefresh = () => {
        gStorage.getAllDataForKey('MESSAGE', status => {
            console.log(status)
            this.setState({
                storageArr: status
            })
            this.listView.setRefreshing(false)
            this.listView.setData(status)
        })
    }

    _renderItem = (item) => {
        let data = item.item
        let index = item.index
        return <MsgItemView title={data.title} text={data.text} date={data.date}/>
    }


    render() {
        return (
            <BaseContainer
                style={{flex: 1}} isTopNavigator={true} title={'通知消息'}
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
                {/*{this.renderView()}*/}
                {/*<ErrorView title={'暂无数据'}/>*/}
                <SFListView
                    ref={ref => {
                        this.listView = ref
                    }}
                    showBackGround={true}
                    showNoDataMessage={'暂无消息记录'}
                    renderItem={this._renderItem}
                    onRefresh={this._onRefresh}
                />
            </BaseContainer>
        );
    }


    renderView = () => {
        // return 'page' === 'page' ? <LoadingSpinner isVisible={true}/> : <View style={{flex: 1}}>
        return 'page' === 'page' ? <LoadingSpinner isVisible={true}/> :
            <View style={{flex: 1}}>
                <View style={{width: 400, height: 200, backgroundColor: 'red'}}/>
                <LoadingSpinner isVisible={true}/>
            </View>
    }

    renderChildren = () => {
        return (
            <View style={{width: 50, height: 100, backgroundColor: 'blue'}}/>
        )
    }

}


export default MessagePage
