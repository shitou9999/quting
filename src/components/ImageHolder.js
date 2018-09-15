/**
 * Created by PVer on 2018/9/14.
 */
import React, {Component} from 'react';
import {
    View,
    Animated,
} from 'react-native'
import PropTypes from 'prop-types'

export default class ImageHolder extends Component {

    /**
     * @param imageKey 显示模式    'fade' 'shrink' 'explode'
     * @param placeholderColor  占位背景颜色
     * @param placeholderSource 占位图
     * @param backgroundColor 背景颜色  (占位图 占位背景 二选一)
     * @param source 图片资源
     **/

    static propTypes = {
        imageKey: PropTypes.string,
        placeholderColor: PropTypes.string,
        placeholderSource: PropTypes.number,
    }

    static defaultProps = {
        imageKey: 'shrink',
        placeholderColor: '#cfd8dc',
    }

    componentDidMount() {
        if (!this.props.placeholderSource) {
            this.animatePlaceholderColor();
        }
    }

    animatePlaceholderColor = () => {
        const {failed, loaded, placeholderColorAnimated,} = this.state;
        if (failed || loaded)
            return;
        Animated.sequence([
            Animated.timing(placeholderColorAnimated, {
                duration: 500,
                toValue: 1.0,
            }),
            Animated.timing(placeholderColorAnimated, {
                duration: 400,
                toValue: 0.0,
            }),
        ]).start(this.animatePlaceholderColor);
    };


    constructor(props) {
        super(props);

        this.onError = () => {
            this.setState(() => ({
                failed: true,
            }), () => {
                this.Animated.timing(this.state.placeholderColorAnimated, {
                    duration: 200,
                    toValue: 0.0,
                }).start();
            });
        };

        this.onLoad = () => {
            const {delay} = this.props;
            const {imageOpacity, placeholderOpacity, placeholderScale,} = this.state;
            const callback = () => this.setState(() => ({loaded: true}));
            switch (this.animationStyle) {
                case 'fade':
                    return Animated.parallel([
                        Animated.timing(placeholderOpacity, {
                            delay,
                            duration: 200,
                            toValue: 0,
                        }),
                        Animated.timing(imageOpacity, {
                            delay,
                            duration: 300,
                            toValue: 1,
                        }),
                    ]).start(callback);
                case 'explode':
                    return Animated.sequence([
                        Animated.parallel([
                            Animated.timing(placeholderScale, {
                                delay,
                                duration: 100,
                                toValue: 0.7,
                            }),
                            Animated.timing(placeholderOpacity, {
                                duration: 100,
                                toValue: 0.66,
                            }),
                        ]),
                        Animated.parallel([
                            Animated.parallel([
                                Animated.timing(placeholderOpacity, {
                                    duration: 200,
                                    toValue: 0,
                                }),
                                Animated.timing(placeholderScale, {
                                    duration: 200,
                                    toValue: 1.2,
                                }),
                            ]),
                            Animated.timing(imageOpacity, {
                                delay: 200,
                                duration: 300,
                                toValue: 1,
                            }),
                        ]),
                    ]).start(callback);

                default:// explode
                    return Animated.parallel([
                        Animated.parallel([
                            Animated.timing(placeholderOpacity, {
                                delay,
                                duration: 200,
                                toValue: 0,
                            }),
                            Animated.timing(placeholderScale, {
                                delay,
                                duration: 200,
                                toValue: 0,
                            }),
                        ]),
                        Animated.timing(imageOpacity, {
                            delay,
                            duration: 300,
                            toValue: 1,
                        }),
                    ]).start(callback);
            }
        };


        const style = typeof props.style === 'number'
            ? this.StyleSheet.flatten(props.style)
            : props.style;
        const {width, height} = style;
        if (!width || !height) {

        }

        this.animationStyle = props.placeholderSource
            ? 'fade'
            : props.animationStyle;

        this.state = {
            failed: false,
            imageOpacity: new Animated.Value(0),
            loaded: false,
            placeholderColorAnimated: new Animated.Value(1.0),
            placeholderColorLightened: props.placeholderColor
                ? this.lightenColor(props.placeholderColor, 20)
                : 'transparent',
            placeholderOpacity: new Animated.Value(1.0),
            placeholderScale: new Animated.Value(1.0),
        };


    }


    lightenColor = (color, amount) => {
        if (color[0] === '#')
            color = color.slice(1);
        const colorValue = parseInt(color, 16);
        let red = (colorValue >> 16) + amount;
        if (red > 255)
            red = 255;
        else if (red < 0)
            red = 0;
        let blue = ((colorValue >> 8) & 0x00FF) + amount;
        if (blue > 255)
            blue = 255;
        else if (blue < 0)
            blue = 0;
        let green = (colorValue & 0x0000FF) + amount;
        if (green > 255)
            green = 255;
        else if (green < 0)
            green = 0;
        return `#${(green | (blue << 8) | (red << 16)).toString(16)}`;
    };


    render() {
        const {imageKey, placeholderColor, placeholderSource, source, style} = this.props;
        const {failed, imageOpacity, loaded, placeholderColorAnimated, placeholderColorLightened, placeholderOpacity, placeholderScale,} = this.state;
        return (
            <View
                style={style}>
                {!failed &&
                <Animated.Image
                    key={imageKey}
                    source={source}
                    style={[
                        style,
                        {
                            opacity: imageOpacity,
                            position: 'absolute',
                            resizeMode: 'cover',
                        },
                    ]}
                    onLoad={this.onLoad}
                    onError={this.onError}/>}

                {(placeholderSource && !loaded) &&
                <Animated.Image
                    source={placeholderSource}
                    style={[
                        style,
                        {
                            opacity: placeholderOpacity,
                            position: 'absolute',
                            resizeMode: 'cover',
                        },
                    ]}/>}

                {(!placeholderSource && !loaded) &&
                <Animated.View
                    style={[
                        style,
                        {
                            backgroundColor: placeholderColor
                                ? placeholderColorAnimated.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [
                                        placeholderColor,
                                        placeholderColorLightened,
                                    ],
                                })
                                : 'transparent',
                            opacity: placeholderOpacity,
                            position: 'absolute',
                            transform: [{scale: placeholderScale}],
                        },
                    ]}/>}

            </View>);
    }

}
