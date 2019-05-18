import React from 'react';
import { Form } from 'antd';
import DetailUtil from 'common/js/build-detail';
import {getQueryString, moneyFormat} from 'common/js/util';

@Form.create()
class SdRecordDetail extends DetailUtil {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
  }
  render() {
    const fields = [{
      field: 'code',
      title: '编号'
    }, {
      field: 'nickname',
      title: '昵称',
      formatter(v, d) {
        return d.userInfo.nickname + '-' + d.userInfo.loginName;
      }
    }, {
      field: 'symbolOut',
      title: '兑入币种'
    }, {
      field: 'symbolIn',
      title: '兑出币种'
    }, {
      field: 'countOutTotal',
      title: '总兑出数量',
      formatter: function (v, data) {
        return moneyFormat(v.toString(), '', data.symbolOut);
      }
    }, {
      field: 'countOut',
      title: '实际兑出数量',
      formatter: function (v, data) {
        return moneyFormat(v.toString(), '', data.symbolOut);
      }
    }, {
      field: 'countIn',
      title: '兑入数量',
      formatter: function (v, data) {
        return moneyFormat(v.toString(), '', data.symbolIn);
      }
    }, {
      field: 'valueCnyOut',
      title: '兑出币种行情价格'
    }, {
      field: 'valueCnyIn',
      title: '兑入币种行情价格'
    }, {
      field: 'fee',
      title: '手续费'
    }, {
      field: 'feeRate',
      title: '手续费率'
    }, {
      field: 'createTime',
      title: '闪兑时间',
      type: 'datetime'
    }];
    return this.buildDetail({
      fields,
      code: this.code,
      view: true,
      detailCode: '802933'
    });
  }
}

export default SdRecordDetail;
