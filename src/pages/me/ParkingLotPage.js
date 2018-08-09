/**
 * Created by PVer on 2018/7/14.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Dimensions,Button,FlatList} from 'react-native';
import {connect} from 'react-redux';
import Toast from 'teaset/components/Toast/Toast';

import * as HttpUtil from '../../net/HttpUtils';
const {width,height}=Dimensions.get('window')
//停车记录-停车场
class ParkingLotPage extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }


    /***
     * 路外(停车场)历史停车记录-分页
     * @private
     */
    _getRequestParkLotRecordList = () => {
        const {login} = this.props;
        let userId = login.user.id
        let start = 0
        let service = `/parking_record/parklot_his/page?userId=${userId}&start=${start}&length=10`;
        HttpUtil.fetchRequest(service, 'GET')
            .then(json => {
                if (json.code === "000000") {
                    Toast.success('请求成功');
                } else {
                    Toast.fail(json.msg)
                }
            })
            .catch(err => {
            })
    };

    refreshing() {
        let timer = setTimeout(() => {
            clearTimeout(timer)
            alert('刷新成功')
        }, 1500)
    }

    _onload() {
        let timer = setTimeout(() => {
            clearTimeout(timer)
            alert('加载成功')
        }, 1500)
    }

    render() {
        var data = [];
        for (var i = 0; i < 100; i++) {
            data.push({key: i, title: i + ''});
        }

        return (
            <View style={{flex:1}}>
                <Button title='滚动到指定位置' onPress={()=>{
                    this._flatList.scrollToOffset({animated: true, offset: 2000});
                }}/>
                <View style={{flex:1}}>
                    <FlatList
                        ref={(flatList)=>this._flatList = flatList}
                        ListHeaderComponent={this._header}
                        ListFooterComponent={this._footer}
                        ItemSeparatorComponent={this._separator}
                        renderItem={this._renderItem}
                        onRefresh={this.refreshing}
                        refreshing={false}
                        onEndReachedThreshold={0}
                        onEndReached={
                            this._onload
                        }
                        numColumns={3}
                        columnWrapperStyle={{borderWidth:2,borderColor:'black',paddingLeft:20}}

                        //horizontal={true}

                        getItemLayout={(data,index)=>(
                        {length: 100, offset: (100+2) * index, index}
                        )}

                        data={data}>
                    </FlatList>
                </View>

            </View>
        );
    }

    _renderItem = (item) => {
        var txt = '第' + item.index + '个' + ' title=' + item.item.title;
        var bgColor = item.index % 2 == 0 ? 'red' : 'blue';
        return <Text style={[{flex:1,height:100,backgroundColor:bgColor},styles.txt]}>{txt}</Text>
    }

    _header = () => {
        return <Text style={[styles.txt,{backgroundColor:'black'}]}>这是头部</Text>;
    }

    _footer = () => {
        return <Text style={[styles.txt,{backgroundColor:'black'}]}>这是尾部</Text>;
    }

    _separator = () => {
        return <View style={{height:2,backgroundColor:'yellow'}}/>;
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
    container: {},
    content: {
        width: width,
        height: height,
        backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cell: {
        height: 100,
        backgroundColor: 'purple',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#ececec',
        borderBottomWidth: 1

    },
    txt: {
        textAlign: 'center',
        textAlignVertical: 'center',
        color: 'white',
        fontSize: 30,
    }
});

const mapState = (state) => ({
    nav: state.nav,
    login: state.login,
    meUserInfo: state.me,
});

const dispatchAction = (dispatch) => ({
    // loginAction: bindActionCreators(loginActions, dispatch),
});

export default connect(mapState, dispatchAction)(ParkingLotPage);