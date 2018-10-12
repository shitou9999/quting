import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types'
import {commonStyle} from "../../constants/commonStyle"
import {images} from "../../assets"

export default class LoadView extends React.Component {

    static propTypes = {
        style: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.number
        ]),
        iconSize: PropTypes.number,
        message: PropTypes.string,
        visible: PropTypes.bool,
        gif: PropTypes.string,
    };

    static defaultProps = {
        style: {},
        iconSize: 80,
        visible: true,
        message: null,
        gif: 'spinner',
    };

    render() {
        let {style, iconSize, message, visible, gif} = this.props
        return (
            visible &&
            <View style={[Styles.container, style]}>
                {gif === 'triangles' ?
                    <Image style={{width: iconSize, height: iconSize}}
                           source={images.loading_triangles}/>
                    :
                    <Image style={{width: iconSize, height: iconSize}}
                           source={images.loading_spinner}/>
                }
                {message && <Text style={Styles.message}>载入中</Text>}
            </View>
        )
    }
}

const Styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: commonStyle.bgColor, justifyContent: 'center', alignItems: 'center'},
    message: {color: commonStyle.red, fontSize: 22, fontWeight: 'bold', marginTop: commonStyle.marginTop}
})
