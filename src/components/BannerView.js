import React, {Component} from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity, StyleSheet
} from 'react-native';
import PropType from "prop-types";
import Swiper from "react-native-swiper"

/**
 * Desc:banner
 */
export default class BannerView extends Component {

    //设置参数类型
    static propTypes = {
        //图片地址
        images: PropType.PropTypes.array,
        //默认图片
        defaultImage: PropType.PropTypes.string.isRequired,
        //标题文字
        titles: PropType.PropTypes.array,
        selectDotColor: PropType.PropTypes.string,
        unSelectDotColor: PropType.PropTypes.string,
        itemOnPress: PropType.PropTypes.func,
        bannerHeight: PropType.PropTypes.number,
    };

    static defaultProps = {
        selectDotColor: '#007aff',
        unSelectDotColor: 'rgba(0,0,0,.2)',
        bannerHeight: 200,
    };

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         visibleSwiper: false,
    //     };
    // }
    //
    // componentDidMount() {
    //     setTimeout(() => {
    //         this.setState({
    //             visibleSwiper: true
    //         });
    //     }, 1)
    // }
// {/*defaultImage={constants.default_img}*/}
// {/*<BannerView*/}
//     {/*defaultImage={'../assets/images/img_banner_one.png'}*/}
//     {/*bannerHeight={200}*/}
//     {/*itemOnPress={(i) => {*/}
//
//     {/*}}*/}
// {/*/>*/}


    render() {
        return (
            <View style={{height: this.props.bannerHeight}}>
                {this._renderBanner()}
            </View>
        )
    }

    /**
     * 加载banner图片相关
     * @returns {XML}
     * @private
     */
    _renderBanner() {
        if (this.props.images && this.props.images.length > 0) {
            let images = [];
            for (let i = 0; i < this.props.images.length; i++) {
                images.push(
                    this._bannerTitle(i)
                )
            }
            return <Swiper
                //设置选中点样式
                activeDot={
                    <View style={{
                        backgroundColor: this.props.selectDotColor,
                        width: 8,
                        height: 8,
                        borderRadius: 4,
                        marginLeft: 3,
                        marginRight: 3,
                        marginTop: 3,
                        marginBottom: 3,
                    }}/>
                }
                //未选中点样式
                dot={<View style={{
                    backgroundColor: this.props.unSelectDotColor,
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    marginLeft: 3,
                    marginRight: 3,
                    marginTop: 3,
                    marginBottom: 3,
                }}/>}
                //是否展示原点
                showsPagination={true}
                removeClippedSubviews={false}
                onMomentumScrollEnd={(e, state, context) => console.log('index:', state.index)}
                index={0}
                horizontal={true}
                paginationStyle={{bottom: 10}}
                showsButtons={false}
                autoplayDirection={true}
                //是否无限轮询
                loop={false}
                autoplay={!__DEV__ ? true : false}>
                {images}
            </Swiper>
        } else {
            return <Image
                source={{uri: this.props.defaultImage}}
                style={{flex: 1}}/>
        }
    }

    /**
     * 加载banner标题
     * @private
     */
    _bannerTitle(i) {
        if (this.props.titles && this.props.titles.length > 0) {
            let url = this.props.images[i]
            return <TouchableOpacity activeOpacity={0.9} onPress={this.props.itemOnPress.bind(this, i)} key={i}
                                     style={{height: this.props.bannerHeight}}>
                <View>
                    <Image
                        source={{uri: this.props.images[i]}}
                        style={{height: this.props.bannerHeight}}/>
                    <View style={{
                        position: "absolute", justifyContent: 'space-between',
                        alignItems: 'center', bottom: 10, right: 0, left: 0,
                    }}>
                        <Text>{this.props.titles[i]}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        } else {
            return <TouchableOpacity activeOpacity={0.9} onPress={this.props.itemOnPress.bind(this, i)} key={i}
                                     style={{height: this.props.bannerHeight}}>
                <Image
                    source={{uri: this.props.images[i]}}
                    style={{height: this.props.bannerHeight}}/>
            </TouchableOpacity>
        }
    }
}

