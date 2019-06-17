// erc20地址查询

import React from 'react';
import {
  setTableData,
  setPagination,
  setBtnList,
  setSearchParam,
  clearSearchParam,
  doFetching,
  cancelFetching,
  setSearchData
} from '@redux/BTC-finance/addressQuery';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg } from 'common/js/util';

@listWrapper(
  state => ({
    ...state.addressQuery,
    parentCode: state.menu.subMenuCode
  }),
  { setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData }
)
class AddressQuery extends React.Component {
    render() {
    const fields = [{
      title: '币种',
      field: 'symbol',
      search: true
    }, {
      title: '英文名称',
      field: 'ename'
    }, {
        title: '中文名称',
        field: 'cname'
    }, {
      title: '单位',
      field: 'unit'
    }];
    return this.props.buildList({
      fields,
      rowKey: 'symbol',
      pageCode: 802005,
      buttons: [{
        code: 'userAccount',
        name: '平台账户',
        handler: (rowKeys) => {
          if (!rowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (rowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            this.props.history.push(`/BTC-finance/addressQuery/platformAccount?symbol=${rowKeys[0]}`);
          }
        },
        check: false
      }]
    });
  }
}

export default AddressQuery;
