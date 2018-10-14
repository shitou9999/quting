/**
 * Created by PVer on 2018/7/14.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import OrderUnpaidView from './OrderUnpaidPage'
import OrderAllView from './OrderAllPage'
import {commonStyle} from '../../constants/commonStyle'
import {BaseContainer} from "../../components/base/index"
import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from 'react-native-scrollable-tab-view'
import CustomTabBar from "../../components/base/tabbar/CustomTabBar"


class UserOrderPage extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }


    render() {
        return (
            <BaseContainer title={'我的订单'}>
                <ScrollableTabView
                    tabBarPosition={'top'}
                    renderTabBar={() => (
                        <CustomTabBar
                            backgroundColor={commonStyle.white}
                            tabUnderlineDefaultWidth={20} // default containerWidth / (numberOfTabs * 4)
                            tabUnderlineScaleX={3} // default 3
                            activeColor={commonStyle.themeColor}
                            inactiveColor={"#333"}
                        />)}
                >
                    <OrderUnpaidView tabLabel={'待支付'}
                                     activeIndex={0}
                    />
                    <OrderAllView tabLabel={'全部'}
                                  activeIndex={1}
                    />
                </ScrollableTabView>
            </BaseContainer>

        );
    }
}


export default UserOrderPage
