import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Row, Col, Progress } from 'antd';
import { noop } from 'common/js/util';
import { uploadPic, fileOnChange } from 'common/js/im/message';

export default class FileUploadModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previewImg: '',
      imgName: '',
      percent: 0,
      loading: false
    };
  }
  // 图片上传框选择图片后的处理函数
  handleChange = (e) => {
    let files = e.target.files;
    if (!files || !files.length) {
      return;
    }
    this.file = files[0];
    fileOnChange(e.target).then(([previewImg, imgName]) => {
      this.setState({ previewImg, imgName });
    }).catch(() => {});
  }
  // 上传图片
  uploadPic = () => {
    this.setState({ loading: true });
    const { chatId, handleOk } = this.props;
    uploadPic(chatId, this.file, this.onProgressCallBack).then(() => {
      handleOk();
      this.setState({ loading: false, previewImg: '', percent: 0 });
    }).catch(() => {});
  }
  // 图片上传进度
  onProgressCallBack = (loadedSize, totalSize) => {
    this.setState({ percent: (loadedSize / totalSize) * 100 });
  }
  render() {
    const { previewImg, imgName, percent, loading } = this.state;
    const { visible, handleCancel } = this.props;
    return (
      <Modal
        title="发送图片"
        okText="上传"
        cancelText="关闭"
        visible={visible}
        onOk={this.uploadPic}
        onCancel={handleCancel}
        destroyOnClose={true}
        confirmLoading={loading}
      >
        <Row gutter={16} style={{marginBottom: 10}}>
          <Col span={6}>图片</Col>
          <Col span={18}><input type="file" onChange={this.handleChange}/></Col>
        </Row>
        <Row gutter={16} style={{marginBottom: 10}}>
          <Col span={6}>预览</Col>
          <Col span={18}>{previewImg ? <img style={{maxWidth: '100%'}} src={previewImg} alt={imgName} /> : null}</Col>
        </Row>
        <Row gutter={16}>
          <Col span={6}>进度</Col>
          <Col span={18}> <Progress percent={percent} /></Col>
        </Row>
      </Modal>
    );
  }
}

FileUploadModal.propTypes = {
  chatId: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  handleOk: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired
};

FileUploadModal.defaultProps = {
  chatId: '',
  visible: false,
  handleOk: noop,
  handleCancel: noop
};
