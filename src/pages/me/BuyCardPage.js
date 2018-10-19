/**
 * Created by cyh on 2018/7/12.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Alert, Image, TouchableOpacity,} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Input, ListRow, Button, Overlay, Label, Toast} from "../../components/teaset/index"
import {BuyCardView} from '../../components'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import {commonStyle} from '../../constants/commonStyle'
import {BeeUtil} from "../../utils"
import {userAction} from '../../actions/index'
import {SFListView,EmptyView,TitleBar} from '../../components/base'
import {images} from "../../assets"

class BuyCardPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchText: ''
        }
    }

    componentDidMount() {
        this._onRefresh()
    }

    _onRefresh = () => {
        this.props.userAction.getCardPage(this.state.searchText)
            .then(response => {
                if (response.result) {
                    this.listView.setRefreshing(false)
                    this.listView.setData(response.data)
                } else {
                    this.listView.setRefreshing(false)
                }
            })
    }


    _onEndReached = () => {
        // let pageStart = this.start + 10
        // this.props.userAction.getCardPage()
        //     .then(response => {
        //         if (response.result) {
        //             this.listView.addData(response.data)
        //         }
        //     })
    }


    _buyCard = (code, price, range) => {
        this.props.navigation.navigate('BuyCardNextOnePage', {code, price, range})
    }

    renderItem = (item) => {
        let data = item.item
        let index = item.index
        return (
            <BuyCardView code={data.code}
                         price={data.price}
                         range={data.range}
                         type={data.type}
                         term={data.term}
                         buyCard={this._buyCard}
            />
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
                        <EvilIcons name={'search'} size={20} color={commonStyle.iconGray}/>
                        <View style={{flexDirection: commonStyle.row, marginLeft: 5}}>
                            <Label size='md' type='title' text='请输入停车场名字'/>
                        </View>
                    </View>
                </TouchableOpacity>
                <SFListView
                    ref={ref => {
                        this.listView = ref
                    }}
                    showBackGround={true}
                    showNoDataImage={images.app_card_empty}
                    renderItem={this.renderItem}
                    onRefresh={this._onRefresh}
                    onLoad={this._onEndReached}/>
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
    userAction: bindActionCreators(userAction, dispatch),
});

export default connect(mapState, dispatchAction)(BuyCardPage)
