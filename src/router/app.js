/**
 * Created by PVer on 2018/7/13.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Image, Text, View} from 'react-native';
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
import Theme from '../assets/Theme';
//页面栈
import HomePageStack from './stack/HomeStack';
import MapPageStack from './stack/MapStack';
import MePageStack from './stack/MeStack';

// 指定页面隐藏tabbar
const Stacks = [HomePageStack, MapPageStack, MePageStack];
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
            activeTintColor: Theme.primaryColor,
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


const StackRouteConfigs = {
    HomePageStack: HomePageStack,
    MapPageStack: MapPageStack,
    MePageStack: MePageStack,
};

const StackNavigatorConfig = {
    initialRouteName: 'HomePageStack',
    tabBarOptions: {
        activeTintColor: Theme.primaryColor,
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
};

//返回一个React组件
const RootStackNavigator = createBottomTabNavigator(StackRouteConfigs, StackNavigatorConfig);

export default RootStackNavigator;
