/**
 * Created by cyh on 2018/7/12.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Alert, Image, TouchableOpacity,} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Input, ListRow, Button, Overlay, Label, Toast} from "../../components/teaset/index"
import {SFListView, TitleBar, EmptyView} from "../../components/base"
import {MouthCardView} from '../../components'
import {commonStyle} from '../../constants/commonStyle'
import {userAction} from '../../actions/index'
import {images} from "../../assets"

class MouthCardPage extends Component {

    constructor(props) {
        super(props);
        this.start = 0
        this.state = {}
    }

    componentDidMount() {
        this._onRefresh()
    }

    _onRefresh = () => {
        this.props.userAction.getMouthValid(this.props.login.user.id, 0, 10)
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
        this.start += 10
        this.props.userAction.getMouthValid(this.props.login.user.id, this.start, 10)
            .then(response => {
                if (response.result) {
                    this.listView.addData(response.data)
                }
            })
    }

    renderItem = (item) => {
        let data = item.item
        let index = item.index
        return (
            <MouthCardView id={data.id}
                           invalidTime={data.invalidTime}
                           plate={data.plate}
                           plateColor={data.plateColor}
                           price={data.price}
                           validTime={data.validTime}
                           range={data.range}
                           type={data.type}
                           term={data.term}
            />
        )
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <TitleBar title={'月卡'}/>
                <TouchableOpacity onPress={() => {
                    this.props.navigation.navigate('BuyCardPage')
                }}>
                    <View style={{
                        flexDirection: commonStyle.row,
                        alignItems: commonStyle.center,
                        backgroundColor: commonStyle.white,
                        margin: commonStyle.margin - 5,
                        borderRadius: 5,
                    }}>
                        <Image source={images.me_example_card}
                               style={{width: 70, height: 40, margin: commonStyle.margin - 5}}
                        />
                        <View style={{flexDirection: commonStyle.row}}>
                            <Label size='md' type='title' text='海量停车场月卡等着你!'/>
                            <Label size='md' type='title' text='立即购买'/>
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

const mapState = (state) => ({
    nav: state.nav,
    login: state.login,
    me: state.me,
})

const dispatchAction = (dispatch) => ({
    userAction: bindActionCreators(userAction, dispatch),
})

export default connect(mapState, dispatchAction)(MouthCardPage)
