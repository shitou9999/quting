/**
 * Created by cyh on 2018/7/12.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Alert, Image, TouchableOpacity,} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Input, ListRow, Button, Overlay, Label, Toast} from "../../components/teaset/index"
import {commonStyle} from '../../constants/commonStyle'
import {DynamicSearchView} from "../../components"
import userAction from '../../actions/user'
import {SFListView, TitleBar, EmptyView} from "../../components/base"

class SearchCardPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            parklotName: '停车场'
        }
    }

    componentDidMount() {
        this._onRefresh()
    }

    _onRefresh = () => {
        this.props.userAction.getSearchPage(this.state.parklotName)
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
        this.props.userAction.getSearchPage(this.state.parklotName)
            .then(response => {
                if (response.result) {
                    this.listView.addData(response.data)
                }
            })
    }

    renderItem = (item) => {
        let data = item.item
        return (
            <TouchableOpacity onPress={() => {
                this.props.navigation.state.params.returnData(data)
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
                    <Label text={data}/>
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
                <SFListView
                    ref={ref => {
                        this.listView = ref
                    }}
                    showBackGround={true}
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
});

const dispatchAction = (dispatch) => ({
    userAction: bindActionCreators(userAction, dispatch),
});

export default connect(mapState, dispatchAction)(SearchCardPage)
