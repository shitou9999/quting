import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableWithoutFeedback, Image, StatusBar} from 'react-native';
import {bindActionCreators} from "redux"
import {commonStyle} from "../../constants/commonStyle"
import {DynamicSearchView} from "../../components/index"
import {Input, ListRow, Button, Overlay, Label, Toast} from "../../components/teaset/index"
import Entypo from 'react-native-vector-icons/Entypo'
import * as mapAction from "../../actions/map"
import connect from "react-redux/es/connect/connect"


class SearchPage extends Component {

    _submitEditing = () => {
        Toast.message('9666666')
    }

    render() {
        return (
            <View>
                {/*没有StatusBar则显示黑色*/}
                <StatusBar
                    backgroundColor={commonStyle.themeColor}
                    barStyle={'light-content'}
                    translucent={true}/>
                {/*没有View则TitleBar会被盖住*/}
                <View style={styles.statusBar}/>
                <View style={{
                    height: 50,
                    flexDirection: commonStyle.row,
                    backgroundColor: commonStyle.themeColor,
                    alignItems: commonStyle.center
                }}>
                    <TouchableWithoutFeedback onPress={() => {
                        this.props.navigation.goBack()
                    }}>
                        <Entypo name={'chevron-thin-left'} size={25} color={commonStyle.white}/>
                    </TouchableWithoutFeedback>
                    <View style={{flex: 1}}>
                        <DynamicSearchView submitEditing={this._submitEditing} placeholder={'搜索目的地'}/>
                    </View>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    statusBar: {
        width: gScreen.screen_width,
        height: gScreen.statusBarHeight,
        backgroundColor: commonStyle.themeColor
    }
})


const mapState = (state) => ({
    nav: state.nav,
    login: state.login,
    me: state.me,
    map: state.map,
})

const dispatchAction = (dispatch) => ({
    mapAction: bindActionCreators(mapAction, dispatch),
})

export default connect(mapState, dispatchAction)(SearchPage)
