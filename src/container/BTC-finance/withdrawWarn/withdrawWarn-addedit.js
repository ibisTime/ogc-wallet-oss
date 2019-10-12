import React from 'react';
import {Form} from 'antd';
import DetailUtil from 'common/js/build-detail';
import {getQueryString} from 'common/js/util';

@Form.create()
class WithdrawWarnAddedit extends DetailUtil {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
    this.state = {
      ...this.state,
      buyType: true
    };
    this.index = 0;
  }

  render() {
    const fields = [{
      field: 'name',
      title: '姓名',
      required: true
    }, {
      field: 'phone',
      title: '手机号',
      required: true
    }];
    return this.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      addCode: '802890',
      beforeSubmit: (params) => {
        params.type = '0';
        params.startDate = '0';
        params.endDate = '0';
        return true;
      }
    });
  }
}

export default WithdrawWarnAddedit;
