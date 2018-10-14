/**
 * Created by cyh on 2018/7/12.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Alert,} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import RecordPage from './ParkingRecordPage'
import LotPage from './ParkingLotPage'
import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from 'react-native-scrollable-tab-view'
import {commonStyle} from '../../constants/commonStyle'
import {TitleBar} from "../../components/base"
import TabBar from '../../components/base/tabbar/TabBar'
import CustomTabBar from "../../components/base/tabbar/CustomTabBar"

class ParkingHistoryPage extends Component {

    constructor(props) {
        super(props);
        this.state = {}
        let tabs = [
            {name: '道路', uri: ''},
            {name: '停车场', uri: ''},
        ];
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
                    renderTabBar={() => (
                        <CustomTabBar
                            backgroundColor={commonStyle.white}
                            tabUnderlineDefaultWidth={20} // default containerWidth / (numberOfTabs * 4)
                            tabUnderlineScaleX={3} // default 3
                            activeColor={commonStyle.themeColor}
                            inactiveColor={"#333"}
                        />)}
                >
                    <RecordPage tabLabel={'道路'} {...this.props}/>
                    <LotPage tabLabel={'停车场'} {...this.props}/>
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
