import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableWithoutFeedback, StatusBar, DeviceEventEmitter} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from "redux"
import {commonStyle} from "../../constants/commonStyle"
import {Input, ListRow, Button, Overlay, Label, Toast} from "../../components/teaset/index"
import overdueAction from "../../actions/overdue"
import {SFListView, TitleBar, EmptyView, BaseContainer} from '../../components/base'
import {DynamicSearchView, ArrearsItemView} from "../../components"
import {Constants} from '../../constants/index'


class OverduePayPage extends Component {

    constructor(props) {
        super(props);
        this.start = 0
        this.state = {
            searchValue: '',
            isSearch: false,
        }
    }

    componentDidMount() {
        this.subscription = DeviceEventEmitter.addListener(Constants.Emitter_ARREARS_REFRESH, () => {
            this._onRefresh()
        })
        this._onRefresh()
    }

    componentWillUnmount() {
        this.subscription && this.subscription.remove()
    }

    _onRefresh = () => {
        let isSearch = this.state.isSearch
        if (!isSearch) {
            this.props.overdueAction.getArrearsList(this.props.login.user.id, 0, 10)
                .then(response => {
                    if (response.result) {
                        this.listView.setRefreshing(false)
                        this.listView.setData(response.data)
                        this.props.overdueAction.resetStore()
                    } else {
                        this.listView.setRefreshing(false)
                    }
                })
        } else {
            this.props.overdueAction.toSearchArrears(this.props.login.user.id, this.state.searchValue, 0, 10)
                .then(response => {
                    if (response.result) {
                        this.listView.setRefreshing(false)
                        this.listView.setData(response.data)
                        this.props.overdueAction.resetStore()
                    } else {
                        this.listView.setRefreshing(false)
                    }
                })
        }
    }


    _onEndReached = () => {
        this.start += 10
        let isSearch = this.state.isSearch
        if (!isSearch) {
            this.props.overdueAction.getArrearsList(this.props.login.user.id, this.start, 10)
                .then(response => {
                    if (response.result) {
                        this.listView.addData(response.data)
                    }
                })
        } else {
            this.props.overdueAction.toSearchArrears(this.props.login.user.id, this.state.searchValue, this.start, 10)
                .then(response => {
                    if (response.result) {
                        this.listView.setRefreshing(false)
                        this.listView.setData(response.data)
                        this.props.overdueAction.resetStore()
                    } else {
                        this.listView.setRefreshing(false)
                    }
                })
        }
    }


    _submitEditing = searchValue => {
        this.setState({isSearch: true, searchValue}, () => {
            this._onRefresh()
        })
    }

    _clickSearch = searchValue => {
        this.setState({isSearch: true, searchValue}, () => {
            this._onRefresh()
        })
    }

    _itemClick = (arrearCode, arrearMoney, isSelect) => {
        if (isSelect) {
            this.props.overdueAction.removeOverdueStore(arrearCode, arrearMoney)
        } else {
            this.props.overdueAction.addOverdueStore(arrearCode, arrearMoney)
        }
    }

    renderItem = (item) => {
        let data = item.item
        let index = item.index
        return (
            <ArrearsItemView plate={data.plate}
                             plateColor={data.plateColor}
                             arrearCode={data.arrearCode}
                             arrearMoney={data.arrearMoney}
                             berthCode={data.berthCode}
                             startTime={data.startTime}
                             endTime={data.endTime}
                             pic1={data.pic1}
                             pic2={data.pic2}
                             sectionCode={data.sectionCode}
                             sectionName={data.sectionCode}
                             isSelect={data.isSelect}
                             itemClick={this._itemClick}
            />
        )
    }

    _userPay = () => {
        let ovderdueStore = this.props.overdue.data
        let arrearCodeArr = []
        for (let i = 0; i < ovderdueStore.length; i++) {
            let tempItem = ovderdueStore[i]
            console.log(tempItem)
            if (tempItem.isSelect) {
                arrearCodeArr.push(tempItem.arrearCode)
            }
        }
        let payMoney = this.props.overdue.allMoney
        if (payMoney > 0) {
            this.props.navigation.navigate('ArrearsPayPage', {
                payMoney,
                arrearCodeArr
            })
        } else {
            Toast.message('0元不需要支付')
        }

    }


    render() {
        return (
            <View style={{flex: 1}}>
                <TitleBar title={'欠费补缴'}/>
                <DynamicSearchView submitEditing={this._submitEditing} clickSearch={this._clickSearch}/>
                <BaseContainer isHiddenNavBar={true} store={this.props.overdue}>
                    <SFListView
                        ref={ref => {
                            this.listView = ref
                        }}
                        showBackGround={true}
                        renderItem={this.renderItem}
                        onRefresh={this._onRefresh}
                        onLoad={this._onEndReached}/>
                </BaseContainer>
                <View style={{flexDirection: commonStyle.row, marginLeft: commonStyle.marginLeft - 5}}>
                    <Label text={'合计:'} size={'md'} type={'title'}/>
                    <Label text={`￥${this.props.overdue.allMoney}`} size={'md'} type={'title'}
                           style={{color: commonStyle.themeColor}}/>
                </View>
                <Button title={'支 付'}
                        size='lg'
                        style={{margin: commonStyle.margin - 5}}
                        onPress={this._userPay}
                        type='primary'/>
            </View>
        )
    }

    _renderEmptyView = () => {
        return <EmptyView/>
    }

}

const mapState = (state) => ({
    nav: state.nav,
    login: state.login,
    me: state.me,
    overdue: state.overdue,
})

const dispatchAction = (dispatch) => ({
    overdueAction: bindActionCreators(overdueAction, dispatch),
})

export default connect(mapState, dispatchAction)(OverduePayPage)
