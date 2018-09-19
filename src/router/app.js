/**
 * Created by PVer on 2018/7/13.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Image, Text, View} from 'react-native'
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'
// import {
//     HomePage,
//     MapPage,
//     MePage,
//     Theme
// } from '../router';
//页面
// import HomePage from '../pages/HomePage'
// import MapPage from '../pages/MapPage'
// import MePage from '../pages/MePage'
import {commonStyle} from "../constants/commonStyle"
//页面栈
import HomePageStack from './stack/HomeStack'
import MapPageStack from './stack/MapStack'
import MePageStack from './stack/MeStack'
import LoginStack from './stack/LoginStack'

/********************************APP主栈**************************************/
// 指定页面隐藏tabbar
const Stacks = [HomePageStack, MapPageStack, MePageStack]

Stacks.forEach((item) => {
    item.navigationOptions = ({navigation}) => {
        let tabBarVisible = true;
        if (navigation.state.index > 0) {
            tabBarVisible = false
        }
        return {
            tabBarVisible,
        }
    }
});

const StackRouteConfigs = {
    '首页': HomePageStack,
    '地图': MapPageStack,
    '我的': MePageStack,
};

const StackNavigatorConfig = {
    initialRouteName: '首页',
    tabBarOptions: {
        activeTintColor: commonStyle.themeColor,
        inactiveTintColor: 'gray',
    },
    navigationOptions: ({navigation}) => ({
        tabBarIcon: ({tintColor, focused}) => {
            const {routeName} = navigation.state
            let iconName
            if (routeName === '首页') {
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
            } else if (routeName === '地图') {
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
            } else if (routeName === '我的') {
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
};

//返回一个React组件
const RootStackNavigator = createBottomTabNavigator(StackRouteConfigs, StackNavigatorConfig);

// export default RootStackNavigator;
/********************************APP登录栈**************************************/

const MainStackRouteConfigs = {
    // Launch: Launch,
    // GuidePager: GuidePager,
    LoginStack: LoginStack,
    RootStackNavigator: RootStackNavigator
};

const MainStackNavigatorConfig = {
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
};

const AppRootStackNavigator = createStackNavigator(MainStackRouteConfigs, MainStackNavigatorConfig);

export default AppRootStackNavigator;

/**********************************************************************/

// 构建材料设计的底部导航
const AppNavigator = createBottomTabNavigator(
    {
        HomePageStack: HomePageStack,
        MapPageStack: MapPageStack,
        MePageStack: MePageStack,
    },
    {
        initialRouteName: 'HomePageStack',
        tabBarOptions: {
            activeTintColor: commonStyle.themeColor,
            inactiveTintColor: 'gray',
        },
        navigationOptions: ({navigation}) => ({
            tabBarIcon: ({tintColor}) => {
                const {routeName} = navigation.state;
                let iconName;
                if (routeName === 'HomePageStack') {
                    iconName = 'home'
                } else if (routeName === 'MapPageStack') {
                    iconName = 'at'
                } else if (routeName === 'MePageStack') {
                    iconName = 'home'
                }
                return <Icon name={iconName} size={25} color={tintColor}/>
                // return <Image
                //     source={require('./assets/images/test.png')}
                //     style={[{tintColor: tintColor},styles.tabbarImage]}
                // />
            },
        }),
    },
);
