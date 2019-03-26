import React from 'react';
import {Modal} from 'antd';
import {
  setTableData,
  setPagination,
  setBtnList,
  setSearchParam,
  clearSearchParam,
  doFetching,
  cancelFetching,
  setSearchData
} from '@redux/BTC-finance/diviAddress/diviAddress';
import {listWrapper} from 'common/js/build-list';
import {moneyFormat, getCoinList, dateTimeFormat, showWarnMsg} from 'common/js/util';

@listWrapper(
  state => ({
    ...state.BTCFinanceDiviAddress,
    parentCode: state.menu.subMenuCode
  }),
  {
    setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class BTCDiviAddress extends React.Component {
  render() {
    const fields = [{
      title: '用户',
      field: 'userId',
      type: 'select',
      pageCode: '805120',
      keyName: 'userId',
      valueName: '{{nickname.DATA}}-{{mobile.DATA}}-{{email.DATA}}',
      searchName: 'keyword',
      search: true,
      render: (v, data) => {
        return data.nickname;
      }
    }, {
      field: 'loginName',
      title: '手机号/邮箱'
    }, {
      field: 'currency',
      title: '持有币种',
      type: 'select',
      pageCode: '802005',
      params: {
        status: '0'
      },
      keyName: 'symbol',
      valueName: '{{symbol.DATA}}-{{cname.DATA}}',
      searchName: 'symbol',
      render: (v) => v,
      search: true
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
    return this.props.buildList({
      fields,
      rowKey: 'accountNumber',
      pageCode: '805900'
    });
  }
}

export default BTCDiviAddress;
