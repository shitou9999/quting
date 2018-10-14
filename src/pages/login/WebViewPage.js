import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Image, WebView} from 'react-native';
import PropTypes from 'prop-types'
import {TitleBar} from "../../components/base/index"
import {commonStyle} from "../../constants/commonStyle"

class WebViewPage extends Component {
//     static navigatorStyle = {
//         navBarHidden: true
//     };
    url = ''

    componentDidMount() {
        this.url = this.props.navigation.getParam('url')
    }

    // static propTypes = {
    //     url: PropTypes.string.isRequired
    // };

    constructor(props) {
        super(props);
        this.state = {
            url: props.url || '',
            title: '',
            canGoBack: false,
            canGoForward: false,
            loading: true,
            scalesPageToFit: true,
            progress: 0,
            loadStart: false,
            loadEnd: false
        };
        this.timer = null;
        this.percent = null
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    onLoadStart = e => {
        // console.log(e.nativeEvent)
        // console.log('start')
        if (this.state.loadStart) {
            return;
        }
        this.percent = 0;
        this.timer = setInterval(_ => {
            ++this.percent;
            let progress = this.state.progress;
            if (progress >= 80) {
                clearInterval(this.timer);
                return;
            }
            this.setState({
                loadStart: true,
                loadEnd: false,
                progress: 1 * this.percent
            })
        }, 20);
    };

    onError = e => {
        // console.log(e.nativeEvent)
    };
    onLoad = e => {
        // console.log('load')
    };

    onLoadEnd = e => {
        clearInterval(this.timer);
        this.setState({
            progress: 100
        }, () => {
            setTimeout(() => {
                this.setState({
                    loadStart: false,
                    loadEnd: true
                })
            }, 500);
        });
    };

    renderError = () => {
        return <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20
        }}>
            <Image
                style={{
                    width: 30,
                    height: 30,
                    marginRight: 8
                }}
                source={require('../../assets/images/app_empty.png')}
            />
            <Text>页面出错啦！</Text>
        </View>
    };

    onShouldStartLoadWithRequest = e => {
        // Implement any custom loading logic here, don't forget to return!
// 解决WebKitErrorDomain code:101的警告
// http://leonhwa.com/blog/0014905236320002ebb3db97fe64fb3bb6f047eafb1c5de000
        let scheme = e.url.split('://')[0];
        return scheme === 'http' || scheme === 'https';
    };

    onNavigationStateChange = (navState) => {
        ++this.percent;
        // console.log(navState)
        this.setState({
            progress: 10 * this.percent,
            canGoBack: navState.canGoBack,
            canGoForward: navState.canGoForward,
            url: navState.url,
            title: navState.title,
            loading: navState.loading,
            scalesPageToFit: true
        });
    };

    goBack = () => {
        this.web && this.web.goBack();
    };

    goForward = () => {
        this.web && this.web.goForward();
    };

    reload = () => {
        this.web && this.web.reload();
    };

    renderLoading = () => {
        return !this.state.loadEnd && <View style={{
            height: 2,
            width: this.state.progress * (gScreen.screen_width / 100),
            backgroundColor: commonStyle.green
        }}/>
    };

    onMessage = data => {

    };

    //打开外部浏览器
    openSafari = () => {
        Linking
            .openURL(this.state.url)
            .catch(err => alert('出错啦'));
    }

    render() {
        // console.log(this.props.isFocused)
        // const source = (Platform.OS == 'ios') ? require('./pages/demo.html') : { uri: 'file:///android_asset/pages/demo.html' }
        return (
            <View style={{flex: 1, backgroundColor: commonStyle.bgColor}}>
                <TitleBar title={'服务条款'}/>
                {this.renderLoading()}
                {/*{*/}
                {/*this.props.isFocused &&*/}
                {/*}*/}
                <WebView
                    ref={ref => this.web = ref}
                    automaticallyAdjustContentInsets={true}
                    dataDetectorTypes={['phoneNumber', 'link']}
                    style={{flex: 1}}
                    onLoadStart={this.onLoadStart}
                    onError={this.onError}
                    // injectedJavaScript={this.injectedJavaScript}
                    onLoad={this.onLoad}
                    onLoadEnd={this.onLoadEnd}
                    onMessage={this.onMessage}
                    // renderLoading={this.renderLoading}
                    source={{uri: this.url}}
                    javaScriptEnabled={false}
                    domStorageEnabled={true}
                    decelerationRate={'normal'}
                    renderError={this.renderError}
                    onNavigationStateChange={this.onNavigationStateChange}
                    onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
                    startInLoadingState={true}
                    scalesPageToFit={true}
                />
            </View>
        )
    }

}

export default WebViewPage
