import React from 'react';
import ModalDetail from 'common/js/build-modal-detail';

class UpDowns extends React.Component {
  render() {
    let { codeList, key = 'codeList', biz, onOk } = this.props;
    const options = {
      fields: [{
        field: key,
        value: codeList,
        hidden: true
      }, {
        field: 'approveNote',
        title: '审核说明',
        required: true,
        maxlength: 30
      }, {
        field: 'approveUser',
        title: '审核人',
        required: true,
        maxlength: 30
      }, {
        title: '是否通过',
        field: 'result',
        required: true,
        type: 'select',
        data: [{
          key: '0',
          value: '不通过'
        }, {
          key: '1',
          value: '通过'
        }],
        keyName: 'key',
        valueName: 'value',
        search: true
      }],
      addCode: biz
    };
    if (onOk) {
      options.onOk = () => onOk();
    }
    return (
      <ModalDetail
        title='审核'
        visible={this.props.updownVisible}
        hideModal={() => this.props.setModalVisible(false)}
        options={options} />
    );
  }
}

export default UpDowns;
