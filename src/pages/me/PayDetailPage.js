/**
 * Created by cyh on 2018/7/12.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Alert,} from 'react-native';
import {connect} from 'react-redux';
import Toast from 'teaset/components/Toast/Toast'
import Label from 'teaset/components/Label/Label'
import {UltimateListView} from "react-native-ultimate-listview"
import TitleBar from "../../components/base/TitleBar"
import EmptyView from "../../components/base/EmptyView"

import * as HttpUtil from '../../net/HttpUtils'
import * as ViewUtil from '../../utils/ViewUtil'
import * as DateUtil from '../../utils/DateUtil'
import {commonStyle} from '../../constants/commonStyle'
import Divide from "../../components/base/Divide"


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
        gStorage.getAllDataForKey('ORDER+TYPE', status => {
            status.forEach((item) => {
                console.log(item)
            });
            this.setState({
                storageArr: status
            })
        });
    }


    sleep = (time) => new Promise(resolve => setTimeout(() => resolve(), time));
    /**
     * 查询钱包明细
     * @private
     */
    onFetch = async (page = 1, startFetch, abortFetch) => {
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

    //业务类型 0-充值 1-道路-付费，2-停车场-付费，3-退费，4-补缴，
    renderItem = (item, index, separator) => {
        let opTime = DateUtil.formt(item.opTime, 'yyyy-MM-dd HH:mm:ss')
        let tempArr = this.state.storageArr || []
        return (
            <View style={styles.itemStyle}>
                <View>
                    <Label style={styles.fontStyle} size='md' type='detail'
                           text={ViewUtil.getValue(tempArr, item.orderType, '***')}/>
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
            <View>
                <TitleBar title={'明细'} navigation={this.props.navigation}/>
                <UltimateListView
                    ref={(flatList) => this.flatList = flatList}
                    onFetch={this.onFetch}
                    refreshableMode="basic" //basic or advanced
                    keyExtractor={(item, index) => `${index} - ${item}`}
                    item={this.renderItem}
                    numColumn={1}
                    displayDate
                    arrowImageStyle={{width: 20, height: 20, resizeMode: 'contain'}}
                    //----Extra Config----
                    //{/*header={this.renderHeaderView}*/}
                    //{/*paginationFetchingView={this.renderPaginationFetchingView}*/}
                    //paginationFetchingView={this.renderPaginationFetchingView}
                    //paginationAllLoadedView={this.renderPaginationAllLoadedView}
                    //paginationWaitingView={this.renderPaginationWaitingView}
                    emptyView={this._renderEmptyView}
                    separator={this._renderSeparatorView}

                    // new props on v3.2.0
                    //{/*arrowImageStyle={{ width: 20, height: 20, resizeMode: 'contain' }}*/}
                    //{/*dateStyle={{ color: 'lightgray' }}*/}
                    //{/*refreshViewStyle={Platform.OS === 'ios' ? { height: 80, top: -80 } : { height: 80 }}*/}
                    //{/*refreshViewHeight={80}*/}
                />
            </View>
        );
    }

    _renderEmptyView = () => {
        return <EmptyView/>
    }

    _renderSeparatorView = () => {
        return <Divide orientation={'horizontal'} color={commonStyle.lineColor} width={commonStyle.lineHeight}/>
    }

}

const styles = StyleSheet.create({
    itemStyle: {
        flexDirection: commonStyle.row,
        justifyContent: commonStyle.between,
        paddingLeft: commonStyle.padding,
        paddingRight: commonStyle.padding,
        backgroundColor: commonStyle.white
    },
    fontStyle: {
        fontSize: 18,
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
