/**
 * Created by PVer on 2018/7/14.
 */
/**
 * Created by PVer on 2018/7/14.
 */
import {
    createStackNavigator
} from 'react-navigation'
import Theme from '../../../src/assets/Theme'
import MapPage from '../../pages/MapPage'
/*
 * --- 路由配置 ---
 * 所有组件都必须在这里注册
 * 在这里设置的navigationOptions的权限 > 对应页面里面的 static navigationOptions的设置 > StackNavigator()第二个参数里navigationOptions的设置
 * 该配置文件会在App.js里的StackNavigator(导航组件)里使用。
 */
const RouteConfig = {
    MapPage: {
        screen: MapPage,
        navigationOptions: ({navigation}) => ({
            title: '地图',
            gesturesEnable: false
        })// 此处设置了, 会覆盖组件内的`static navigationOptions`设置.
    }
};

// export default RouteConfig

const StackNavigationConfig = {
    initialRouteName: 'MapPage', // 设置默认的页面组件，必须是上面已注册的页面组件
    navigationOptions: {  // 屏幕导航的默认选项, 也可以在组件内用 static navigationOptions 设置(会覆盖此处的设置)
        header: null,
        headerStyle: {
            backgroundColor: Theme.primaryColor,
        },
        // headerTintColor: 'rgb(255,255,255)',设置导航栏颜色
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        },
    },
    mode: 'card',  // 页面切换模式, 左右是card(相当于iOS中的push效果), 上下是modal(相当于iOS中的modal效果)
    headerMode: 'float',// 导航栏的显示模式, screen: 有渐变透明效果, float: 无透明效果, none: 隐藏导航栏
    onTransitionStart: () => {
        console.log('导航栏切换开始')
    },
    onTransitionEnd: () => {
        console.log('导航栏切换结束')
    }
};

// export default StackNavigationConfig

// 首页页面栈
const MapPageStack = createStackNavigator(RouteConfig, StackNavigationConfig);

export default MapPageStack;
