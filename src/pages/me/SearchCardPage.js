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
import TitleBar from "../../components/TitleBar"
import EmptyView from "../../components/EmptyView"
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import * as HttpUtil from '../../net/HttpUtils'
import {commonStyle} from '../../constants/commonStyle'

class SearchCardPage extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    onFetch = async (page = 1, startFetch, abortFetch) => {
        try {
            let service = '/range/parklot/name_list?parklotName=停车场'
            let pageLimit = 10;
            HttpUtil.fetchRequest(service, 'GET')
                .then(json => {
                    let allData = json.data;
                    let newData = []
                    newData = allData;
                    startFetch(newData, pageLimit);
                })
                .catch(err => {
                })
        } catch (err) {
            abortFetch();
            console.log(err);
        }
    };


    renderItem = (item, index, separator) => {
        return (
            <TouchableOpacity onPress={() => {
                this.props.navigation.state.params.returnData(item)
                this.props.navigation.goBack()
            }}>
                <View style={{
                    height: 40,
                    alignItems: commonStyle.center,
                    justifyContent: commonStyle.center,
                    backgroundColor: commonStyle.white,
                    marginLeft: commonStyle.marginLeft,
                    marginRight: commonStyle.marginRight
                }}>
                    <Label text={item}/>
                </View>
            </TouchableOpacity>
        )
    };


    render() {
        const {navigation} = this.props;
        return (
            <View>
                <TitleBar title={'购买新卡'} navigation={this.props.navigation}/>
                <TouchableOpacity onPress={() => {

                }}>
                    <View style={styles.searchStyle}>
                        <EvilIcons name={'search'} size={20} color={commonStyle.darkGray}/>
                        <View style={{flexDirection: commonStyle.row, marginLeft: 5}}>
                            <Label size='md' type='title' text='搜索'/>
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

export default connect(mapState, dispatchAction)(SearchCardPage)
