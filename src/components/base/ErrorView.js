import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';
// import Button from '../Button';
import PropTypes from 'prop-types'
import {images} from "../../assets";

export default class ErrorView extends React.Component {

    static propTypes = {
        title: PropTypes.string,
        errorStyle: PropTypes.string,
        imageSource: PropTypes.string,
        btnTitle: PropTypes.string,
        btnTitleStyle: PropTypes.any,
        imageSourceStyle: PropTypes.any,
        errorTitleStyle: PropTypes.any,
        btnStyle: PropTypes.string,
        onErrorPress: PropTypes.any,
    }

    static defaultProps = {
        title: '出错啦，请稍后重试',
        btnTitle: '点击刷新',
        imageSource: null,
    }


    render() {
        const {title, btnTitle, imageSource, errorStyle, errorTitleStyle, btnTitleStyle, btnStyle, imageSourceStyle, onErrorPress} = this.props;

        return (
            <View style={[styles.container, errorStyle]}>
                {/*<Image style={[styles.imageSourceStyle, imageSourceStyle]} source={imageSource ? imageSource : Images.errorImage} />*/}
                <Image style={[styles.imageSourceStyle, imageSourceStyle]}
                       source={images.app_empty}/>
                <Text style={[styles.errorTitle, errorTitleStyle]}>
                    {title}
                </Text>
                {/*<Button style={[styles.btnStyle, btnStyle]} titleStyle={[styles.btnTitleStyle, btnTitleStyle]} title={btnTitle} onPress={onErrorPress}/>*/}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: 200,
    },
    imageSourceStyle: {
        width: 50,
        height: 50,
        marginTop: 169,
        borderRadius: 100,
    },
    errorTitle: {
        marginTop: 20,
        fontSize: 20,
        color: '#aeaeae',
    },
    btnStyle: {
        width: 153,
        height: 48,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#10b0ff',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 66,
    },
    btnTitleStyle: {
        color: '#10b0ff',
    }
});
