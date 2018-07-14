/**
 * Created by PVer on 2018/7/14.
 */
/**
 * Created by PVer on 2018/7/14.
 */
import {
    createStackNavigator
} from 'react-navigation'
import Theme from '../../../src/assets/Theme';
import MePage from '../../pages/MePage';
import ComplaintPage from '../../pages/me/ComplaintPage';

/*
 * --- 路由配置 ---
 * 所有组件都必须在这里注册
 * 在这里设置的navigationOptions的权限 > 对应页面里面的 static navigationOptions的设置 > StackNavigator()第二个参数里navigationOptions的设置
 * 该配置文件会在App.js里的StackNavigator(导航组件)里使用。
 */
const RouteConfig = {
    MePage: {
        screen: MePage,
        navigationOptions: ({navigation}) => ({
            header: null,
            gesturesEnable: true
        })// 此处设置了, 会覆盖组件内的`static navigationOptions`设置. 具体参数详见下文
    },
    ComplaintPage: {
        screen: ComplaintPage,
        navigationOptions: ({navigation}) => ({
            title: '投诉建议',
            gesturesEnable: true
        })
    }
};

// export default RouteConfig

const StackNavigationConfig = {
    initialRouteName: 'MePage', // 设置默认的页面组件，必须是上面已注册的页面组件
    navigationOptions: {  // 屏幕导航的默认选项, 也可以在组件内用 static navigationOptions 设置(会覆盖此处的设置)
        headerStyle: {
            backgroundColor: Theme.primaryColor,
        },
        // headerTintColor: 'rgb(255,255,255)',
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        },
    },
    mode: 'card',  // 页面切换模式, 左右是card(相当于iOS中的push效果), 上下是modal(相当于iOS中的modal效果)
    headerMode: 'float',// 导航栏的显示模式, screen: 有渐变透明效果, float: 无透明效果, none: 隐藏导航栏
    onTransitionStart: () => {
        console.log('导航栏切换开始')
    },  // 回调
    onTransitionEnd: () => {
        console.log('导航栏切换结束')
    }
};

// export default StackNavigationConfig

// 首页页面栈
const MePageStack = createStackNavigator(RouteConfig, StackNavigationConfig);

export default MePageStack;