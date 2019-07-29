import React from 'react';
import { Form, message } from 'antd';
import DetailUtil from 'common/js/build-detail';
import {getQueryString, moneyFormat, moneyParse} from 'common/js/util';

@Form.create()
class TradMessageAddedit extends DetailUtil {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
    this.index = 0;
    this.symbolIn = '';
    this.symbolOut = '';
  }
  render() {
    const fields = [{
      field: 'symbolIn',
      title: '兑入币种',
      type: 'select',
      listCode: '802013',
      keyName: 'symbol',
      valueName: 'symbol',
      required: true,
      onChange: (v) => {
        this.symbolIn = v;
        if(v === this.symbolOut) {
          message.warning('不可选相同币进行兑换，请重新选择');
        }
      }
    }, {
      field: 'symbolOut',
      title: '兑出币种',
      required: true,
      type: 'select',
      listCode: '802013',
      keyName: 'symbol',
      valueName: 'symbol',
      onChange: (v) => {
        this.symbolOut = v;
        if(v === this.symbolIn) {
          message.warning('不可选相同币进行兑换，请重新选择');
        }
      }
    }, {
      field: 'feeRate',
      title: '手续费率(%)',
      required: true
    }, {
      field: 'min',
      title: '最小兑出数量(单次)',
      required: true,
      formatter: function (v, data) {
        return moneyFormat(v.toString(), '', data.symbolOut);
      }
    }, {
        field: 'max',
        title: '最大兑出数量(单次)',
        formatter: function (v, data) {
            return moneyFormat(v.toString(), '', data.symbolOut);
        }
    }, {
        field: 'dailyLimit',
        title: '每日次数限制',
        required: true
    }, {
      field: 'orderNo',
      title: '展示序号',
      required: true
    }, {
      field: 'status',
      title: '状态',
      key: 'exchange_symbol_pair_statis',
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
      detailCode: '802913',
      beforeSubmit: (params) => {
        if(params.symbolOut === params.symbolIn) {
          message.warning('兑出币种不可与兑入币种一样');
          return false;
        }else {
          params.min = moneyParse(params.min, '', params.symbolOut);
          params.max = moneyParse(params.max, '', params.symbolOut);
          return true;
        }
      }
    });
  }
}

export default TradMessageAddedit;
