/**
 * Created by Joker on 2017-08-17.
 */
import React, {Component} from 'react'
import {
    ActivityIndicator,
    FlatList,
    Image,
    RefreshControl,
    Text,
    View,
    Dimensions,
} from 'react-native'
import PropTypes from 'prop-types'
import EmptyView from "./EmptyView"
import FooterLoadMoreView from './FooterLoadMoreView'
import {commonStyle} from "../../constants/commonStyle";

const width = Dimensions.get('window').width;
const defaultColor = "#00AEF3"

/**
 * https://blog.csdn.net/u011272795/article/details/74359305
 * @param onLoad 上拉加载
 * @param onRefresh 下拉刷新
 * @param renderItem 列表子组件
 * @param showBackGround 是否显示无数据背景
 * @param sepLine 分割线样式
 * @param header 列表头部
 * @param showNoDataMessage 无数据提示
 * @param scrollEnabled 是否可以滚动
 * @param columns 每行元素的列数
 * @param showNoDataImage 无数据提示图片
 * @param indicatorColor 加载圈颜色
 *
 */

export default class SFListView extends Component {
    static propTypes = {
        onLoad: PropTypes.func,
        onRefresh: PropTypes.func,
        renderItem: PropTypes.func,
        showBackGround: PropTypes.bool,
        sepLine: PropTypes.func,
        header: PropTypes.func,
        showNoDataMessage: PropTypes.string,
        scrollEnabled: PropTypes.bool,
        columns: PropTypes.number,
        showNoDataImage: PropTypes.number,
        indicatorColor: PropTypes.string,
    }

    static defaultProps = {
        showBackGround: false,
        showNoDataMessage: '暂无数据',
        scrollEnabled: true,
        columns: 1,
        indicatorColor: defaultColor,
    }

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            isRefreshing: false,
            canRefresh: true,
            footerLoading: true,
            footerText: '努力加载中...',
            showFooter: true,
            footer: null,
        }
    }

    componentWillMount() {
    }

    setRefreshing = (visible) => {
        this.setState({
            isRefreshing: visible
        })
    }
    canRefresh = (can) => {
        this.setState({
            canRefresh: can
        })
    }
    onRefresh = () => {
        this.setRefreshing(true)
        if (this.props.onRefresh != null) {
            this.props.onRefresh()
        }
    }

    render() {
        const state = this.state
        const props = this.props
        return (
            <FlatList
                data={state.data}
                extraData={state}
                keyExtractor={this._keyExtractor}
                renderItem={props.renderItem}
                ItemSeparatorComponent={props.sepLine}
                ListEmptyComponent={this._emptyComponent}
                onEndReachedThreshold={0.5} // 注意此参数是一个比值而非像素单位。比如，0.5 表示距离内容最底部的距离为当前列表可见长度的一半时触发(0---1之间)
                onEndReached={this.onEndReached}
                ListHeaderComponent={props.header}
                ListFooterComponent={this._renderFooter}
                scrollEnabled={props.scrollEnabled}
                numColumns={props.columns}
                refreshControl={state.canRefresh ?
                    <RefreshControl
                        refreshing={state.isRefreshing}
                        onRefresh={this.onRefresh}
                        tintColor={props.indicatorColor}
                        title="正在刷新数据..."
                        colors={[props.indicatorColor]}
                        progressBackgroundColor="#ffffff"
                    /> : null}
            />
        )
    }

    setData = (data) => {
        this.setState({
            data: data
        })
    }

    addData = (data) => {
        this.setState({
            data: this.state.data.concat(data)
        })
    }

    clearData = () => {
        this.setState({
            data: []
        })
    }

    onEndReached = () => {
        if (this.props.onLoad != null) {
            this.props.onLoad()
        }
    }

    _keyExtractor = (item, index) => "" + index

    _emptyComponent = () => {
        if (this.props.showBackGround) {
            return <EmptyView {...this.props}/>
        } else {
            return null;
        }
    }

    _renderFooter = () => {
        if (this.state.isRefreshing) {
            return (
                <View style={{
                    width: width,
                    height: 40,
                    flexDirection: commonStyle.row,
                    justifyContent: commonStyle.center,
                    alignItems: commonStyle.center
                }}>
                    <ActivityIndicator
                        animating={this.state.footerLoading} //是否显示，默认true（显示）
                        color={this.props.indicatorColor}
                        size={'small'}/>
                    <Text style={{fontSize: 18, color: commonStyle.black, marginLeft: 5}}>{this.state.footerText}</Text>
                </View>
            )

        } else {
            return null
        }

    }


// {/*<FooterLoadMoreView indicatorColor={this.props.indicatorColor}*/}
// {/*footerLoading={this.state.footerLoading}*/
// }
// {/*footerText={this.state.footerText}/>*/
// }
}
