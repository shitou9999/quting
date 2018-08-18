/**
 * Created by PVer on 2018/7/14.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Alert, Dimensions, FlatList, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
// import {
//     ListRow,
// } from 'teaset';
import ListRow from 'teaset/components/ListRow/ListRow';
import Input from 'teaset/components/Input/Input';
import Button from 'teaset/components/Button/Button';
import Toast from 'teaset/components/Toast/Toast';
import Overlay from 'teaset/components/Overlay/Overlay';

import Global from '../../constants/global';
import MeStyle from '../../assets/styles/MeStyle';
import * as HttpUtil from '../../net/HttpUtils';
import BeeUtil from '../../utils/BeeUtil';
import {storage} from '../../utils/storage';

// let screen = {
//     width: screenWidth,
//     height: screenHeight,
// }
//
// export default screen
/**
 * 投诉建议dev
 */
class ComplaintPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            complaintType: '无',
            inputValue: null,
            contactValue: null,
        }
        this.items = [
            {
                key: 0,
                title: 'Apples',
            },
            {
                key: 1,
                title: 'Lemon',
            },
            {
                key: 2,
                title: 'Banana',
            },
            {
                key: 3,
                title: 'Cherry',
            },
            {
                key: 4,
                title: 'Filbert',
            },
        ];
        Object.assign(this.state, {
            selectedIndex: null,
        });
    }

    componentWillMount() {
        this._getAppDictionary()
    }

    _getAppDictionary = () => {
        let service = '/dictionary/member'
        HttpUtil.fetchRequest(service, 'GET')
            .then(json => {
                if (json.code === '000000') {
                    // let mapVo = new Map()
                    for (let index in json.data) {
                        let lookupName = json.data[index].lookupName;
                        let lookupKey = json.data[index].lookupKey;
                        let lookupValue = json.data[index].lookupValue;
                        if (lookupName.includes('_')) {
                            let newName = lookupName.replace(/_/g, '+')
                            console.log(newName)
                            storage.save(newName, lookupKey, lookupValue)
                        } else {
                            storage.save(lookupName, lookupKey, lookupValue)
                        }
                    }
                } else {
                    Toast.message('获取数据字典异常')
                }
            }).catch()
    }

    _test = () => {
        // storage.load("PROBLEM+TYPE", (results) => {
        //     console.log(results)//(2) [{…}, {…}]
        //     results.forEach(result => {
        //         console.log(result.lookupValue);
        //     })
        // })
        //读取单个字典
        storage.loadId("PROBLEM+TYPE", 1, results => {
            console.log(results)
        })
        //读取某一类字典[]
        storage.getAllDataForKey('PROBLEM+TYPE', users => {
            console.log(users);
        });
    }


    _getRequestComplaint = () => {
        const {login,} = this.props;
        const {complaintType, inputValue, contactValue} = this.state;

        if (BeeUtil.equals('无', complaintType)) {
            Toast.message('请选择投诉分类')
            return
        }
        if (BeeUtil.isEmpty(inputValue)) {
            Toast.message('请输入投诉内容')
            return
        }
        if (BeeUtil.isEmpty(contactValue)) {
            Toast.message('请输入联系方式')
            return
        }
        let service = '/complain';
        let params = {
            "userId": login.user.id,
            "problemTitle": "关于缴费",
            "problemContent": inputValue,
            "problemType": "1",
            "contact": contactValue
        }
        HttpUtil.fetchRequest(service, 'POST', params)
            .then(json => {
                if (json.code === "000000") {
                    Toast.message('提交成功');
                } else {
                    Toast.message(json.msg)
                }
            })
            .catch()
    }

    _itemPress = (item) => {
        // onPress={ ({item,index}) => {
        //     this.setState({
        //         complaintType: index
        //     })
        //     console.log(item.title)
        //     this.overlayPopView && this.overlayPopView.close()
        // }}
    }

    /**
     * 使用箭头函数防止不必要的re-render；
     * 如果使用bind方式来绑定onPressItem，每次都会生成一个新的函数，导致props在===比较时返回false，
     * 从而触发自身的一次不必要的重新render，也就是FlatListItem组件每次都会重新渲染。
     */
    itemClick(item, index) {
        alert('点击了第' + index + '项，电影名称为：' + item.title);
    }

    _renderItem = ({item, index}) => {
        let selectIndex = this.state.selectedIndex;
        return (
            <TouchableOpacity key={index}
                              onPress={this.itemClick.bind(this, item, index)}>
                <View style={{height:50,marginLeft:10,alignItems:'center',justifyContent:'center'}}>
                    <Text style={{fontSize:18}}>{item.title}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    _separator = () => {
        return <View style={{height:1,backgroundColor:'yellow'}}/>;
    }

    // getItemLayout属性是一个可选的优化，用于避免动态测量内容尺寸的开销。如果我们知道item的高度，就可以为FlatList指定这一个属性，来使FlatList更加高效的运行！
    // getItemLayout={(data, index) => ({
//     length: 44, offset: (44 + 1) * index, index
// })}
    _selectTypePop = (type, modal, text) => {
        let overlayView = (
            <Overlay.PopView
                ref={v => this.overlayPopView = v}
                style={{alignItems: 'center', justifyContent: 'center'}}
                type={type}
                modal={modal}>
                <View
                    style={{backgroundColor: 'white', minWidth: 260,minHeight:300,borderRadius: 5}}>
                    <FlatList
                        ref={(flatList)=>this._flatList = flatList}
                        ItemSeparatorComponent={this._separator}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                        data={this.items}>
                    </FlatList>
                </View>
            </Overlay.PopView>
        );
        Overlay.show(overlayView);
    }

    //此函数用于为给定的item生成一个不重复的key
    //若不指定此函数，则默认抽取item.key作为key值。若item.key也不存在，则使用数组下标index。
    _keyExtractor = (item, index) => index;

// {/*// multiline=true*/}
    // onPress={() => this.navigator.push({view: <LabelExample />})}
    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <ListRow
                        style={MeStyle.listRow}
                        title='选择投诉分类'
                        detail={this.state.complaintType}
                        onPress={() => {
                            this._selectTypePop()
                        }}
                        bottomSeparator='full'/>
                    <Input
                        style={styles.input}
                        size='lg'
                        value={this.state.inputValue}
                        placeholder='输入投诉内容'
                        onChangeText={text => this.setState({inputValue: text})}
                    />
                    <ListRow title='联系方式'
                             style={MeStyle.listRow}
                             detail={
                                 <Input
                                     style={styles.contact}
                                     size='lg'
                                     value={this.state.contactValue}
                                     placeholder='邮箱或电话'
                                     onChangeText={text => this.setState({contactValue: text})}
                                 />
                             }
                             bottomSeparator='full'
                             topSeparator='full'/>
                </View>
                <Button title="提 交"
                        size='lg'
                        style={MeStyle.bottomBt}
                        onPress={() => {
                            this._getRequestComplaint()
                        }}
                        type='primary'/>

            </View>
        );
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ff7776',
    },
    content: {
        flex: 1,
    },
    input: {
        width: Global.SCREEN_WIDTH,
        height: 200,
        borderColor: '#FFF',
        borderRadius: 0,
    },
    contact: {
        width: 300, borderColor: '#FFF'
    },
});

const mapState = (state) => ({
    nav: state.nav,
    login: state.login,
});

const dispatchAction = (dispatch) => ({
    // loginAction: bindActionCreators(loginActions, dispatch),
});

export default connect(mapState, dispatchAction)(ComplaintPage);
