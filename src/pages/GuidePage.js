import React, {Component} from 'react';
import {
    View,
    Text,
    StatusBar,
    StyleSheet
} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Carousel, Button} from 'teaset'
import {commonStyle} from "../constants/commonStyle"
import SplashScreen from "react-native-splash-screen"
import {loginAction} from '../actions/index'

class GuidePage extends Component {
    //引导页数据,替换成项目图片
    list = ['指导页面', '指导页面2', '指导页面3']

    state = {
        isShow: false
    }

    componentDidMount() {
        // do anything while splash screen keeps, use await to wait for an async task.
        SplashScreen.hide()
        this.props.getMemberDictionary()
        this.props.getDcRoadDictionary()
        // this.props.getDcLotDictionary()

        this._getFirstKey()
            .then(result => {
                if (!result) {
                    this.props.navigation.navigate('LoginStack')
                }
            })
    }


    _getFirstKey = async () => {
        let result = await gStorage.load('first', result => result)
        return result
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    translucent={true}
                    hidden={true}
                    animated={true}/>
                <Carousel
                    control={
                        <Carousel.Control
                            style={styles.controlContainer}
                            dot={<Text
                                style={[styles.control, {color: commonStyle.themeColor,}]}>□</Text>}
                            activeDot={<Text
                                style={[styles.control, {color: commonStyle.themeColor,}]}>■</Text>}
                        />
                    }
                    cycle={false}
                    carousel={false}
                    style={styles.container}
                    onChange={(index, total) => {
                        if (index === total - 1) {
                            this.setState({isShow: true})
                        } else {
                            this.setState({isShow: false})
                        }
                    }}>
                    {this.list.map(item => <Text style={{fontSize: 30}} key={item}>{item}</Text>)}
                </Carousel>
                {this.state.isShow ? <Button
                    style={{
                        position: 'absolute',
                        backgroundColor: commonStyle.themeColor,
                        top: gScreen.screen_height - 60,
                        width: 120,
                        alignSelf: 'center',
                        height: 35,
                        borderColor: commonStyle.themeColor
                    }}
                    title={'立即体验'}
                    titleStyle={{color: 'white'}}
                    onPress={() => {
                        gStorage.saveKey('first', false)
                        this.props.navigation.navigate('LoginStack')
                    }}/> : null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: commonStyle.white
    },
    controlContainer: {
        alignItems: 'center'
    },
    control: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        padding: 4
    }
})

const mapState = state => ({
    nav: state.nav,
    login: state.login,
})
const dispatchAction = dispatch => ({
    getMemberDictionary: () => dispatch(loginAction.getMemberDictionary()),
    getDcLotDictionary: () => dispatch(loginAction.getDcLotDictionary()),
    getDcRoadDictionary: () => dispatch(loginAction.getDcRoadDictionary()),
})

export default connect(mapState, dispatchAction)(GuidePage)

