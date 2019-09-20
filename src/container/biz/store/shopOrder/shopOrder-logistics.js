import React from 'react';
import { Form } from 'antd';
import DetailUtil from 'common/js/build-detail';
import {getQueryString, moneyFormat, getUserName, getUserId} from 'common/js/util';

@Form.create()
class ShopOrderLogistics extends DetailUtil {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
        field: 'logisticsCode',
        title: '物流单号',
        required: true
    }, {
        field: 'logisticsCompany',
        title: '物流公司',
        required: true
    }, {
        field: 'pdf',
        title: '物流单',
        type: 'file'
    }, {
        field: 'remark',
        title: '备注'
    }];
    return this.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      editCode: '808054',
        beforeSubmit(params) {
          params.deliverer = getUserName();
          params.updater = getUserId();
          return params;
        }
    });
  }
}

export default ShopOrderLogistics;
