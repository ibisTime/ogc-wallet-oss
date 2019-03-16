import React from 'react';
import { Form } from 'antd';
import { getQueryString } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';

@Form.create()
class QuantitativeAddEdit extends DetailUtil {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
      field: 'code',
      title: '文章编号',
      hidden: !this.view,
      required: true
    }, {
      field: 'name',
      title: '分类名称',
      required: true
    }, {
      field: 'orderNo',
      title: '次序',
      required: true
    }, {
      title: '状态',
      field: 'status',
      type: 'select',
      data: [{
        key: '0',
        value: '待上架'
      }, {
        key: '1',
        value: '上架中'
      }, {
        key: '2',
        value: '已下架'
      }],
      keyName: 'key',
      valueName: 'value',
      search: true,
      hidden: !this.view
    }, {
      field: 'updateDatetime',
      type: 'datetime',
      title: '最新更新时间',
      hidden: !this.view
    }, {
      field: 'updater',
      title: '最新更新人',
      hidden: !this.view
    }];
    return this.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      addCode: 802850,
      detailCode: 802863,
      editCode: 802851
    });
  }
}

export default QuantitativeAddEdit;
