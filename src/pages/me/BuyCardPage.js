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
import * as HttpUtil from '../../net/HttpUtils'
import {commonStyle} from '../../constants/commonStyle'

class BuyCardPage extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    onFetch = async (page = 1, startFetch, abortFetch) => {
        try {
            const {login} = this.props
            let userId = login.user.id
            let service = '/card/page?start=0&length=30&'
            let pageLimit = 10;
            HttpUtil.fetchRequest(service, 'GET')
                .then(json => {
                    let allData = json.aaData;
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

    _buyCard = () => {
        const {navigation} = this.props;
        navigation.navigate('BuyCardNextOnePage')
    }

    renderItem = (item, index, separator) => {
        return (
            <BuyCardView code={item.code} price={item.price} range={item.range} type={item.type} term={item.term}
                         buyCard={this._buyCard}/>
        )
    };


    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <TitleBar title={'购买新卡'} navigation={this.props.navigation}/>
                <TouchableOpacity onPress={() => {
                }}>
                    <View style={{
                        flexDirection: commonStyle.row,
                        alignItems: commonStyle.center,
                        backgroundColor: commonStyle.white
                    }}>
                        <Image source={{uri: 'https://www.baidu.com/img/bd_logo1.png'}}
                               style={{width: 100, height: 50}}
                        />
                        <View style={{flexDirection: commonStyle.row, marginLeft: 5}}>
                            <Label size='md' type='title' text='搜索搜索'/>
                            <Label size='md' type='title' text='立即购买'/>
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
    container: {
        flex: 1,
    },
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