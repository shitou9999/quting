/**
 * Created by PVer on 2018/7/14.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Alert, Dimensions, FlatList, TouchableOpacity, Image} from 'react-native';
import {connect} from 'react-redux'
import ListRow from 'teaset/components/ListRow/ListRow'
import Input from 'teaset/components/Input/Input'
import Button from 'teaset/components/Button/Button'
import Toast from 'teaset/components/Toast/Toast'
import Overlay from 'teaset/components/Overlay/Overlay'
import Label from 'teaset/components/Label/Label'
import TitleBar from '../../components/TitleBar'
import Feather from 'react-native-vector-icons/Feather'
import Divide from '../../components/Divide'

import * as HttpUtil from '../../net/HttpUtils'
import BeeUtil from '../../utils/BeeUtil'
import {commonStyle} from '../../constants/commonStyle'

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
        this.items = [];
        Object.assign(this.state, {
            selectedIndex: null,
        });
    }

    componentDidMount() {
        this._getRequestDictionary()
    }

    _getRequestDictionary = () => {
        //读取某一类字典[]
        gStorage.storage.getAllDataForKey('PROBLEM+TYPE', results => {
            this.items = results.map((item, index) => {
                let tempData = {}
                tempData.key = item.key
                tempData.value = item.value
                return tempData
            })
        });
    }


    _getRequestComplaint = () => {
        const {login} = this.props;
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
            "problemType": this.state.selectedIndex,
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

    _itemPress = (item, index) => {
        this.setState({
            complaintType: index
        })
        alert('点击了第' + index + '项，名称为：' + item.title);
        this.overlayPopView && this.overlayPopView.close()
    }

    /**
     * 使用箭头函数防止不必要的re-render；
     * 如果使用bind方式来绑定onPressItem，每次都会生成一个新的函数，导致props在===比较时返回false，
     * 从而触发自身的一次不必要的重新render，也就是FlatListItem组件每次都会重新渲染。
     */
    itemClick(item, index) {
        this.setState({
            complaintType: item.value,
            selectedIndex: item.key
        })
        this.overlayPopView && this.overlayPopView.close()
    }

    _renderItem = ({item, index}) => {
        let selectIndex = this.state.selectedIndex;
        {/*onPress={this._itemPress(item, index)}>*/
        }
        const selectItem = selectIndex === item.key
        let selectStyle = {}
        if (selectItem) {
            selectStyle = {
                color: commonStyle.red
            }
        } else {
            selectStyle = {
                color: '#000'
            }
        }
        return (
            <TouchableOpacity key={index}
                              onPress={this.itemClick.bind(this, item, index)}>
                <View style={styles.selectStyle}>
                    <Label size='md' type='title' text={item.value} style={selectStyle}/>
                    <Feather name={'chevron-right'} size={28} color={commonStyle.lightGray}/>
                </View>
            </TouchableOpacity>
        )

    }

    _separator = () => {
        return <Divide orientation={'horizontal'} color={commonStyle.lineColor} width={commonStyle.lineHeight}/>
    }

    _selectTypePop = (type, modal, text) => {
        let overlayView = (
            <Overlay.PopView
                ref={v => this.overlayPopView = v}
                style={{alignItems: commonStyle.center, justifyContent: commonStyle.center}}
                type={type}
                modal={modal}>
                <View
                    style={{backgroundColor: commonStyle.white, minWidth: 260, minHeight: 300, borderRadius: 5}}>
                    <FlatList
                        ref={(flatList) => this._flatList = flatList}
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
    _keyExtractor = (item, index) => index.toString();

    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <TitleBar title={'投诉建议'} navigation={navigation}/>
                <View style={{flex: 1}}>
                    <ListRow
                        style={{height: commonStyle.bottomBtnHeight}}
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
                             style={{height: commonStyle.bottomBtnHeight}}
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
                        style={{margin: commonStyle.margin}}
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
        backgroundColor: commonStyle.white,
    },
    input: {
        width: gScreen.screen_width,
        height: 200,
        borderColor: commonStyle.white,
        borderRadius: 0,
    },
    contact: {
        width: 300, borderColor: commonStyle.white
    },
    selectStyle: {
        height: 50,
        marginLeft: commonStyle.marginLeft,
        marginRight: commonStyle.marginLeft,
        flexDirection: commonStyle.row,
        alignItems: commonStyle.center,
        justifyContent: commonStyle.between
    }
});

const mapState = (state) => ({
    nav: state.nav,
    login: state.login,
    me: state.me,
});

const dispatchAction = (dispatch) => ({
    // loginAction: bindActionCreators(loginActions, dispatch),
});

export default connect(mapState, dispatchAction)(ComplaintPage);
