/**
 * Created by cyh on 2018/7/12.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Alert, Image, TouchableOpacity,} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Label from 'teaset/components/Label/Label'
import Toast from 'teaset/components/Toast/Toast'
import {UltimateListView} from 'react-native-ultimate-listview'
import TitleBar from "../../components/base/TitleBar"
import EmptyView from "../../components/base/EmptyView"
import * as HttpUtil from '../../net/HttpUtils'
import {commonStyle} from '../../constants/commonStyle'
import DynamicSearchView from "../../components/DynamicSearchView"

class SearchCardPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            parklotName: '停车场'
        }
    }

    onFetch = async (page = 1, startFetch, abortFetch) => {
        try {
            let service = `/range/parklot/name_list?parklotName=${this.state.parklotName}`
            let pageLimit = 100;
            HttpUtil.fetchRequest(service, 'GET')
                .then(json => {
                    let allData = json.data;
                    let newData = []
                    newData = allData;
                    startFetch(newData, pageLimit)
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
                    marginRight: commonStyle.marginRight,
                }}>
                    <Label text={item}/>
                </View>
            </TouchableOpacity>
        )
    };

    _submitEditing = (value) => {
        Toast.message(value)
        this.setState({parklotName: value}, () => {
            this.flatList.onRefresh()
        })
    }

    render() {
        return (
            <View>
                <TitleBar title={'购买新卡'}/>
                <DynamicSearchView submitEditing={this._submitEditing}/>
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
