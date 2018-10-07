/**
 * Created by cyh on 2018/7/12.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Alert,} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import SegmentedView from 'teaset/components/SegmentedView/SegmentedView'
import RecordPage from './ParkingRecordPage'
import LotPage from './ParkingLotPage'
import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from 'react-native-scrollable-tab-view';
import {commonStyle} from '../../constants/commonStyle'
import TitleBar from "../../components/base/TitleBar"
import TabBar from '../../components/base/tabbar/TabBar'

class ParkingHistoryPage extends Component {

    constructor(props) {
        super(props);
        this.state = {}
        let tabs = [
            {name: '道路', uri: ''},
            {name: '停车场', uri: ''},
        ];
        // let tabs = ['道路', '停车场'];
        Object.assign(this.state, {
            tabs,
            activeIndex: 0,
            fromIndex: 0
        });
    }

    renderNavBar = props => {
        return (
            <TabBar
                backgroundColor={commonStyle.white}
                activeTextColor={commonStyle.activeTextColor}
                fromIndex={this.state.fromIndex}
                inactiveTextColor={commonStyle.inactiveTextColor}
                underlineStyle={commonStyle.underlineStyle}
                tabContainerWidth={210}
                style={{
                    width: gScreen.screen_width,
                    paddingTop: 10,
                    borderBottomWidth: 0
                }}
                {...props}
                tabs={this.state.tabs}
            />
        )
    }

    onChangeTab = ({i, ref, from}) => {
        if (this.state.activeIndex !== i) {
            this.setState({
                activeIndex: i,
                fromIndex: from
            })
        }
    }
//     indicatorLineColor	string		激活指示器颜色，默认值在 Theme 中设置。
// indicatorLineWidth	number		激活指示器线宽度，默认值在 Theme 中设置。
    //type	string	'projector'	分段器类型。
    // - projector: 幻灯机, 内容页面使用<Projector />组件渲染
    // - carousel: 走马灯, 内容页面使用<Carousel />组件渲染
    render() {
        return (
            <View style={{flex: 1}}>
                <TitleBar title={'停车记录'}/>
                <ScrollableTabView
                    tabBarPosition={'top'}
                    // renderTabBar={this.renderNavBar}
                    onChangeTab={this.onChangeTab}
                    initialPage={0}
                    renderTabBar={() => <ScrollableTabBar style={{height: 40, borderWidth: 0, elevation: 2}}
                                                          tabStyle={{height: 39}}/>}
                    tabBarUnderlineStyle={{backgroundColor: commonStyle.themeColor, height: 2}}
                    tabBarBackgroundColor={commonStyle.white}
                    tabBarActiveTextColor={commonStyle.activeTextColor}
                    tabBarInactiveTextColor={commonStyle.inactiveTextColor}
                    scrollWithoutAnimation={true}
                >
                    <RecordPage tabLabel={'道路'}
                                activeIndex={0}
                    />
                    <LotPage tabLabel={'停车场'}
                             activeIndex={1}
                    />
                    {/*</View>*/}
                    {/*{this.state.tabs.map((v, i) => (*/}
                    {/*<RecordPage*/}
                    {/*key={v.name}*/}
                    {/*{...this.props}*/}
                    {/*tabLabel={v.name}*/}
                    {/*uri={v.uri}*/}
                    {/*activeIndex={this.state.activeIndex}*/}
                    {/*/>*/}
                    {/*))}*/}
                </ScrollableTabView>
            </View>
        );
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

export default connect(mapState, dispatchAction)(ParkingHistoryPage)
