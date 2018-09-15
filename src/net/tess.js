// 创建一个 StackNavigation
// const StackNavigation = StackNavigator({
//     Root: {
//         screen: HelloPage
//     }},
//     AppNavigation: {screen: AppNavigation},
//     OrderDetail: {screen: OrderDetailScreen, navigationOptions: {title: "订单详情",}});
//监听 screen 的切换
{/*<AppNavigation onNavigationStateChange={_onNavigationStateChange}/>*/
}

// function getCurrentRouteName(navigationState) {
//     if (!navigationState) {
//         return null;
//     }
//     const route = navigationState.routes[navigationState.index];
//     console.log("navigationState.index=" + navigationState.index);
//     console.log("route.routeName=" + route.routeName);//dive into nested navigators
//     if (route.routes) {
//         return getCurrentRouteName(route);
//     }
//     return route.routeName;
// }

/*
function _onNavigationStateChange(prevState, currentState , action) {
    const currentScene = getCurrentRouteName(currentState);
    const previousScene = getCurrentRouteName(prevState);

    switch (currentScene) {
        case "ProfileScreen":
            StatusBar.setHidden(false);
            break;
        case "OrderScreen":
            StatusBar.setHidden(false);
             StatusBar.setBarStyle("light-content", true);
            if (Platform.OS === "android") {
                StatusBar.setBackgroundColor(colors.topBar, true);
                StatusBar.setTranslucent(true);
            }
            break;
        default:
            StatusBar.setHidden(false);
            StatusBar.setBarStyle("dark-content", true);
            if (Platform.OS === "android") {
                StatusBar.setBackgroundColor("white", true);
                StatusBar.setTranslucent(true); }
                break;
    }
}
*/
// 由于 _onNavigationStateChange 只有在 screen 变化的时候才会有效，所以应用的第一个界面是不能在这里进行配置的


{/*<StatusBar*/}
    {/*animated={true} //指定状态栏的变化是否应以动画形式呈现。目前支持这几种样式：backgroundColor, barStyle和hidden*/}
    {/*hidden={false}  //是否隐藏状态栏。*/}
    {/*backgroundColor={this.state.MainColor} //状态栏的背景色*/}
//指定状态栏是否透明。设置为true时，应用会在状态栏之下绘制（即所谓“沉浸式”——被状态栏遮住一部分）。常和带有半透明背景色的状态栏搭配使用。*/}
    {/*translucent={true}
    {/*barStyle='light-content'*/}
{/*/>*/}

