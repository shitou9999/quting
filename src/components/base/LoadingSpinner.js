import React, {Component} from 'react';
import {View, ActivityIndicator, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types'
import Modal from 'react-native-modalbox'
import Spinner from 'react-native-spinkit'
import {commonStyle} from "../../constants/commonStyle"

export default class LoadingSpinner extends Component {

    static propTypes = {
        isVisible: PropTypes.bool,
        text: PropTypes.string,
        backExit: PropTypes.bool,
    }

    static defaultProps = {
        text: '加载中...',
        backExit: false,
    }

    render() {
        const {isVisible} = this.props
        return (
            <Modal
                ref={(ref) => this.loginModal = ref}
                isOpen={isVisible}
                style={[{
                    height: gScreen.screen_height,
                    width: gScreen.screen_width,
                    backgroundColor: "#F0000000"
                }]}
                backdropPressToClose={this.props.backExit}
                position={"center"}
                backButtonClose={false}
                swipeToClose={false}
                backdropOpacity={0}>
                <View style={[styles.centered, {flex: 1}]}>
                    <View>
                        <Spinner style={[styles.centered]}
                                 isVisible={true}
                                 size={50}
                                 type="9CubeGrid"
                                 color={commonStyle.orange}/>
                        <Text style={styles.normalTextWhite}>{this.props.text}</Text>
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    centered: {
        justifyContent: commonStyle.center,
        alignItems: commonStyle.center
    },
    normalTextWhite: {
        color: commonStyle.white,
        fontSize: 18,
    },
});


// <Modal
// transparent={true}
// onRequestClose={() => {
// }}
// visible={isVisible}
// animationType={'fade'}
// >
// <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
// <View style={{
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: 80,
//     height: 80,
//     backgroundColor: '#333',
//     borderRadius: 10
// }}>
// <ActivityIndicator size='large' color='red'/>
// </View>
// </View>
// </Modal>
