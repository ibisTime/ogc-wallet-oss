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
} from '@redux/trading/sdRecord/sdRecord';
import {listWrapper} from 'common/js/build-list';
import { showWarnMsg } from 'common/js/util';

@listWrapper(
  state => ({
    ...state.tradingSdRecord,
    parentCode: state.menu.subMenuCode
  }),
  {
    setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class Payment extends React.Component {
  render() {
    const fields = [{
      field: 'symbolOut',
      title: '兑入币种',
      search: true
    }, {
      field: 'symbolIn',
      title: '兑出币种',
      search: true
    }, {
      field: 'countOutTotal',
      title: '总兑出数量'
    }, {
      field: 'countOut',
      title: '实际兑出数量'
    }, {
      field: 'countIn',
      title: '兑入数量'
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
    }];
    return this.props.buildList({
      fields,
      pageCode: 802930,
      btnEvent: {
        detail: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            this.props.history.push(`/trading/sdRecord/detail?code=${selectedRowKeys[0]}`);
          }
        }
      }
    });
  }
}

export default Payment;
