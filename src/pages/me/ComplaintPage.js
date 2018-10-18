/**
 * Created by PVer on 2018/7/14.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Dimensions, FlatList, TouchableOpacity, Image} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Input, ListRow, Button, Overlay, Label, Toast} from "../../components/teaset/index"
import Feather from 'react-native-vector-icons/Feather'
import {BeeUtil, Loading} from '../../utils/index'
import {commonStyle} from '../../constants/commonStyle'
import {LoadingModal, TitleBar, Divide} from "../../components/base"
import userAction from '../../actions/user'

const COMPOSER_HEIGHT = 150
const MAX_LENGTH = 300

/**
 * 投诉建议dev
 */
class ComplaintPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            complaintType: '无',
            inputValue: '',
            remainLength: MAX_LENGTH,
            selection: {start: 0, end: 0},
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
        gStorage.getAllDataForKey('PROBLEM+TYPE', results => {
            this.items = results.map((item, index) => {
                let tempData = {}
                tempData.key = item.key
                tempData.value = item.value
                return tempData
            })
        })
    }


    _getRequestComplaint = () => {
        const {complaintType, inputValue, contactValue} = this.state
        if (BeeUtil.equals('无', complaintType)) {
            Toast.message('请选择投诉分类')
            return
        }
        if (!inputValue || inputValue.trim().length <= 0) {
            Toast.message('请输入投诉内容')
            return;
        }
        if (BeeUtil.isEmpty(contactValue)) {
            Toast.message('请输入联系方式')
            return
        }
        Loading.showLoading()
        this.props.userAction.toRequestComplaint(
            this.props.login.user.id,
            complaintType,
            inputValue,
            this.state.selectedIndex,
            contactValue)
            .then(response => Loading.disLoading())
    }

    _itemPress = (item, index) => {
        this.setState({
            complaintType: index
        })
        alert('点击了第' + index + '项，名称为：' + item.title)
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
        let selectIndex = this.state.selectedIndex
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
    _keyExtractor = (item, index) => index.toString()

    onChangeText = inputValue => {
        let remainLength = MAX_LENGTH - inputValue.length;
        this.setState({
            inputValue,
            remainLength
        })
    };

    renderInput = () => {
        return (
            <View style={{height: COMPOSER_HEIGHT}}>
                <TextInput
                    ref={component => this._textInput = component}
                    style={styles.textInput}
                    onChangeText={this.onChangeText}
                    value={this.state.text}
                    autoCapitalize={'none'}
                    returnKeyType={'done'}
                    maxLength={MAX_LENGTH}
                    blurOnSubmit={true}
                    multiline={true}
                    textInputAutoFocus={true}
                    placeholder={'输入投诉内容'}
                    // onSubmitEditing={this.props.onSubmitEditing}
                    // onChange={this.onContentSizeChange}
                    // onContentSizeChange={this.onContentSizeChange}
                    enablesReturnKeyAutomatically
                    underlineColorAndroid="transparent"
                    selection={this.state.selection}
                    onSelectionChange={({nativeEvent: {selection}}) => {
                        this.setState({selection});
                    }}
                    // onFocus={_ => this.onTogglePress(false, true)}
                    // onBlur={_ => this.onTogglePress(undefined, false)}
                />
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <TitleBar title={'投诉建议'}/>
                <View style={{flex: 1}}>
                    <ListRow
                        style={{height: commonStyle.bottomBtnHeight}}
                        title='选择投诉分类'
                        detail={this.state.complaintType}
                        onPress={() => {
                            this._selectTypePop()
                        }}
                        bottomSeparator='full'/>
                    <View style={styles.header}>
                        <View>
                            {this.renderInput()}
                            <Text style={{
                                color: this.state.remainLength <= 0 ? 'red' : commonStyle.themeColor,
                                textAlign: 'right'
                            }}>{this.state.remainLength}</Text>
                        </View>
                    </View>
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
                <LoadingModal ref={ref => global.loading = ref}/>
            </View>
        );
    }
}

// {/*<Input*/}
// {/*style={styles.input}*/}
// {/*size='lg'*/}
// {/*value={this.state.inputValue}*/}
// {/*placeholder='输入投诉内容'*/}
// {/*onChangeText={text => this.setState({inputValue: text})}*/}
// {/*/>*/}
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
    },
    header: {
        backgroundColor: 'white',
        paddingLeft: 10,
        paddingRight: 10,
        // borderBottomWidth: commonStyle.lineHeight,
        borderBottomColor: '#ccc',
    }
})

const mapState = (state) => ({
    nav: state.nav,
    login: state.login,
    me: state.me,
    user: state.user,
})

const dispatchAction = (dispatch) => ({
    userAction: bindActionCreators(userAction, dispatch),
})

export default connect(mapState, dispatchAction)(ComplaintPage)
