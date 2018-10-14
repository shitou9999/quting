/**
 * Created by PVer on 2018/7/14.
 */
import React, {Component} from 'react'
import {Platform, StyleSheet, Modal, View, Alert, Text, TouchableOpacity, BackHandler} from 'react-native'
import {Input, ListRow, Button, Overlay, Label, Toast} from "../../components/teaset/index"
import toast from '../../components/base/toast'
import {commonStyle} from '../../constants/commonStyle'
import {BaseContainer} from "../../components/base"
import CodePush from 'react-native-code-push'
import UpdateComp from '../../components/update/ProgressBar'

//测试key
const CODE_PUSH_KEY = 'tp4K16G6jwKYttt13I2qHA-EA2ie37badfdf-a71a-4423-a094-451b4dde721c'
// let codePushOptions = {
// checkFrequency : CodePush.CheckFrequency.ON_APP_START
// }

export default class SettingPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            restartAllowed: true,
            syncMessage: '正在下载更新',
            progress: false,
        };
    }

    componentWillMount() {
        CodePush.disallowRestart()
    }

    componentDidMount() {
        CodePush.allowRestart()
    }

    // 监听更新状态
    codePushStatusDidChange(syncStatus) {
        switch (syncStatus) {
            case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
                toast.modalLoading('正在检查更新');
                break;
            case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
                toast.modalLoadingHide();
                this.setState({syncMessage: "正在下载更新"});
                break;
            case CodePush.SyncStatus.AWAITING_USER_ACTION:
                toast.modalLoadingHide();
                break;
            case CodePush.SyncStatus.INSTALLING_UPDATE:
                toast.modalLoadingHide();
                this.setState({syncMessage: "正在安装更新，请稍等……", progress: false});
                break;
            case CodePush.SyncStatus.UP_TO_DATE:
                toast.modalLoadingHide();
                Alert.alert('当前已经是最新版本');
                this.setState({progress: false});
                break;
            case CodePush.SyncStatus.UPDATE_IGNORED:
                console.log('用户取消更新');
                toast.modalLoadingHide();
                this.setState({progress: false});
                break;
            case CodePush.SyncStatus.UPDATE_INSTALLED:
                toast.modalLoadingHide();
                toast.success("更新完成");
                setTimeout(() => {
                    CodePush.restartApp();
                }, 1000)
                this.setState({progress: false});
                break;
            case CodePush.SyncStatus.UNKNOWN_ERROR:
                toast.modalLoadingHide();
                Alert.alert('更新出错，请重启应用！');
                this.setState({progress: false});
                break;
        }
    }

    codePushDownloadDidProgress(progress) {
        this.setState({progress});
    }

    syncImmediate() {
        CodePush.checkForUpdate(CODE_PUSH_KEY).then((update) => {
            console.log('-------' + update)
            if (!update) {
                Alert.alert('当前已经是最新版本');
                this.setState({progress: false});
            } else {
                // this.setState({modalVisible: true, updateInfo: update, isMandatory: update.isMandatory})
                CodePush.sync(
                    {
                        installMode: CodePush.InstallMode.IMMEDIATE,
                        updateDialog: {
                            // descriptionPrefix:'描述',
                            mandatoryUpdateMessage: '立即更新',
                            optionalIgnoreButtonLabel: '取消',
                            optionalInstallButtonLabel: '更新',
                            optionalUpdateMessage: '检测到有新的更新，是否立即更新',
                            title: '有可用的更新'
                        },
                    },
                    this.codePushStatusDidChange.bind(this),
                    this.codePushDownloadDidProgress.bind(this)
                );
            }
        })
    }

    showDownload = () => {
        const {progress, syncMessage} = this.state;
        if (!progress) {
            return null;
        }
        const float = progress.receivedBytes / progress.totalBytes;
        if (float >= 1) {
            return null;
        }
        const content = (progress.receivedBytes / 1024).toFixed(2) + 'KB/' + (progress.totalBytes / 1024).toFixed(2) + 'KB';
        return (
            <ModalDownload
                visible={true}
                title={syncMessage}
                content={content}
            />
        )
    };

    render() {
        const {navigation} = this.props;
        return (
            <BaseContainer title={'设置'}>
                <ListRow
                    style={{height: commonStyle.bottomBtnHeight}}
                    title='修改登录密码'
                    onPress={() => {
                        navigation.navigate('ModifyPwdPage')
                    }}
                    bottomSeparator='full'/>
                <ListRow
                    style={{height: commonStyle.bottomBtnHeight}}
                    title='自动付费说明'
                    onPress={() => {
                        navigation.navigate('AutoExplainPage')
                    }}
                    bottomSeparator='full'/>
                <ListRow
                    style={{height: commonStyle.bottomBtnHeight}}
                    title='关于我们'
                    onPress={() => {

                    }}
                    bottomSeparator='full'/>
                <ListRow
                    title={'版本更新'}
                    detail={'v1.0.0'}
                    bottomSeparator={'full'}
                    onPress={this.syncImmediate.bind(this)}
                />
                <TouchableOpacity onPress={() => {
                    // this.props.navigation.navigate('LoginStack')
                    BackHandler.exitApp()
                }}>
                    <View style={{
                        flexDirection: commonStyle.row,
                        justifyContent: commonStyle.center,
                        backgroundColor: commonStyle.white,
                        height: 50,
                        marginTop: commonStyle.marginTop,
                        alignItems: commonStyle.center
                    }}>
                        <Label size='md' type='title' text='退出登录'/>
                    </View>
                </TouchableOpacity>
                {this.showDownload()}
                <UpdateComp
                    {...this.props}
                    ref={ref => this._updateComp = ref}
                />
            </BaseContainer>
        );
    }
}

class ModalDownload extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: props.visible,
            transparent: true
        };
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    render() {
        const modalBackgroundStyle = {
            backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : '#f5fcff',
        };
        const innerContainerTransparentStyle = this.state.transparent
            ? {backgroundColor: '#fff', padding: 20}
            : null;
        return (
            <View>
                <Modal
                    animationType={'fade'}
                    transparent={this.state.transparent}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setModalVisible(false)
                    }}
                >
                    <View style={[styles.container, modalBackgroundStyle]}>
                        <View style={[styles.innerContainer, innerContainerTransparentStyle]}>
                            <Text style={{
                                fontWeight: 'bold',
                                fontSize: 18,
                                paddingBottom: commonStyle.padding
                            }}>{this.props.title}</Text>
                            <Text>{this.props.content}</Text>
                            {/*<Button title={'close'} onPress={_ => this.setModalVisible(false)}/>*/}
                        </View>

                    </View>
                </Modal>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    innerContainer: {
        borderRadius: 10,
        alignItems: 'center',
    },
    row: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        marginBottom: 20,
    },
    rowTitle: {
        flex: 1,
        fontWeight: 'bold',
    },
    button: {
        borderRadius: 5,
        flex: 1,
        height: 44,
        alignSelf: 'stretch',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    buttonText: {
        fontSize: 18,
        margin: 5,
        textAlign: 'center',
    },
    modalButton: {
        marginTop: commonStyle.marginTop,
    },
});
