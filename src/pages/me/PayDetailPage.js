/**
 * Created by cyh on 2018/7/12.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Alert, SectionList} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {TitleBar, EmptyView, Divide} from "../../components/base"
import {DateUtil} from '../../utils/index'
import {commonStyle} from '../../constants/commonStyle'
import {userAction} from '../../actions/index'
import {PayDetailItemView, SectionHeaderView} from "../../components"


class PayDetailPage extends Component {

    constructor(props) {
        super(props);
        this.start = 0,
            this.state = {
                sourceData: [
                    {key: "A", data: [{title: "阿童木"}, {title: "阿玛尼"}, {title: "爱多多"}]},
                    {key: "B", data: [{title: "表哥"}, {title: "贝贝"}, {title: "表弟"}, {title: "表姐"}, {title: "表叔"}]},
                    {key: "C", data: [{title: "成吉思汗"}, {title: "超市快递"}]},
                ],
                sourceList: [],
                refreshing: true,
            }
    }

    componentDidMount() {
        this._renderRefresh()
    }

    _renderRefresh = () => {
        this.props.userAction.toRequestPayDetail(this.props.login.user.id, 0)
            .then(response => {
                if (response.result) {
                    let allData = response.data
                    if (this.state.isRefreshing) {
                        this.sourceList = []
                    }

                    for (let i = 0; i < allData.length; i++) {
                        let opTime = DateUtil.formt(allData[i].opTime, 'yyyy-MM-dd')
                        allData[i].opTime = opTime;
                    }
                    let map = {}, nList = []
                    //设置初始key为0
                    let _nkey = 0
                    allData.forEach((item, index) => {
                        if (index === 0) {
                            nList.push({
                                key: item.opTime,
                                data: [item]
                            })
                        } else {
                            let oItem = allData[index - 1]
                            //和前一个date一致则在当前添加，否则添加至nList
                            if (item.opTime === oItem.opTime) {
                                nList[_nkey]['data'].push(item)
                            } else {
                                nList.push({
                                    key: item.opTime,
                                    data: [item]
                                })
                                _nkey++
                            }
                        }
                    })
                    console.log(nList)
                    let dataSource = []
                    dataSource = dataSource.concat(nList)
                    if (dataSource && dataSource.length > 0) {
                        this.setState({
                            sourceList: dataSource,
                            refreshing: false
                        })
                    } else {
                        this.setState({
                            sourceList: [],
                            refreshing: false
                        })
                    }
                }
            })
    }


    _onEndReached = () => {
        let userId = '1100000000029'
        this.start += 10
        console.log(this.start)
        this.props.userAction.toRequestPayDetail(userId, this.start)
            .then(response => {
                if (response.result) {
                    let allData = response.data
                    for (let i = 0; i < allData.length; i++) {
                        let opTime = DateUtil.formt(allData[i].opTime, 'yyyy-MM-dd')
                        allData[i].opTime = opTime;
                    }
                    let map = {}, nList = []
                    //设置初始key为0
                    let _nkey = 0
                    allData.forEach((item, index) => {
                        if (index === 0) {
                            nList.push({
                                key: item.opTime,
                                data: [item]
                            })
                        } else {
                            let oItem = allData[index - 1]
                            //和前一个date一致则在当前添加，否则添加至nList
                            if (item.opTime === oItem.opTime) {
                                nList[_nkey]['data'].push(item)
                            } else {
                                nList.push({
                                    key: item.opTime,
                                    data: [item]
                                })
                                _nkey++
                            }
                        }
                    })

                    let dataSource = []
                    dataSource = this.state.sourceList.concat(nList)

                    let mapTemp = {},
                        dest = [];
                    for (let i = 0; i < dataSource.length; i++) {
                        let ai = dataSource[i];
                        if (!mapTemp[ai.key]) {
                            dest.push({
                                key: ai.key,
                                data: [ai]
                            });
                            mapTemp[ai.key] = ai;
                        } else {
                            for (let j = 0; j < dest.length; j++) {
                                let dj = dest[j];
                                if (dj.key === ai.key) {
                                    dj.data.push(ai);
                                    break;
                                }
                            }
                        }
                    }

                    console.log(dest)
                    this.setState({
                        sourceList: dest,
                        refreshing: false
                    })
                }
            })
    }

    _sectionComp = (info) => {
        let key = info.section.key
        return (
            <SectionHeaderView headTitle={key}/>
        )
    }

    _renderItem = ({item}) => {
        return (
            <PayDetailItemView item={item}/>
        )
    }

    // keyExtractor={(item, index) => `${this.state.layout} - ${item}`<!--}  //此函数用于为给定的item生成一个不重复的key-->
    //numColumn={this.state.layout === 'list' ? 1 : 3} //to use grid layout, simply set gridColumn > 1
    //// 当列表被滚动到距离内容最底部不足onEndReacchedThreshold设置的距离时调用
    render() {
        return (
            <View style={{flex: 1}}>
                <TitleBar title={'明细'}/>
                <SectionList
                    ref={ref => this.sectionList = ref}
                    renderSectionHeader={this._sectionComp}
                    style={{flex: 1}}
                    stickySectionHeadersEnabled={true}  // 滚动粘粘在顶部
                    renderItem={this._renderItem}
                    ListEmptyComponent={this._renderEmptyComp}
                    ItemSeparatorComponent={this._renderSeparatorComp}
                    sections={this.state.sourceList}
                    keyExtractor={this._keyExtractor}
                    // onEndReachedThreshold={0.1} //当列表被滚动到距离内容最底部不足0.1的距离时调用
                    // onEndReached={this._onEndReached}//是否到达底部，在默认情况下会有一个默认的distanceFromEnd临界值。可以通过此属性来达到上拉加载的效果
                    refreshing={this.state.refreshing}
                    onRefresh={this._renderRefresh}
                />
            </View>
        );
    }

    _keyExtractor = (item, index) => index.toString()

    _renderSeparatorComp = () => {
        return <Divide orientation={commonStyle.horizontal} color={commonStyle.lineColor}
                       width={commonStyle.lineHeight}/>
    }

    _renderEmptyComp = () => {
        return <EmptyView/>
    }

}

const mapState = (state) => ({
    nav: state.nav,
    login: state.login,
    me: state.me,
})

const dispatchAction = (dispatch) => ({
    userAction: bindActionCreators(userAction, dispatch),
})

export default connect(mapState, dispatchAction)(PayDetailPage)
