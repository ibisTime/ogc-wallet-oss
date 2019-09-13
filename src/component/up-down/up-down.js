import React from 'react';
import ModalDetail from 'common/js/build-modal-detail';

class UpDown extends React.Component {
  render() {
    let { code, key = 'code', biz, onOk, hideLoc, locKey } = this.props;
    let locationField = {
      field: 'location',
      title: 'UI位置',
      type: 'select',
      hidden: hideLoc,
      required: true
    };
    if (locKey) {
      locationField.key = locKey;
    } else {
      locationField.data = [{
        key: '0',
        value: '普通'
      }, {
        key: '1',
        value: '热门'
      }];
      locationField.keyName = 'key';
      locationField.valueName = 'value';
    }
    const options = {
      fields: [{
        field: key,
        value: code,
        hidden: true
      }, locationField, {
        field: 'orderNo',
        title: 'UI次序',
        required: true,
        help: '数字越小，排序越靠前',
        integer: true,
        maxlength: 30
      }],
      addCode: biz
    };
    if (onOk) {
      options.onOk = () => onOk();
    }
    return (
      <ModalDetail
        title='上架'
        visible={this.props.updownVisible}
        hideModal={() => this.props.setModalVisible(false)}
        options={options} />
    );
  }
}

export default UpDown;
