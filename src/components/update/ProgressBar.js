/**
 * Created by guangqiang on 2018/3/29.
 */
import React, {Component} from 'react'
import {View, Text, StyleSheet, Modal, TouchableOpacity, Image} from 'react-native'
import Progress from './CusProgressBar'
import CodePush from "react-native-code-push"
import Toast from 'teaset/components/Toast/Toast'
import {commonStyle} from "../../constants/commonStyle"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const CODE_PUSH_KEY = 'tp4K16G6jwKYttt13I2qHA-EA2ie37badfdf-a71a-4423-a094-451b4dde721c'
let codePushOptions = {
    checkFrequency: CodePush.CheckFrequency.ON_APP_START
}

class ProgressBar extends Component {

    constructor(props) {
        super(props)
        this.currProgress = 0.0
        this.syncMessage = ''
        this.state = {
            modalVisible: false,
            isMandatory: false,
            immediateUpdate: false,
            updateInfo: {}
        }
    }

    codePushStatusDidChange(syncStatus) {
        if (this.state.immediateUpdate) {
            switch (syncStatus) {
                case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
                    this.syncMessage = 'Checking for update'
                    break;
                case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
                    this.syncMessage = 'Downloading package'
                    break;
                case CodePush.SyncStatus.AWAITING_USER_ACTION:
                    this.syncMessage = 'Awaiting user action'
                    break;
                case CodePush.SyncStatus.INSTALLING_UPDATE:
                    this.syncMessage = 'Installing update'
                    break;
                case CodePush.SyncStatus.UP_TO_DATE:
                    this.syncMessage = 'App up to date.'
                    break;
                case CodePush.SyncStatus.UPDATE_IGNORED:
                    this.syncMessage = 'Update cancelled by user'
                    break;
                case CodePush.SyncStatus.UPDATE_INSTALLED:
                    this.syncMessage = 'Update installed and will be applied on restart.'
                    break;
                case CodePush.SyncStatus.UNKNOWN_ERROR:
                    this.syncMessage = 'An unknown error occurred'
                    Toast.message('更新出错，请重启应用')
                    this.setState({modalVisible: false})
                    break;
            }
        }
    }

    codePushDownloadDidProgress(progress) {
        if (this.state.immediateUpdate) {
            this.currProgress = parseFloat(progress.receivedBytes / progress.totalBytes).toFixed(2)
            if (this.currProgress >= 1) {
                this.setState({modalVisible: false})
            } else {
                this.progressBar.progress = this.currProgress
            }
        }
    }

    // syncImmediate() {
    syncImmediate() {
        CodePush.checkForUpdate(CODE_PUSH_KEY).then((update) => {
            console.log('-------' + update)
            if (!update) {
                Toast.message('已是最新版本！')
            } else {
                this.setState({modalVisible: true, updateInfo: update, isMandatory: update.isMandatory})
            }
        })
    }

    componentWillMount() {
        CodePush.disallowRestart()
        // this.syncImmediate()
    }

    componentDidMount() {
        CodePush.allowRestart()
    }

    _immediateUpdate() {
        this.setState({immediateUpdate: true})
        CodePush.sync(
            {deploymentKey: CODE_PUSH_KEY, updateDialog: {}, installMode: CodePush.InstallMode.IMMEDIATE},
            this.codePushStatusDidChange.bind(this),
            this.codePushDownloadDidProgress.bind(this)
        )
    }

    renderModal() {
        return (
            <Modal
                animationType={"none"}
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => alert("Modal has been closed.")}>
                <View style={styles.modal}>
                    <View style={styles.modalContainer}>
                        {
                            !this.state.immediateUpdate ?
                                <View>
                                    <Image style={{width: gScreen.screen_width - 60}}
                                           source={require('../../assets/images/app_empty.png')}
                                           resizeMode={'stretch'}/>
                                    <View style={{backgroundColor: commonStyle.white}}>
                                        <View style={{marginHorizontal: 15}}>
                                            <Text style={{
                                                marginVertical: 20,
                                                fontSize: 17,
                                                color: commonStyle.textBlockColor,
                                                fontWeight: 'bold'
                                            }}>更新内容</Text>
                                            <Text style={{lineHeight: 20}}>{this.state.updateInfo.description}</Text>
                                        </View>
                                        <View style={{alignItems: commonStyle.center, marginTop: 20}}>
                                            <Text style={{
                                                fontSize: 14,
                                                color: commonStyle.textGrayColor
                                            }}>wifi情况下更新不到30秒</Text>
                                        </View>
                                        {
                                            !this.state.isMandatory ?
                                                <View style={{
                                                    flexDirection: commonStyle.row,
                                                    height: 50,
                                                    alignItems: commonStyle.center,
                                                    marginTop: 20,
                                                    borderTopColor: commonStyle.lineColor,
                                                    borderTopWidth: 1
                                                }}>
                                                    <TouchableOpacity
                                                        onPress={() => this.setState({modalVisible: false})}>
                                                        <View style={{
                                                            flexDirection: commonStyle.row,
                                                            alignItems: commonStyle.center,
                                                            width: (gScreen.screen_width - 60) / 2,
                                                            height: 50,
                                                            borderRightColor: commonStyle.lineColor,
                                                            borderRightWidth: 1,
                                                            justifyContent: commonStyle.center
                                                        }}>
                                                            <MaterialIcons name={'do-not-disturb-alt'} size={20}
                                                                           color={'#B6B6B6'}/>

                                                            <Text style={{
                                                                fontSize: 17,
                                                                fontWeight: 'bold',
                                                                color: commonStyle.textGrayColor,
                                                                marginLeft: 10
                                                            }}>残忍拒绝</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        style={{
                                                            flexDirection: commonStyle.row,
                                                            alignItems: commonStyle.center,
                                                            width: (gScreen.screen_width - 60) / 2,
                                                            height: 50,
                                                            justifyContent: commonStyle.center
                                                        }}
                                                        onPress={() => this._immediateUpdate()}
                                                    >
                                                        <View style={{
                                                            backgroundColor: '#3496FA',
                                                            flex: 1,
                                                            height: 40,
                                                            alignItems: commonStyle.center,
                                                            justifyContent: commonStyle.center,
                                                            margin: 10,
                                                            borderRadius: 20
                                                        }}>
                                                            <Text style={{
                                                                fontSize: 17,
                                                                color: commonStyle.white,
                                                                fontWeight: 'bold'
                                                            }}>极速下载</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                </View> :
                                                <View style={{
                                                    flexDirection: commonStyle.row,
                                                    height: 60,
                                                    alignItems: commonStyle.center,
                                                    marginTop: 20,
                                                    borderTopColor: commonStyle.lineColor,
                                                    borderTopWidth: 1,
                                                    width: gScreen.screen_width - 60
                                                }}>
                                                    <TouchableOpacity
                                                        style={{
                                                            flexDirection: commonStyle.row,
                                                            alignItems: commonStyle.center,
                                                            width: (gScreen.screen_width - 60),
                                                            height: 50,
                                                            justifyContent: commonStyle.center
                                                        }}
                                                        onPress={() => this._immediateUpdate()}
                                                    >
                                                        <View style={{
                                                            backgroundColor: '#3496FA',
                                                            flex: 1,
                                                            height: 40,
                                                            alignItems: commonStyle.center,
                                                            justifyContent: commonStyle.center,
                                                            borderRadius: 20,
                                                            marginHorizontal: 40
                                                        }}>
                                                            <Text style={{
                                                                fontSize: 17,
                                                                color: commonStyle.white,
                                                                fontWeight: 'bold'
                                                            }}>立即更新</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>
                                        }
                                    </View>
                                </View> :
                                <View>
                                    <Image style={{width: gScreen.screen_width - 60}}
                                           source={require('../../assets/images/app_empty.png')}
                                           resizeMode={'stretch'}/>
                                    <View style={{
                                        backgroundColor: commonStyle.white,
                                        paddingVertical: 20,
                                        alignItems: commonStyle.center
                                    }}>
                                        <Progress
                                            ref={ref => this.progressBar = ref}
                                            progressColor={'#89C0FF'}
                                            style={{
                                                marginTop: 20,
                                                height: 10,
                                                width: gScreen.screen_width - 100,
                                                backgroundColor: commonStyle.bgColor,
                                                borderRadius: 10,
                                            }}
                                        />
                                        <View style={{alignItems: commonStyle.center, marginVertical: 20}}>
                                            <Text style={{
                                                fontSize: 14,
                                                color: commonStyle.textGrayColor
                                            }}>版本正在努力更新中，请等待</Text>
                                        </View>
                                    </View>
                                </View>
                        }
                    </View>
                </View>
            </Modal>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderModal()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: commonStyle.bgColor
    },
    modal: {
        height: gScreen.screen_height,
        width: gScreen.screen_width,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)'
    },
    modalContainer: {
        marginHorizontal: 60,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    }
})

export default CodePush(codePushOptions)(ProgressBar)
