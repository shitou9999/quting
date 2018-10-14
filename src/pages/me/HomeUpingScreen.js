import React, {PureComponent} from 'react';
import {
    View,
    Text,
    Image,
    SectionList,
    StyleSheet,
    Dimensions,
    ActivityIndicator,
} from 'react-native';
import {SectionListItem} from "../../components/index"

export default class HomeUpingScreen extends React.PureComponent {

    sourceList = [];
    preTime = "";
    start = 0;

    constructor(props) {
        super(props);
        this.state = {
            dataList: [],
            isanimating: true,
            isNetError: false,
            isRefreshing: false,
            isLoading: false
        }
    }

    componentDidMount() {
        this._netWork(this.start);
    }

    componentWillUnmount() {

    }

    //分割线
    _ItemSeparatorComponent = () => {
        return (<View style={{backgroundColor: "#f7f7f7", height: 1}}>

        </View>);
    }

    //空布局
    _ListEmptyComponent = () => {
        if (this.state.isanimating) {
            return <View></View>;
        }
        if (this.state.dataList.length == 0) {
            return (<View
                style={{backgroundColor: "#fff", paddingTop: 140, justifyContent: 'center', alignItems: 'center'}}>
                <Image style={{width: 64, height: 64}} source={require("../../assets/images/img_out.png")}/>
            </View>);
        }
    }

    //尾部布局
    _ListFooterComponent = () => {
        if (this.state.isLoading) {
            return (<View style={{backgroundColor: "#fff", height: 40, justifyContent: 'center', alignItems: "center"}}>
                <Text>正在加载中...</Text>
            </View>);
        } else {
            return (<View></View>);
        }

    }

    //头部布局
    _ListHeaderComponent = () => {
        return (<View style={{backgroundColor: "#2f2f2f", height: 60, justifyContent: 'center', alignItems: "center"}}>
            <Text>头部</Text>
        </View>);
    }

    //section的分割线
    _SectionSeparatorComponent = () => {
        return (<View style={{backgroundColor: "#f7f7f7", height: 1}}></View>);
    }

    //key
    _keyExtractor = (item, index) => {
        return item.id;
    }

    //section布局
    _renderSectionHeader = ({section}) => {
        return (<View style={{backgroundColor: "#f5f5f5", height: 30, justifyContent: 'center', paddingLeft: 10}}>
            <Text style={{color: "#8a8a8a", fontSize: 10}}>{section.time}</Text>
        </View>);
    }

    //item 布局
    _renderItem = ({item}) => {
        return (<SectionListItem
            item={item}
            onItemClick={() => {
                alert("您点击了" + item.title);
            }}
            onFavorClick={() => {
                alert("您想看" + item.title);
            }}/>);
    }

    //触发刷新
    _onRefresh = () => {
        this.start = 0;
        this.setState({
            isRefreshing: true
        });
        this._netWork(this.start);
    }
    //触发加载更多
    _onEndReached = () => {
        this.setState({
            isLoading: true
        });
        this.start = this.start + 10;
        this._netWork(this.start);
    }

    //网络请求
    _netWork = (start) => {
        const url = "http://api.douban.com/v2/movie/coming_soon?start=" + start + "&count=10&apikey=0b2bdeda43b5688921839c8ecb20399b";
        fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'charset=utf-8'
            }
        })
            .then((response) => {
                return response.json();
            })
            .then((responseJson) => {
                if (this.state.isRefreshing) {
                    this.sourceList = [];
                }
                if (responseJson.subjects.length > 0) {
                    let dataSource = [];
                    for (let i = 0; i < responseJson.subjects.length; i++) {
                        let nowTime = responseJson.subjects[i].mainland_pubdate;
                        if (this.preTime != nowTime) {
                            this.preTime = nowTime;
                            let obj = {
                                id: responseJson.subjects[i].id,
                                time: nowTime,
                                data: []
                            }
                            obj.data.push(responseJson.subjects[i]);
                            this.sourceList.push(obj);
                        } else {
                            const obj = this.sourceList[this.sourceList.length - 1];
                            obj.data.push(responseJson.subjects[i]);
                        }
                    }
                    dataSource = dataSource.concat(this.sourceList);
                    this.setState({
                        dataList: dataSource,
                        isanimating: false,
                        isRefreshing: false,
                        isLoading: false
                    }, () => {
                        console.log("sss3..." + this.state.dataList.length);
                    });
                }
            })
            .catch((error) => {
                alert("sss");
                this.setState({
                    isNetError: true
                });
            });
    }

    render() {
        let heightIndicator = this.state.isanimating ? 60 : 0;
        return (
            <View style={styles.container}>
                <View style={[styles.viewContainer, {display: this.state.isNetError ? "none" : "flex"}]}>
                    <ActivityIndicator animating={this.state.isanimating}
                                       color="#2f2f2f" style={{height: heightIndicator,}}/>
                    <SectionList
                        style={styles.sectionList}
                        keyExtractor={this._keyExtractor}
                        ListEmptyComponent={this._ListEmptyComponent}
                        ListFooterComponent={this._ListFooterComponent}
                        ItemSeparatorComponent={this._ItemSeparatorComponent}
                        SectionSeparatorComponent={this._SectionSeparatorComponent}
                        renderItem={this._renderItem}
                        renderSectionHeader={this._renderSectionHeader}
                        sections={this.state.dataList}
                        stickySectionHeadersEnabled={true}
                        refreshing={this.state.isRefreshing}
                        onRefresh={this._onRefresh}
                        onEndReachedThreshold={0.1}
                        onEndReached={this._onEndReached}
                        extraData={this.state.dataList}/>
                </View>
                <View style={[styles.netError, {display: this.state.isNetError ? 'flex' : 'none'}]}>
                    <Image style={styles.errorImage} source={require("../../assets/images/img_in.png")}/>
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#fff",
    },
    viewContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#fff",
    },
    sectionList: {
        width: Dimensions.get('window').width,
        backgroundColor: "#fff",
    },
    netError: {
        backgroundColor: "#fff",
        paddingTop: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorImage: {
        width: 64,
        height: 64
    }
});
