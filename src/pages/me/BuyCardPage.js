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

import * as HttpUtil from '../../net/HttpUtils'


class BuyCardPage extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    // static navigationOptions = ({ navigation }) => {
    //     return {
    //         title: navigation.getParam('otherParam', 'A Nested Details Screen'),
    //     };
    // };
    componentDidMount() {
    }

    onFetch = async(page = 1, startFetch, abortFetch) => {
        try {
            let userId = '1100000000073';
            let service = '/card/page?start=0&length=30&';
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
            abortFetch(); //如果遇到网络错误，手动停止刷新或分页
            console.log(err);
        }
    };

    renderItem = (item, index, separator) => {
        return (
            <BuyCardView code={item.code} price={item.price} range={item.range} type={item.type} term={item.term}/>
        )
    };


    // justifyContent:'space-between'
    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={()=>{}}>
                    <View style={{flexDirection:'row',alignItems:'center',backgroundColor:'white'}}>
                        <Image source={{uri: 'https://www.baidu.com/img/bd_logo1.png'}}
                               style={{width: 100, height: 50}}
                        />
                        <View style={{flexDirection:'row',marginLeft:5}}>
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
                    arrowImageStyle={{ width: 20, height: 20, resizeMode: 'contain' }}
                    emptyView={this._renderEmptyView}
                />
            </View>
        );
    }

    _renderEmptyView = () => {
        return <Text>我是没数据</Text>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 5,
    },
});

const mapState = (state) => ({
    // isLoginLable: state.user.isLoginLable,
});

const dispatchAction = (dispatch) => ({
    // login: (user, pwd) => dispatch(userActions.login(user, pwd))
    // loginAction: bindActionCreators(loginActions, dispatch),
    // userAction: bindActionCreators(userActions, dispatch)
});

export default connect(mapState, dispatchAction)(BuyCardPage)