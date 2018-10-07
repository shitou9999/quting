/**
 * Created by cyh on 2018/7/12.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Alert, Image, TouchableOpacity,} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Label from 'teaset/components/Label/Label'
import BuyCardView from '../../components/BuyCardView'
import {UltimateListView} from 'react-native-ultimate-listview'
import TitleBar from "../../components/base/TitleBar"
import EmptyView from "../../components/base/EmptyView"
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import * as HttpUtil from '../../net/HttpUtils'
import {commonStyle} from '../../constants/commonStyle'
import BeeUtil from "../../utils/BeeUtil"


class BuyCardPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchText: ''
        }
    }

    onFetch = async (page = 1, startFetch, abortFetch) => {
        try {
            const {searchText} = this.state
            let service = `/card/page?start=0&length=30&parklotName=${searchText}`
            let pageLimit = 10;
            HttpUtil.fetchRequest(service, 'GET')
                .then(json => {
                    let allData = json.aaData
                    let newData = []
                    newData = allData;
                    startFetch(newData, pageLimit)
                })
                .catch(err => {
                })
        } catch (err) {
            abortFetch();
            console.log(err)
        }
    };

    _buyCard = (code, price, range) => {
        const {navigation} = this.props
        navigation.navigate('BuyCardNextOnePage', {code, price, range})
    }

    renderItem = (item, index, separator) => {
        return (
            <BuyCardView code={item.code} price={item.price} range={item.range} type={item.type} term={item.term}
                         buyCard={this._buyCard}/>
        )
    }

    returnData(searchText) {
        if (BeeUtil.isNotEmpty(searchText)) {
            this.setState({searchText: searchText})
            this.flatList.onRefresh()
        }
    }

    render() {
        return (
            <View>
                <TitleBar title={'购买新卡'}/>
                <TouchableOpacity onPress={() => {
                    this.props.navigation.navigate('SearchCardPage', {returnData: this.returnData.bind(this)})
                }}>
                    <View style={styles.searchStyle}>
                        <EvilIcons name={'search'} size={20} color={commonStyle.darkGray}/>
                        <View style={{flexDirection: commonStyle.row, marginLeft: 5}}>
                            <Label size='md' type='title' text='请输入停车场名字'/>
                        </View>
                    </View>
                </TouchableOpacity>
                <UltimateListView
                    ref={(ref) => this.flatList = ref}
                    onFetch={this.onFetch}
                    refreshableMode="basic" //basic or advanced
                    keyExtractor={(item, index) => `${index} - ${item}`}
                    item={this.renderItem}  //this takes two params (item, index)
                    displayDate
                    arrowImageStyle={{width: 20, height: 20, resizeMode: 'contain'}}
                    emptyView={this._renderEmptyView}
                />
            </View>
        );
    }

    _renderEmptyView = () => {
        return <EmptyView/>
    }
}

const styles = StyleSheet.create({
    searchStyle: {
        flexDirection: commonStyle.row,
        alignItems: commonStyle.center,
        justifyContent: commonStyle.center,
        backgroundColor: commonStyle.white,
        height: 40,
        borderRadius: 5,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        marginBottom: 5,
    }
});

const mapState = (state) => ({
    nav: state.nav,
    login: state.login,
    me: state.me,
});

const dispatchAction = (dispatch) => ({
    // login: (user, pwd) => dispatch(userActions.login(user, pwd))
    // loginAction: bindActionCreators(loginActions, dispatch)
});

export default connect(mapState, dispatchAction)(BuyCardPage)
