import React from 'react';
import {Modal} from 'antd';
import {
  cancelFetching,
  clearSearchParam,
  doFetching,
  setBtnList,
  setPagination,
  setSearchData,
  setSearchParam,
  setTableData
} from '@redux/BTC-finance/withdrawWarn/withdrawWarn';
import {listWrapper} from 'common/js/build-list';
import {getUserId, showSucMsg, showWarnMsg} from 'common/js/util';
import fetch from 'common/js/fetch';

let currency = '';

@listWrapper(
    state => ({
      ...state.BTCFinanceWithdrawWarn,
      parentCode: state.menu.subMenuCode
    }),
    {
      setTableData, clearSearchParam, doFetching, setBtnList,
      cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class WithdrawWarn extends React.Component {
  render() {
    const fields = [{
      field: 'name',
      title: '姓名'
    }, {
      field: 'phone',
      title: '手机号'
    }];
    return this.props.buildList({
      fields,
      pageCode: '802895',
      deleteCode: '802891',
      rowKey: 'id',
      btnEvent: {
        multiCheck: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else if (selectedRows[0].status !== '1') {
            showWarnMsg('不是待审核的记录');
          } else {
            this.props.history.push(
                `/BTC-finance/TBunderline/addedit?v=1&isCheck=1&code=${selectedRowKeys[0]}`);
          }
        },
        sp: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else if (selectedRows[0].status !== '3') {
            showWarnMsg('不是可广播的记录');
          } else {
            Modal.confirm({
              okText: '确认',
              cancelText: '取消',
              content: `确定广播？`,
              onOk: () => {
                this.props.doFetching();
                let params = {};
                params.code = selectedRowKeys[0];
                params.approveUser = getUserId();
                this.props.doFetching();
                fetch(802353, params).then(() => {
                  showSucMsg('操作成功');
                  this.props.cancelFetching();
                  setTimeout(() => {
                    this.props.getPageData();
                  }, 1000);
                }).catch(this.props.cancelFetching);
              }
            });
            // this.props.history.push(`/BTC-finance/TBunderline/multiCheck?code=${selectedRowKeys[0]}`);
          }
        }
      }
    });
  }
}

export default WithdrawWarn;
