/**
 * Created by cyh on 2018/7/12.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Alert,} from 'react-native';
import {connect} from 'react-redux';
import Toast from 'teaset/components/Toast/Toast'
import Label from 'teaset/components/Label/Label'
import {UltimateListView} from "react-native-ultimate-listview"

import * as HttpUtil from '../../net/HttpUtils'
import DateUtil from '../../utils/DateUtil'
import {commonStyle} from '../../constants/commonStyle'

//钱包明细
class PayDetailPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            flatListData: [],
            storageArr: [],
        }
    }

    // let data = [];
    // allData.forEach((item) => {
    //     data.push(JSON.parse(item.data));
    // });
    // let dataList = allData.map(
    //     (info) => {
    //         return {
    //             id: info.id,
    //             imageUrl: info.squareimgurl,
    //             title: info.mname,
    //             subtitle: `[${info.range}]${info.title}`,
    //             price: info.price
    //         }
    //     }
    // )
    //
    // let params = {}
    // params.currentPage = page;
    // params.pageSize = PAGE_SIZE;

    componentWillMount() {
        // this._getRequestPayRecord()
    }

    componentDidMount() {
        gStorage.storage.getAllDataForKey('ORDER+TYPE', status => {
            this.setState({
                storageArr: status
            })
        });
    }

    //业务类型 0-充值 1-道路-付费，2-停车场-付费，3-退费，4-补缴，
    getValue(key) {
        let tempArr = this.state.storageArr || []
        let searchValue;
        for (let i = 0; i < tempArr.length; i++) {
            let tempKey = tempArr[i].key
            if (key === tempKey) {
                searchValue = tempArr[i].value
                break
            }
        }
        return searchValue
    }

    sleep = (time) => new Promise(resolve => setTimeout(() => resolve(), time));
    /**
     * 查询钱包明细
     * @private
     */
    onFetch = async(page = 1, startFetch, abortFetch) => {
        try {
            const {me} = this.props;
            let pageLimit = 10;

            //Array.from()方法就是将一个类数组对象或者可遍历对象转换成一个真正的数组。
            // let rowData = Array.from({length: pageLimit}, (value, index) => `item -> ${index + skip}`);

            let userId = '1100000000029';
            let start = (page - 1) * pageLimit;
            let service = `/overage/record?userId=${userId}&start=${start}&length=10&`;
            HttpUtil.fetchRequest(service, 'GET')
                .then(json => {
                    let allData = json.aaData;
                    let newData = []
                    newData = allData;
                    startFetch(newData, pageLimit);
                })
                .catch(err => {
                })

            //如果没有从服务器返回的数据，则模拟列表的末尾
            // if (page === 10) {
            //     rowData = [];
            // }

            //模拟ES7语法中的网络加载
            // await this.sleep(1000);
            // startFetch(newData, pageLimit);
        } catch (err) {
            abortFetch(); //如果遇到网络错误，手动停止刷新或分页
            console.log(err);
        }
    };

    renderItem = (item, index, separator) => {
        let opTime = DateUtil.formt(item.opTime, 'yyyy-MM-dd HH:mm:ss');
        return (
            <View style={styles.itemStyle}>
                <View>
                    <Label style={styles.fontStyle} size='md' type='detail' text={this.getValue(item.orderType)}/>
                    <Label size='md' type='detail' text={opTime}/>
                </View>
                <View style={styles.priceStyle}>
                    <Label size='md' type='detail' text={item.changeMoney}/>
                </View>
            </View>

        )
    };

    onPress = (index, item) => {
        Alert.alert(index, `You're pressing on ${item}`);
    };

    // keyExtractor={(item, index) => `${this.state.layout} - ${item}`<!--}  //此函数用于为给定的item生成一个不重复的key-->
    //numColumn={this.state.layout === 'list' ? 1 : 3} //to use grid layout, simply set gridColumn > 1
    render() {
        return (
            <UltimateListView
                ref={(flatList) => this.flatList = flatList}
                onFetch={this.onFetch}
                refreshableMode="basic" //basic or advanced
                keyExtractor={(item, index) => `${index} - ${item}`}
                item={this.renderItem}  //this takes two params (item, index)
                numColumn={1}
                displayDate
                arrowImageStyle={{ width: 20, height: 20, resizeMode: 'contain' }}
                //----Extra Config----
                //{/*header={this.renderHeaderView}*/}
                //{/*paginationFetchingView={this.renderPaginationFetchingView}*/}
                //paginationFetchingView={this.renderPaginationFetchingView}
                //paginationAllLoadedView={this.renderPaginationAllLoadedView}
                //paginationWaitingView={this.renderPaginationWaitingView}
                emptyView={this._renderEmptyView}
                //separator={this.renderSeparatorView}

                // new props on v3.2.0
                //{/*arrowImageStyle={{ width: 20, height: 20, resizeMode: 'contain' }}*/}
                //{/*dateStyle={{ color: 'lightgray' }}*/}
                //{/*refreshViewStyle={Platform.OS === 'ios' ? { height: 80, top: -80 } : { height: 80 }}*/}
                //{/*refreshViewHeight={80}*/}
            />
        );
    }

    _renderEmptyView = () => {
        return <Text>我是没数据</Text>
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: commonStyle.center,
        alignItems: commonStyle.center,
        backgroundColor: commonStyle.white,
    },
    itemStyle: {
        flex: 1,
        flexDirection: commonStyle.row,
        justifyContent: commonStyle.between,
        marginLeft: commonStyle.marginLeft,
        marginRight: commonStyle.marginRight
    },
    fontStyle: {
        fontSize: 20,
    },
    priceStyle: {
        alignItems: commonStyle.center,
        justifyContent: commonStyle.center
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

export default connect(mapState, dispatchAction)(PayDetailPage);