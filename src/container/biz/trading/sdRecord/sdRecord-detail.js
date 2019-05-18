import React from 'react';
import { Form } from 'antd';
import DetailUtil from 'common/js/build-detail';
import {getQueryString, moneyFormat} from 'common/js/util';

@Form.create()
class PaymentAddedit extends DetailUtil {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
  }
  render() {
    const fields = [{
      field: 'realName',
      title: '户名',
      required: true
    }, {
      field: 'bindMobile',
      title: '绑定手机号'
    }, {
      field: 'pic',
      title: '收款码',
      type: 'img',
      single: true
    }, {
      field: 'status',
      title: '状态',
      type: 'select',
      hidden: true,
      key: 'bank_card_status'
    }, {
      field: 'remark',
      title: '备注'
    }];
    return this.buildDetail({
      fields,
      code: this.code,
      view: true,
      detailCode: '802933'
    });
  }
}

export default PaymentAddedit;
