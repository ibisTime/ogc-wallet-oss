import React from 'react';
import { Layout, Menu, Breadcrumb, Icon, Dropdown, Button } from 'antd';
import { Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadTxUserSign, setSelToId } from '@redux/user';
import { setMsgList, addUserMap } from '@redux/message';
import { clearUser, getUserId, getUserName, setWebIcon } from 'common/js/util';
import { addMsg } from 'common/js/im/message';
import EditPwd from 'component/edit-pwd/edit-pwd';
import 'component/dashboard/dashboard.css';
import './guessUpsDowns.css';
import ROUTES from './route';

const { SubMenu, Item } = Menu;
const { Header, Content, Sider } = Layout;

@connect(
    state => ({ ...state.user, ...state.menu, ...state.message, loginName: state.user.loginName }),
    { setSelToId, loadTxUserSign, setMsgList, addUserMap }
)
class GuessUpsDowns extends React.Component {
    constructor(props) {
        super(props);
        let topMenuCode = '';
        if (sessionStorage.getItem('superMenuName') && window.location.pathname !== '/guessUpsDowns') {
            topMenuCode = sessionStorage.getItem('superMenuName');
        } else {
            topMenuCode = 'home';
        }
        this.state = {
            editPwdVisible: false,
            // 选择的菜单key
            topMenuCode: topMenuCode,
            topMenuList: [{
                code: 'home',
                name: '首页'
            }, {
                code: 'quotation',
                name: '行情'
            }, {
                code: 'scene',
                name: '场次'
            }, {
                code: 'robot',
                name: '机器人'
            }, {
                code: 'configuration',
                name: '规则配置'
            }],
            // 菜单对应跳转url
            top2SubObj: {
                'home': '/guessUpsDowns',
                'quotation': '/guessUpsDowns/quotation',
                'scene': '/guessUpsDowns/scene',
                'robot': '/guessUpsDowns/robot',
                'configuration': '/guessUpsDowns/configuration'
            }
        };
    }

    componentDidMount() {
        const webLogo = sessionStorage.getItem('headLogo');
        setWebIcon(webLogo);
        this.props.addUserMap(getUserId(), {nickname: getUserName()});
    }

    getHeader() {
        const userShow = (
            <Menu>
                <Menu.Item><a href="#" onClick={() => this.setEditPwdVisible(true)}>修改密码</a></Menu.Item>
                <Menu.Item><a href="#" onClick={this.logout}>退出</a></Menu.Item>
            </Menu>
        );
        const logo = sessionStorage.getItem('webIcon');
        const webName = sessionStorage.getItem('webName');
        document.title = webName;
        return (
            <Header className="header">
                <div className="logo" onClick={() => {
                    this.props.history.push('/guessUpsDowns');
                }}>
                    <img style ={{height: '40px'}} src={logo}/>
                </div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    style={{ lineHeight: '64px' }}
                    onClick={this.handleTopMenuClick}
                    selectedKeys={[this.state.topMenuCode]}
                >
                    {this.state.topMenuList.map(v => (
                        <Item key={v.code}>{v.name}</Item>
                    ))}
                    <Item key="user" style={{float: 'right'}}>
                        <Dropdown overlay={userShow}>
                            <a href="#" style={{display: 'inline'}}>
                                {this.props.loginName} <Icon type="down" />
                            </a>
                        </Dropdown>
                    </Item>
                </Menu>
                <EditPwd editPwdVisible={this.state.editPwdVisible} setEditPwdVisible={this.setEditPwdVisible}/>
            </Header>
        );
    }

    getContent() {
        let rightCls = 'right-layout full-right-content';
        let props = {};
        if (this.props.location.pathname === '/') {
            props.style = {
                background: '#f0f2f5',
                padding: 2
            };
        }
        return (
            <Layout className={rightCls}>
                <Content {...props}>
                    <Switch>
                        {
                            this.getRoutes()
                        }
                    </Switch>
                </Content>
            </Layout>
        );
    }

    getRoutes() {
        return ROUTES.map(v => <Route key={v.path} exact path={v.path} component={v.component}></Route>);
    }

    handleTopMenuClick = ({key}) => {
        if (key && key !== 'user') {
            this.setState({
                'topMenuCode': key
            });
            sessionStorage.setItem('superMenuName', key);
            let url = this.state.top2SubObj[key];
            this.props.history.push(url);
        }
    }

    // 监听连接状态回调变化事件
    onConnNotify = (resp) => {
        let info;
        switch (resp.ErrorCode) {
            case webim.CONNECTION_STATUS.ON:
                webim.Log.warn('建立连接成功: ' + resp.ErrorInfo);
                break;
            case webim.CONNECTION_STATUS.OFF:
                info = '连接已断开，无法收到新消息，请检查下你的网络是否正常: ' + resp.ErrorInfo;
                webim.Log.warn(info);
                break;
            case webim.CONNECTION_STATUS.RECONNECT:
                info = '连接状态恢复正常: ' + resp.ErrorInfo;
                webim.Log.warn(info);
                break;
            default:
                webim.Log.error('未知连接状态: =' + resp.ErrorInfo);
                break;
        }
    }
    txLogin(identifier, accountType, userSig, sdkAppID) {
        let loginInfo = {
            sdkAppID: sdkAppID,
            identifier: identifier,
            accountType: accountType,
            userSig: userSig
        };
        // 监听（多终端同步）群系统消息方法，方法都定义在receive_group_system_msg.js文件中
        let onGroupSystemNotifys = {
            '255': this.onCustomGroupNotify // 用户自定义通知(默认全员接收)
        };
        // 监听事件
        let listeners = {
            onConnNotify: this.onConnNotify, // 监听连接状态回调变化事件,必填
            onMsgNotify: this.onMsgNotify, // 监听新消息(私聊，普通群(非直播聊天室)消息，全员推送消息)事件，必填
            onGroupSystemNotifys: onGroupSystemNotifys // 监听（多终端同步）群系统消息事件，如果不需要监听，可不填
        };
        let isLogOn = false; // 是否开启sdk在控制台打印日志
        let isAccessFormalEnv = true; // 是否访问正式环境

        // 初始化时，其他对象，选填
        let options = {
            'isAccessFormalEnv': isAccessFormalEnv, // 是否访问正式环境，默认访问正式，选填
            'isLogOn': isLogOn // 是否开启控制台打印日志,默认开启，选填
        };
        this._txLogin(loginInfo, listeners, options);
    }
    _txLogin(loginInfo, listeners, options) {
        // webim.login(loginInfo, listeners, options, function(resp) {
        //   webim.syncGroupMsgs({}, (data) => {
        //     console.debug(data);
        //   }, (data) => {
        //     console.debug(data);
        //   });
        // }, (err) => {
        //   alert(err.ErrorInfo);
        // });
    }
    // newMsgList 为新消息数组，结构为[Msg]
    onMsgNotify = (newMsgList) => {
        var selSess, newMsg;
        // 遍历新消息
        for (var j in newMsgList) {
            newMsg = newMsgList[j];
            // console.log(newMsg);
            // console.log(newMsg.elems);
            // let pp = newMsg.elems[0];
            // let dd = pp.content;
            // let aa = dd.text;
            // let cc = aa.substring(5);
            // newMsg.elems[0].content.text = cc;
            // // newMsg = newMsg.push(cc);
            // console.log(cc);
            // 过滤掉加人的消息格式
            if (newMsg.fromAccount === '@TIM#SYSTEM') {
                continue;
            }
            if (this.props.curSelToID === newMsg.getSession().id()) {
                selSess = newMsg.getSession();
                let _list = this.props.msgList.slice();
                _list.push(addMsg(newMsg, this.props.userMap));
                this.props.setMsgList(_list);
            }
        }
        selSess && webim.setAutoRead(selSess, true, true);
    }

    // 监听 用户自定义 群系统消息
    onCustomGroupNotify = (notify) => {
        webim.Log.info('执行 用户自定义系统消息 回调：' + JSON.stringify(notify));
        var reportTypeCh = '[用户自定义系统消息]';
        var content = notify.UserDefinedField; // 群自定义消息数据
        this.addGroupSystemMsg(notify.ReportType, reportTypeCh, notify.GroupId, notify.GroupName, content, notify.MsgTime);
    }

    logout = (e) => {
        clearUser();
        window.location.href = '/login';
    }
    setEditPwdVisible = (editPwdVisible) => {
        this.setState({ editPwdVisible });
    }

    render() {
        return (
            <Layout className="dashboard-layout guessUpsDowns-wrapper" style={{minHeight: '100%'}}>
                {this.getHeader()}
                <Layout>
                    {this.getContent()}
                </Layout>
            </Layout>
        );
    }
}

export default GuessUpsDowns;
