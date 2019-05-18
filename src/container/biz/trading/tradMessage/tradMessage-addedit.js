import React from 'react';
import { Form, message } from 'antd';
import DetailUtil from 'common/js/build-detail';
import {getQueryString, moneyFormat} from 'common/js/util';

@Form.create()
class TradMessageAddedit extends DetailUtil {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
    this.symbolIn = '';
    this.symbolOut = '';
  }
  render() {
    const fields = [{
      field: 'symbolIn',
      title: '兑入币种',
      required: true,
      type: 'select',
      pageCode: '802005',
      params: {
        status: '0'
      },
      keyName: 'symbol',
      valueName: '{{symbol.DATA}}-{{cname.DATA}}',
      searchName: 'symbol',
      render: (v) => v,
      onChange: (v) => {
        this.symbolIn = v;
        if(v === this.symbolOut) {
          message.warning('已选择重复币种, 请重新选择');
        }
      }
    }, {
      field: 'symbolOut',
      title: '兑出币种',
      required: true,
      type: 'select',
      pageCode: '802005',
      params: {
        status: '0'
      },
      keyName: 'symbol',
      valueName: '{{symbol.DATA}}-{{cname.DATA}}',
      searchName: 'symbol',
      render: (v) => v,
      onChange: (v) => {
        this.symbolOut = v;
        if(v === this.symbolIn) {
          message.warning('已选择重复币种');
        }
      }
    }, {
      field: 'feeRate',
      title: '手续费率(%)',
      required: true
    }, {
      field: 'min',
      title: '最小兑入数量',
      required: true
    }, {
      field: 'orderNo',
      title: '展示序号',
      required: true
    }, {
      field: 'status',
      title: '状态',
      key: 'trade_default_fee_rate',
      type: 'select',
      hidden: !this.view
    }, {
      field: 'createTime',
      title: '创建时间',
      type: 'datetime',
      hidden: !this.view
    }, {
      field: 'remark',
      title: '备注'
    }];
    return this.buildDetail({
      fields,
      code: this.code,
      key: 'id',
      view: this.view,
      addCode: '802900',
      editCode: '802901',
      detailCode: '802913'
    });
  }
}

export default TradMessageAddedit;
