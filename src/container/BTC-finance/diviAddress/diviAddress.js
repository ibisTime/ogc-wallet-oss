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
import fetch from 'common/js/fetch';

const { Option } = Select;
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
  state = {
      ...this.state,
      visible: false,
      symbol: '',
      amountType: '',
      direction: '',
      refAmount: '',
      userId: '',
      accountNumber: '',
      symbolList: []
  };
    symbolSelect = (val) => {
      this.setState({
          symbol: val
      });
    };
    componentDidMount() {
        fetch(802013).then(data => {
          this.setState({
              symbolList: data
          });
        });
    }
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
      title: '地址',
      search: true
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
    const {symbolList, symbol, amountType, refAmount, direction, userId, accountNumber} = this.state;
    return (
      <div>
          {
              this.props.buildList({
                  fields,
                  rowKey: 'accountNumber',
                  pageCode: '805900',
                  btnEvent: {
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
                      ktOption: (selectedRowKeys, selectedRows) => {
                          if (!selectedRowKeys.length) {
                              showWarnMsg('请选择记录');
                          } else if (selectedRowKeys.length > 1) {
                              showWarnMsg('请选择一条记录');
                          } else {
                              this.setState({
                                  visible: true,
                                  amountType: '0',
                                  direction: '0',
                                  userId: selectedRows[0].userId,
                                  accountNumber: selectedRows[0].accountNumber
                              });
                          }
                      },
                      jqOption: (selectedRowKeys, selectedRows) => {
                          if (!selectedRowKeys.length) {
                              showWarnMsg('请选择记录');
                          } else if (selectedRowKeys.length > 1) {
                              showWarnMsg('请选择一条记录');
                          } else {
                              this.setState({
                                  visible: true,
                                  amountType: '0',
                                  direction: '1',
                                  userId: selectedRows[0].userId,
                                  accountNumber: selectedRows[0].accountNumber
                              });
                          }
                      },
                      scOption: (selectedRowKeys, selectedRows) => {
                          if (!selectedRowKeys.length) {
                              showWarnMsg('请选择记录');
                          } else if (selectedRowKeys.length > 1) {
                              showWarnMsg('请选择一条记录');
                          } else {
                              this.setState({
                                  visible: true,
                                  amountType: '1',
                                  direction: '0',
                                  userId: selectedRows[0].userId,
                                  accountNumber: selectedRows[0].accountNumber
                              });
                          }
                      },
                      sfOption: (selectedRowKeys, selectedRows) => {
                          if (!selectedRowKeys.length) {
                              showWarnMsg('请选择记录');
                          } else if (selectedRowKeys.length > 1) {
                              showWarnMsg('请选择一条记录');
                          } else {
                              this.setState({
                                  visible: true,
                                  amountType: '1',
                                  direction: '1',
                                  userId: selectedRows[0].userId,
                                  accountNumber: selectedRows[0].accountNumber
                              });
                          }
                      }
                  }
              })
          }
          <Modal
            title="账户操作"
            visible={this.state.visible}
            okText={'确定'}
            cancelText={'取消'}
            onOk={() => {
                let amount = refAmount.state && refAmount.state.value;
                if(!symbol || !amount) {
                  message.warning('请填写完整', 1.5);
                  return;
                }
                let hasMsg = message.loading('');
                fetch('802310', {
                    symbol,
                    amountType: amountType,
                    amount,
                    direction,
                    userId,
                    accountNumber
                }).then(() => {
                    hasMsg();
                    message.success('操作成功', 1, () => {
                        this.setState({
                            visible: false
                        });
                        this.props.getPageData();
                    });
                }, hasMsg);
            }}
            onCancel={() => {
                refAmount.state.value = '';
                this.setState({
                    visible: false,
                    symbol: ''
                });
            }}
          >
              <div style={{marginBottom: '20px'}}>
                  <label style={{width: '100px', display: 'inline-block', textAlign: 'right'}}>币种：</label>
                  <Select
                    placeholder="请选择币种"
                    style={{ width: '60%' }}
                    onChange={this.symbolSelect}
                    value={symbol}
                  >
                      {
                        symbolList.length > 0 && symbolList.map(item => (
                          <Option value={item.symbol} key={item.id}>{item.symbol}</Option>
                        ))
                      }
                  </Select>
              </div>
              <div>
                  <label style={{width: '100px', display: 'inline-block', textAlign: 'right'}}>虚拟已售数量：</label>
                  <Input
                    placeholder="请输入虚拟已售数量"
                    ref={(target) => { this.state.refAmount = target; }}
                    style={{ width: '60%' }}
                  />
              </div>
          </Modal>
      </div>
    );
  }
}

export default BTCDiviAddress;
