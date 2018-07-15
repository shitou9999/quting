/**
 * Created by PVer on 2018/7/14.
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Alert, Dimensions} from 'react-native';
// import {
//     ListRow,
// } from 'teaset';
import ListRow from 'teaset/components/ListRow/ListRow';
import Input from 'teaset/components/Input/Input';
import Button from 'teaset/components/Button/Button';

import Global from '../../constants/global';
import MeStyle from '../../assets/styles/MeStyle';

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
            inputValue: null,
            contactValue: null,
        }
    }

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
                        detail='无'
                        onPress={() => {
                            Alert.alert('ListRow');
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
                            Alert.alert('Button');
                        }}
                        type='primary'/>
                {/*onPress={() => this.login()}*/}
            </View>
        );
    }

    login() {

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

export default ComplaintPage;
