import React from 'react';
import { Form } from 'antd';
import { getQueryString, moneyFormat } from 'common/js/util';
import DetailUtil from 'common/js/build-detail';
import fetch from 'common/js/fetch';
@Form.create()
class diviAddresAddedit extends DetailUtil {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.accountNumber = getQueryString('accountNumber', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
      title: '用户',
      field: 'nickname'
    }, {
      field: 'loginName',
      title: '手机号/邮箱'
    }, {
      field: 'currency',
      title: '持有币种'
    }, {
      field: 'amount',
      title: '持有币的数量'
    }, {
      field: 'address',
      title: '地址'
    }, {
      field: 'cnyPrice',
      title: '单价(CNY)'
    }, {
      field: 'cnyAssets',
      title: '总价值（CNY）'
    }, {
      field: 'usdAssets',
      title: '折合USD'
    }];
    return this.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      detailCode: 802522
      // beforeSearch: (data) => {
      //   if(data.status) {
      //     var statusList = [];
      //     statusList.push(data.status);
      //     data.statusList = statusList;
      //   }
      //   return data;
      // }
    });
  }
}

export default diviAddresAddedit;
