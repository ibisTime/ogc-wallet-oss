import React from 'react';
import { Form } from 'antd';
import DetailUtil from 'common/js/build-detail';
import {getQueryString, moneyFormat} from 'common/js/util';

@Form.create()
class ShopCategoryAddedit extends DetailUtil {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = getQueryString('view', this.props.location.search);
  }
  render() {
    const fields = [{
      field: 'name',
      title: '名称',
      required: true
    }, {
        field: 'pic',
        title: '图片',
        type: 'img',
        single: true,
        required: true
    }];
    return this.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      detailCode: '808006',
      addCode: '808000',
      editCode: '808002',
      beforeSubmit(params) {
        params.type = '4';
        params.parentCode = '0';
        return params;
      }
    });
  }
}

export default ShopCategoryAddedit;
