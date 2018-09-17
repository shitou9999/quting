/**
 * Created by cyh on 2018/7/12.
 */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Alert,
    Image,
    TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Label from 'teaset/components/Label/Label'
import MouthCardView from '../../components/MouthCardView'
import {UltimateListView} from 'react-native-ultimate-listview'
import TitleBar from "../../components/TitleBar"
import EmptyView from "../../components/EmptyView"

import * as HttpUtil from '../../net/HttpUtils'
import {commonStyle} from '../../constants/commonStyle'

class MouthCardPage extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
    }

    //分页查询未过期的会员卡
    onFetch = async (page = 1, startFetch, abortFetch) => {
        try {
            const {login} = this.props
            let userId = login.user.id;
            let service = `/card/user/valid?userId=${userId}&start=0&length=30&`;
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

    renderItem = (item, index, separator) => {
        return (
            <MouthCardView id={item.id}
                           invalidTime={item.invalidTime}
                           plate={item.plate}
                           plateColor={item.plateColor}
                           price={item.price}
                           validTime={item.validTime}
                           range={item.range}
                           type={item.type}
                           term={item.term}
            />
        )
    };

    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <TitleBar title={'月卡'} navigation={this.props.navigation}/>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('BuyCardPage')
                }}>
                    <View style={{
                        flexDirection: commonStyle.row,
                        alignItems: commonStyle.center,
                        backgroundColor: commonStyle.white,
                        margin: commonStyle.margin - 5,
                        borderRadius: 5,
                    }}>
                        <Image source={require('../../assets/images/me_example_card.png')}
                               style={{width: 70, height: 40, margin: commonStyle.margin-5}}
                        />
                        <View style={{flexDirection: commonStyle.row}}>
                            <Label size='md' type='title' text='海量停车场月卡等着你!'/>
                            <Label size='md' type='title' text='立即购买'/>
                        </View>
                    </View>
                </TouchableOpacity>
                <UltimateListView
                    ref={(ref) => this.flatList = ref}
                    onFetch={this.onFetch}
                    refreshableMode="basic" //basic or advanced
                    keyExtractor={(item, index) => `${index} - ${item}`}
                    item={this.renderItem}
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

export default connect(mapState, dispatchAction)(MouthCardPage)