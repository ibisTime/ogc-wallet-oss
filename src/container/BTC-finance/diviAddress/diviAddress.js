import React from 'react';
import {Modal, message, Input, Select} from 'antd';
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
        return data.nickname ? data.nickname : '-' + '(' + data.loginName ? data.loginName : '-' + ')';
      }
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
        field: 'frozenAmount',
        title: '冻结币数量'
    }, {
      field: 'address',
      title: '地址',
      search: true
    }];
    return (
      <div>
          {
              this.props.buildList({
                  fields,
                  rowKey: 'accountNumber',
                  pageCode: '805900',
                  singleSelect: false,
                  searchParams: {
                    type: 'C'
                  },
                  btnEvent: {
                      today: (selectedRowKeys, selectedRows) => {
                        if (!selectedRowKeys.length) {
                          showWarnMsg('请选择记录');
                        } else if (selectedRowKeys.length > 1) {
                          showWarnMsg('请选择一条记录');
                        } else {
                          this.props.history.push(`/user/customer/ledgerQuery?code=${selectedRows[0].accountNumber}`);
                        }
                      },
                      toHistory: (selectedRowKeys, selectedRows) => {
                        if (!selectedRowKeys.length) {
                          showWarnMsg('请选择记录');
                        } else if (selectedRowKeys.length > 1) {
                          showWarnMsg('请选择一条记录');
                        } else {
                          this.props.history.push(`/user/customer/ledgerQueryHistory?code=${selectedRows[0].accountNumber}`);
                        }
                      },
                      // 购买
                      flowQuery: (selectedRowKeys, selectedRows) => {
                          if (!selectedRowKeys.length) {
                              showWarnMsg('请选择记录');
                          } else if (selectedRowKeys.length > 1) {
                              showWarnMsg('请选择一条记录');
                          } else {
                              this.props.history.push(`/BTC-finance/diviAddress/flow?&code=${selectedRowKeys[0]}`);
                          }
                      },
                      // // 详情
                      detail: (selectedRowKeys, selectedRows) => {
                          if (!selectedRowKeys.length) {
                              showWarnMsg('请选择记录');
                          } else if (selectedRowKeys.length > 1) {
                              showWarnMsg('请选择一条记录');
                          } else {
                              this.props.history.push(`/BTC-finance/diviAddress/addedit?v=1&code=${selectedRowKeys[0]}&accountNumber=${selectedRows[0].accountNumber}`);
                          }
                      },
                      qkflow: (selectedRowKeys, selectedRows) => {
                          if (!selectedRowKeys.length) {
                              showWarnMsg('请选择记录');
                          } else if (selectedRowKeys.length > 1) {
                              showWarnMsg('请选择一条记录');
                          } else if (selectedRows[0].currency === 'BTC') {
                              // 测试：https://testnet.blockexplorer.com/address/
                              // 正式：https://blockexplorer.com/address/
                              window.open('https://testnet.blockexplorer.com/address/' + selectedRows[0].address, '_bank');
                          } else if (selectedRows[0].currency === 'USDT') {
                              window.open('https://omniexplorer.info/address/' + selectedRows[0].address, '_bank');
                          }
                      },
                      // 账户查询
                      accountQuery: (selectedRowKeys, selectedRows) => {
                        if (!selectedRowKeys.length) {
                          showWarnMsg('请选择记录');
                        } else if (selectedRowKeys.length > 1) {
                          showWarnMsg('请选择一条记录');
                        } else {
                          this.props.history.push(`/user/channelDealer/accountQuery?isCDealer=1&userId=${selectedRows[0].userId}&isAct=1`);
                        }
                      }
                  }
              })
          }
      </div>
    );
  }
}

export default BTCDiviAddress;
