import React from 'react';
import { connect } from 'react-redux';
import { Form, Card, Row, Col, Avatar, Input, Icon, Button, Modal } from 'antd';
import PropTypes from 'prop-types';
import fetch from 'common/js/fetch';
import { getUserId } from 'common/js/util';
import { getLastGroupHistoryMsgs, getPreGroupHistoryMsgs, addMsg,
  checkSendMsg, onSendMsg, createMsg } from 'common/js/im/message';
import { setMsgList, setCurSelToID } from '@redux/message';
import FileUploadModal from './file-upload-modal';
import './index.css';

const { Meta } = Card;
const { TextArea } = Input;

@connect(
  state => ({ ...state.message }),
  { setCurSelToID, setMsgList }
)
class ChatBox extends React.Component {
  constructor(props) {
    super(props);
    this.lastMsgSeq = -1;
    this.state = {
      preLoading: false,
      showEmotion: false,
      emotions: this.getEmotions(),
      visible: false,
      previewImg: '',
      previewVisible: false
    };
  }
  componentDidMount() {
    this.props.setCurSelToID(this.props.chatId);
    this.props.setMsgList([]);
    this.addToGroup().then(() => {
      this.getGroupMsgs();
    });
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.msgList.length !== this.props.msgList.length) {
      let msgBox = this.msgBox;
      // 300ms后,等待图片加载完，滚动条自动滚动到底部
      setTimeout(function() {
        msgBox.scrollTop = msgBox.scrollHeight;
      }, 300);
    }
  }
  // 显示上传图片框
  showUploadModal = () => {
    this.setState({ visible: true });
  }
  // 隐藏上传图片框
  hideUploadModal = () => {
    this.setState({ visible: false });
  }
  // 改变表情框的显示状态
  changeEmotionBox = () => {
    this.setState({ showEmotion: !this.state.showEmotion });
  }
  // 点击表情
  handleEmotionClick = (emotion) => {
    let msg = this.props.form.getFieldValue('content') || '';
    msg += emotion[0];
    this.props.form.setFieldsValue({ content: msg });
  }
  // 获取表情数组
  getEmotions() {
    let arr = [];
    for (let key in webim.Emotions) {
      let item = webim.Emotions[key];
      arr.push([item[0], item[1]]);
    }
    return arr;
  }
  // 加入群
  addToGroup() {
    return fetch(805094, {
      tradeOrderCode: this.props.chatId,
      userId: getUserId()
    });
  }
  // 获取最新几条群消息
  getGroupMsgs() {
    getLastGroupHistoryMsgs(this.props.chatId).then(([msgList, nextMsgSeq]) => {
      this.nextMsgSeq = nextMsgSeq;
      let newList = msgList.map(msg => addMsg(msg, this.props.userMap)).filter(m => m);
      this.props.setMsgList(newList);
      let msgBox = this.msgBox;
      // 300ms后,等待图片加载完，滚动条自动滚动到底部
      setTimeout(function() {
        msgBox.scrollTop = msgBox.scrollHeight;
      }, 300);
    });
  }
  getPreGroupHistoryMsgs() {
    if (this.nextMsgSeq && this.nextMsgSeq >= 0) {
      this.setState({ preLoading: true });
      getPreGroupHistoryMsgs(this.props.chatId, this.nextMsgSeq).then(([msgList, nextMsgSeq]) => {
        this.nextMsgSeq = nextMsgSeq;
        let newList = msgList.map(msg => addMsg(msg, this.props.userMap)).filter(m => m);
        let oldList = this.props.msgList.slice();
        let list = newList.concat(oldList);
        this.props.setMsgList(list);
        this.setState({ preLoading: false });
        let msgBox = this.msgBox;
        if (msgBox.scrollTop === 0) {
          setTimeout(function() {
            msgBox.scrollTop = 0;
          }, 300);
        }
      }).catch(() => {
        this.setState({ preLoading: false });
      });
    }
  }
  // 聊天列表点击图片查看大图
  handleImgClick = (url) => {
    this.showPreviewImg(url);
  }
  getMsg(msg, key) {
    return (
      <div key={key} className={msg.isSelfSend ? 'onemsg my' : 'onemsg user'}>
        <div className="msghead">
          <div className="photoWrap">{
            msg.fromAccountImage ? (
              <div className="photo" style={{backgroundImage: `url(${msg.fromAccountImage})`}}></div>
            ) : (
              <div className="photo">
                <div className="noPhoto">{msg.isSelfSend ? 'S' : 'C'}</div>
              </div>
            )
          }</div>
          <div className="nameWrap">
            <samp className="name">{msg.fromAccountNick}</samp>
            <samp>{msg.msgTime}</samp>
          </div>
        </div>
        <div className="msgbody">
          <div className="msgcon">{
            msg.content.map((cont, i) => (
              cont.type === 'text'
                ? cont.textarea
                : cont.type === 'face'
                  ? <img className="face-img" key={i} src={cont.textContent} />
                  : <img key={cont.textContent.bigImgUrl} name={cont.textContent.name} src={cont.textContent.imgUrl} onClick={() => this.handleImgClick(cont.textContent.bigImgUrl)} />
            ))
          }</div>
        </div>
      </div>
    );
  }
  getAdminMsg(msg, key) {
    return (
      <div key={key} className="onemsg admin">
        <div className="msghead">{msg.content[0].textContent}<samp>({msg.msgTime})</samp></div>
        <div className="msgbody"></div>
      </div>
    );
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err && checkSendMsg(this.props.chatId, fieldsValue.content)) {
        let msg = createMsg(this.props.chatId, fieldsValue.content);
        onSendMsg(this.props.chatId, msg);
        this.setState({ showEmotion: false });
        this.props.form.resetFields();
      }
    });
  }
  showPreviewImg(url) {
    this.setState({ previewImg: url, previewVisible: true });
  }
  hidePreviewImg = () => {
    this.setState({ previewImg: '', previewVisible: false });
  }
  onScroll = () => {
    if (!this.state.preLoading) {
      let msgBox = this.msgBox;
      let scrollTop = msgBox.scrollTop; // 滚动条滚动高度
      if (scrollTop === 0 && this.nextMsgSeq) {
        msgBox.scrollTop = 10;
        this.getPreGroupHistoryMsgs();
      }
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { emotions, showEmotion, visible, previewVisible, previewImg } = this.state;
    const { msgList, chatId } = this.props;
    return (
      <div className="chatbox-wrapper">
        <div className="content-wrap">
          <div className="wrap chat-wrap">
            <div className="msgflow" ref={msgBox => this.msgBox = msgBox} onScroll={this.onScroll}>
              {
                msgList.map((msg, i) => (
                  msg.fromAccount === 'admin' && !msg.isSelfSend
                    ? this.getAdminMsg(msg, i)
                    : this.getMsg(msg, i)
                ))
              }
            </div>
          </div>
        </div>
        <div className="editbar-wrapper">
          <span onClick={this.showUploadModal}><Icon type="picture" style={{fontSize: 22}}/></span>
          <span onClick={this.changeEmotionBox} className="emotion-span"><Icon type="smile" style={{fontSize: 22}}/></span>
          {
            showEmotion ? (
              <div className="emotionUL-wrap">
                <ul>{emotions.map(e => <li onClick={() => this.handleEmotionClick(e)} key={e[0]}><img src={e[1]} /></li>)}</ul>
              </div>
            ) : null
          }
        </div>
        <div className="btnWrap">
            <Form onSubmit={this.handleSubmit}>
              <Form.Item style={{marginBottom: 10}}>
                {getFieldDecorator('content')(
                  <TextArea placeholder="按回车发送消息" autosize={{ minRows: 4, maxRows: 8 }}/>
                )}
              </Form.Item>
              <Form.Item style={{marginBottom: 0}}>
                <Button type="primary" htmlType="submit" style={{float: 'right'}}>
                  发送
                </Button>
              </Form.Item>
            </Form>
        </div>
        <FileUploadModal
          chatId={chatId}
          visible={visible}
          handleOk={this.hideUploadModal}
          handleCancel={this.hideUploadModal} />
        <Modal visible={previewVisible} footer={null} onCancel={this.hidePreviewImg}>
          <img style={{maxWidth: '100%'}} src={previewImg} />
        </Modal>
      </div>
    );
  }
}

export default Form.create()(ChatBox);

ChatBox.propTypes = {
  chatId: PropTypes.string.isRequired
};

ChatBox.defaultProps = {
  chatId: ''
};
