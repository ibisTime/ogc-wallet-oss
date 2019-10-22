import React from 'react';
import { Layout, Menu, Breadcrumb, Icon, Dropdown, Button } from 'antd';
import { Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  getMenuList,
  setTopCode,
  setSubMenuCode,
  setSubOpenCode,
  clearSubOpenCode,
  restoreSubOpenCode
} from '@redux/menu';
import { loadTxUserSign, setSelToId } from '@redux/user';
import { setMsgList, addUserMap } from '@redux/message';
import { clearUser, getUserId, getUserName, setSystem } from 'common/js/util';
import { addMsg } from 'common/js/im/message';
import fetch from 'common/js/fetch';
import asyncComponent from '../async-component/async-component';
import EditPwd from 'component/edit-pwd/edit-pwd';
import ROUTES from 'src/route';
import './dashboard.css';

const { SubMenu, Item } = Menu;
const { Header, Content, Sider } = Layout;
const Home = asyncComponent(() => import('../../container/home/home'));

@connect(
  state => ({ ...state.user, ...state.menu, ...state.message, loginName: state.user.loginName }),
  { getMenuList, setTopCode, setSubMenuCode, setSubOpenCode, clearSubOpenCode,
    restoreSubOpenCode, setSelToId, loadTxUserSign, setMsgList, addUserMap }
)
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editPwdVisible: false
    };
  }
  componentDidMount() {
    // this.getUserSign();
    this.props.getMenuList(this.props.location.pathname);
    this.props.addUserMap(getUserId(), {nickname: getUserName()});
    setSystem();
  }
  handleTopMenuClick = (e) => {
    if (e.key && e.key !== 'user') {
      this.props.setTopCode(e.key);
      let leftMenu = this.props.top2SubObj[e.key][0];
      leftMenu = leftMenu.children ? leftMenu.children[0] : leftMenu;
      let url = leftMenu.url.split('.')[0];
      sessionStorage.setItem('menuName', leftMenu.name);
      this.props.history.push(url);
    }
  }
  handleSubMenuClick = (e) => {
    if (e.key) {
      this.props.setSubMenuCode(e.key);
      let url = this.props.menus[e.key].url.split('.')[0];
      sessionStorage.setItem('menuName', this.props.menus[e.key].name);
      this.props.history.push(url);
    }
  }
  handleTitleClick = (e) => {
    if (e.key) {
      this.props.setSubOpenCode(e.key);
    }
  }
  logout = (e) => {
    clearUser();
    window.location.href = '/login';
  }
  setEditPwdVisible = (editPwdVisible) => {
    this.setState({ editPwdVisible });
  }
  getRoutes() {
    return ROUTES.map(v => <Route key={v.path} exact path={v.path} component={v.component}></Route>);
  }
  getBreadcrumb() {
    if (!this.props.topMenuCode || !this.props.subMenuCode) {
      return null;
    }
    let menuArr = [
      this.props.menus[this.props.topMenuCode],
      this.props.menus[this.props.menus[this.props.subMenuCode].parentCode],
      this.props.menus[this.props.subMenuCode]
    ];
    if (this.props.menus[this.props.subMenuCode].parentCode === this.props.topMenuCode) {
      menuArr.splice(1, 1);
    }
    return menuArr.map(v => (
      <Breadcrumb.Item key={v.code}>
        {v.url !== '#'
          ? <Link to={v.url.split('.')[0]}>
            {v.name}
          </Link> : v.name}
      </Breadcrumb.Item>
    ));
  }
  getHeader() {
    const userShow = (
      <Menu>
        <Menu.Item><a href="#" onClick={() => this.setEditPwdVisible(true)}>修改密码</a></Menu.Item>
        <Menu.Item><a href="#" onClick={this.logout}>退出</a></Menu.Item>
      </Menu>
    );
    const logo = sessionStorage.getItem('webIcon');
    return (
      <Header className="header">
          <div className="logo" onClick={() => {
              this.props.setTopCode('');
              this.props.history.push('/');
          }}>
            <img style ={{height: '40px'}} src={logo}/>
          </div>
        <Menu
          theme="dark"
          mode="horizontal"
          style={{ lineHeight: '64px' }}
          onClick={this.handleTopMenuClick}
          selectedKeys={[this.props.topMenuCode]}
        >
          {this.props.topMenuList.map(v => (
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
  getLeftSlider() {
    return this.props.subMenuList.length ? (
      <Menu
        mode="inline"
        selectedKeys={[this.props.subMenuCode]}
        openKeys={[...this.props.subOpenCode]}
        onClick={this.handleSubMenuClick}
      >
        {this.props.subMenuList.map(v => (
          v.children ? (
            <SubMenu
              key={`${v.code}`}
              onTitleClick={this.handleTitleClick}
              title={<span><Icon type="desktop"/><span>{v.name}</span></span>}
            >
              {v.children.map(c => <Item key={c.code}>{c.name}</Item>)}
            </SubMenu>
          ) : (
            <Item key={v.code}>
              <Icon type="" />
              <span>{v.name}</span>
            </Item>
          )
        ))}
      </Menu>
    ) : null;
  }
  getContent(rightCls, innerCls) {
    let props = {
      className: 'right-content'
    };
    if (this.props.location.pathname === '/') {
      props.style = {
        background: '#f0f2f5',
        padding: 2
      };
    }
    return (
      <Layout className={rightCls}>
        <Breadcrumb className={innerCls} style={{ margin: '16px 0' }}>
          {this.getBreadcrumb()}
        </Breadcrumb>
        <Content {...props}>
          <Switch>
            <Route path='/' exact component={Home}></Route>
            {this.props.topMenuList.length ? this.getRoutes() : null}
          </Switch>
        </Content>
      </Layout>
    );
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

  addGroupSystemMsg = (type, typeCh, groupId, groupName, msgContent, msgTime) => {
    var data = [];
    data.push({
      ReportType: type,
      ReportTypeCh: typeCh,
      GroupId: webim.Tool.formatText2Html(groupId),
      GroupName: webim.Tool.formatText2Html(groupName),
      MsgContent: webim.Tool.formatText2Html(msgContent),
      MsgTime: webim.Tool.formatTimeStamp(msgTime)
    });
  }

  getUserSign() {
    let userId = getUserId();
    fetch(805087, { userId: userId }).then((data) => {
      this.props.loadTxUserSign({
        accountType: data.accountType,
        sign: data.sign,
        txAppCode: data.txAppCode
      });
      this.txLogin(userId, data.accountType, data.sign, data.txAppCode);
    });
  }
  render() {
    const innerCls = this.props.topMenuCode ? '' : 'hidden';
    let rightCls = 'right-layout';
    if (!this.props.topMenuCode) {
      rightCls += ' full-right-content';
    }
    return (
      <Layout className="dashboard-layout" style={{minHeight: '100%'}}>
        {this.getHeader()}
        <Layout>
          <Sider
            trigger={null}
            className={`left-slider ${innerCls}`}
          >
            {this.getLeftSlider()}
          </Sider>
          {this.getContent(rightCls, innerCls)}
        </Layout>
      </Layout>
    );
  }
}

export default Dashboard;
