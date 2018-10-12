/**
 * Created by PVer on 2018/7/13.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Image, Text, View} from 'react-native'
import {createStackNavigator, createBottomTabNavigator, createSwitchNavigator} from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'
import {commonStyle} from "../constants/commonStyle"
import LoginStack from './stack/LoginStack'

/**Stack*/
import HomePage from '../pages/HomePage'
import MapPage from '../pages/MapPage'
import MePage from '../pages/MePage'

/**Home*/
import SwitchCarPage from '../pages/home/SwitchCarPage'
import ParkingPayPage from '../pages/home/ParkingPayPage'
import ParkingOrderPage from '../pages/home/ParkingOrderPage'
/**Map*/
import SearchPage from '../pages/map/SearchPage'
/**Me*/
import ComplaintPage from '../pages/me/ComplaintPage'
import ParkingRecordPage from '../pages/me/ParkingRecordPage'
import ParkingLotPage from '../pages/me/ParkingLotPage'
import UserOrderPage from '../pages/me/UserOrderPage'
import SettingPage from '../pages/me/SettingPage'
import ModifyPwdPage from '../pages/me/ModifyLoginPwdPage'
import AutoExplainPage from '../pages/me/AutoExplainPage'
import MessagePage from '../pages/me/MessagePage'
import UserWalletPage from '../pages/me/UserWalletPage'
import PayDetailPage from '../pages/me/PayDetailPage'
import HomeUpingScreen from '../pages/me/HomeUpingScreen'
import UserInfoPage from '../pages/me/UserInfoPage'
import ResetPwdPage from '../pages/me/ResetPwdPage'
import ModifyNamePage from '../pages/me/ModifyNamePage'
import ParkingRecordDetailPage from '../pages/me/ParkingRecordDetailPage'
import UserBindCarPage from '../pages/me/UserBindCarPage'
import UserAddBindCarPage from '../pages/me/UserAddBindCarPage'
import CarApprovalPage from '../pages/me/CarApprovalPage'
import UserRechargePage from '../pages/me/UserRechargePage'
import CarDetailPage from '../pages/me/CarDetailPage'
import BindCarPage from '../pages/me/BindCarPage'
import ParkingHistoryPage from '../pages/me/ParkingHistoryPage'
import CouponPage from '../pages/me/CouponPage'
import MouthCardPage from '../pages/me/MouthCardPage'
import BuyCardPage from '../pages/me/BuyCardPage'
import BuyCardOrderPage from '../pages/me/BuyCardOrderPage'
import BuyCardNextOnePage from '../pages/me/BuyCardNextOnePage'
import BuyCardNextTwoPage from '../pages/me/BuyCardNextTwoPage'
import BuyCardNextPayPage from '../pages/me/BuyCardNextPayPage'
import CouponHisPage from '../pages/me/CouponHisPage'
import SearchCardPage from '../pages/me/SearchCardPage'
import AuthenticationPage from '../pages/me/AuthenticationPage'
import AuthenticationDetailPage from '../pages/me/AuthenticationDetailPage'
import OverduePayPage from '../pages/me/OverduePayPage'
import ArrearsPayPage from '../pages/me/ArrearsPayPage'

/******************************** APP主栈 **************************************/

const StackRouteConfigs = {
    HomePage: {
        screen: HomePage,
        navigationOptions: ({navigation}) => ({
            tabBarLabel: '首页'
        })
    },
    MapPage: {
        screen: MapPage,
        navigationOptions: ({navigation}) => ({
            tabBarLabel: '地图'
        })
    },
    MePage: {
        screen: MePage,
        navigationOptions: ({navigation}) => ({
            tabBarLabel: '我的'
        })
    },
}

const StackNavigatorConfig = {
    initialRouteName: 'HomePage',
    tabBarOptions: {
        activeTintColor: commonStyle.themeColor,
        inactiveTintColor: 'gray',
    },
    navigationOptions: ({navigation}) => ({
        header: null,
        gesturesEnable: true,
        tabBarIcon: ({tintColor, focused}) => {
            const {routeName} = navigation.state
            let iconName
            if (routeName === 'HomePage') {
                iconName = 'home'
                if (focused) {
                    return (
                        <Image
                            source={require('../assets/images/app_home_pressed.png')}
                            resizeMode={commonStyle.contain}
                            style={[{tintColor: tintColor, height: 30, width: 30}]}
                        />
                    );
                }
                return (
                    <Image
                        source={require('../assets/images/app_home.png')}
                        resizeMode={commonStyle.contain}
                        style={[{height: 30, width: 30}]}
                    />
                );
            } else if (routeName === 'MapPage') {
                iconName = 'at'
                if (focused) {
                    return (
                        <Image
                            source={require('../assets/images/app_map_pressed.png')}
                            resizeMode={commonStyle.contain}
                            style={[{tintColor: tintColor, height: 35, width: 35}]}
                        />
                    );
                }
                return (
                    <Image
                        source={require('../assets/images/app_map.png')}
                        resizeMode={commonStyle.contain}
                        style={[{height: 35, width: 35}]}
                    />
                );
            } else if (routeName === 'MePage') {
                iconName = 'home'
                if (focused) {
                    return (
                        <Image
                            source={require('../assets/images/app_me_pressed.png')}
                            resizeMode={commonStyle.contain}
                            style={[{tintColor: tintColor, height: 30, width: 30}]}
                        />
                    );
                }
                return (
                    <Image
                        source={require('../assets/images/app_me.png')}
                        resizeMode={commonStyle.contain}
                        style={[{height: 30, width: 30}]}
                    />
                );
            }
            // return <Icon name={iconName} size={25} color={tintColor}/>
        },
    }),
}

//返回一个React组件
const HomeStackNavigator = createBottomTabNavigator(StackRouteConfigs, StackNavigatorConfig)

/******************************** APP普通栈 **************************************/

const AppStackRouteConfigs = {
    HomeStackNavigator: HomeStackNavigator,
    //home
    SwitchCarPage: SwitchCarPage,
    ParkingPayPage: ParkingPayPage,
    ParkingOrderPage: ParkingOrderPage,
    //map
    SearchPage: SearchPage,
    //me
    ComplaintPage: ComplaintPage,
    ParkingRecordPage: ParkingRecordPage,
    ParkingLotPage: ParkingLotPage,
    UserOrderPage: UserOrderPage,
    SettingPage: SettingPage,
    ModifyPwdPage: ModifyPwdPage,
    AutoExplainPage: AutoExplainPage,
    MessagePage: MessagePage,
    UserWalletPage: {
        screen: UserWalletPage,
        navigationOptions: ({navigation}) => ({
            title: '我的钱包',
        })
    },
    PayDetailPage: PayDetailPage,
    HomeUpingScreen: HomeUpingScreen,
    UserInfoPage: UserInfoPage,
    ResetPwdPage: ResetPwdPage,
    ModifyNamePage: ModifyNamePage,
    ParkingRecordDetailPage: ParkingRecordDetailPage,
    UserBindCarPage: UserBindCarPage,
    UserAddBindCarPage: UserAddBindCarPage,
    CarApprovalPage: CarApprovalPage,
    UserRechargePage: UserRechargePage,
    CarDetailPage: CarDetailPage,
    BindCarPage: BindCarPage,
    ParkingHistoryPage: ParkingHistoryPage,
    CouponPage: CouponPage,
    MouthCardPage: MouthCardPage,
    BuyCardPage: BuyCardPage,
    BuyCardOrderPage: BuyCardOrderPage,
    BuyCardNextOnePage: BuyCardNextOnePage,
    BuyCardNextTwoPage: BuyCardNextTwoPage,
    BuyCardNextPayPage: BuyCardNextPayPage,
    CouponHisPage: CouponHisPage,
    SearchCardPage: SearchCardPage,
    AuthenticationPage: AuthenticationPage,
    AuthenticationDetailPage: AuthenticationDetailPage,
    OverduePayPage: OverduePayPage,
    ArrearsPayPage: ArrearsPayPage,
}

const AppStackNavigatorConfig = {
    initialRouteName: 'HomeStackNavigator',
    navigationOptions: {
        gesturesEnabled: true,
        header: null,
        gestureResponseDistance: {
            horizontal: 300
        },
        headerStyle: {
            backgroundColor: '#00A1EA',
        },
        headerBackTitle: '返回',
        headerTitleStyle: {
            fontSize: 18,
            flex: 1,
            textAlign: 'center',
        },
        headerTintColor: '#FFF'
    },
    // transitionConfig: (() => ({
    //     screenInterpolator: StackViewStyleInterpolator.forHorizontal
    // }))
}

const AppStackNavigator = createStackNavigator(AppStackRouteConfigs, AppStackNavigatorConfig)

/******************************** APP登录栈 **************************************/

const MainStackRouteConfigs = {
    // Launch: Launch,
    // GuidePager: GuidePager,
    LoginStack: LoginStack,
    AppStackNavigator: AppStackNavigator
};

const MainStackNavigatorConfig = {
    initialRouteName: 'LoginStack',
    navigationOptions: {
        gesturesEnabled: true,
        header: null,
        gestureResponseDistance: {
            horizontal: 300
        },
        headerStyle: {
            backgroundColor: '#00A1EA',
        },
        headerBackTitle: '返回',
        headerTitleStyle: {
            fontSize: 18,
            flex: 1,
            textAlign: 'center',
        },
        headerTintColor: '#FFF'
    },
    // transitionConfig: (() => ({
    //     screenInterpolator: StackViewStyleInterpolator.forHorizontal
    // }))
}

const AppRootStackNavigator = createSwitchNavigator(MainStackRouteConfigs, MainStackNavigatorConfig)

export default AppRootStackNavigator

/**********************************************************************/
