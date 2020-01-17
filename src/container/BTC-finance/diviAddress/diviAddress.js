import React from 'react';
import {Modal, Input, message, Select, Form} from 'antd';
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

const {Option} = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
};

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
  isHandleOk = true;
  state = {
    ...this.state,
    visible: false,
    carList: [],
    userIdVal: '',
    symbol: '',
    realTime: '',
    usdtRealTime: '',
    ogcRealTime: '',
    fee: '',
    countIn: '',
    userList: []
  };
  handleOk = () => {
    const {userList} = this.state;
    if(this.isHandleOk) {
      this.isHandleOk = false;
      this.props.form.validateFields((err, values) => {
        if (!err) {
          const hasMsg = message.loading('');
          const { carProductCode } = values;
          fetch('802923', {
            exchangeSymbolPairId: carProductCode.split('|')[0],
            data: userList
          }).then(() => {
            this.isHandleOk = true;
            hasMsg();
            message.success('操作成功', 1.5);
            this.props.getPageData();
            this.setState({
              visible: false
            });
            this.setState({
              userIdVal: '',
              symbol: '',
              realTime: '',
              usdtRealTime: '',
              ogcRealTime: '',
              fee: '',
              countIn: '',
              userList: []
            });
            this.props.form.resetFields();
          }).catch(() => {
            this.isHandleOk = true;
            hasMsg();
          });
        }else {
          this.isHandleOk = true;
        }
      });
    }
  };
  handleCancel = () => {
    this.setState({
      visible: false
    }, () => {
      this.setState({
        userIdVal: '',
        symbol: '',
        realTime: '',
        usdtRealTime: '',
        ogcRealTime: '',
        countIn: '',
        userList: []
      });
      this.props.form.resetFields();
      this.props.getPageData();
    });
  };
  handleChange2 = value => {
    this.props.form.setFieldsValue({
      carProductCode: value
    });
    const {value1} = this.state;
    if(value1 !== '') {
      this.props.form.validateFields((err, values) => {
        const { carProductCode } = values;
        if (!err) {
          fetch('802922', {exchangeSymbolPairId: carProductCode.split('|')[0], countTotal: value1}).then(data => {
            this.setState({
              realTime: 1 + carProductCode.split('|')[1] + '≈' + data.exchangeRate + carProductCode.split('|')[2],
              usdtRealTime: 1 + carProductCode.split('|')[1] + '≈' + data.symbolOutMarket + 'CNY',
              ogcRealTime: 1 + carProductCode.split('|')[2] + '≈' + data.symbolInMarket + 'CNY',
              countIn: parseFloat(data.countIn).toFixed(8) + carProductCode.split('|')[2]
            });
          });
        }
      });
    }
  };
  IptChange = () => {
    if(event.target.value !== '') {
      this.setState({value1: event.target.value}, () => {
        this.getSymbolInfo();
      });
    }
  }
  getSymbolInfo = () => {
    this.props.form.validateFields((err, values) => {
      const { carProductCode } = values;
      const {value1} = this.state;
      if (!err) {
        fetch('802922', {exchangeSymbolPairId: carProductCode.split('|')[0], countTotal: value1}).then(data => {
          this.setState({
            realTime: 1 + carProductCode.split('|')[1] + '≈' + data.exchangeRate + carProductCode.split('|')[2],
            usdtRealTime: 1 + carProductCode.split('|')[1] + '≈' + data.symbolOutMarket + 'CNY',
            ogcRealTime: 1 + carProductCode.split('|')[2] + '≈' + data.symbolInMarket + 'CNY',
            countIn: parseFloat(data.countIn).toFixed(8) + carProductCode.split('|')[2]
          });
        });
      }
    });
  }
  componentDidMount() {
    fetch('802910', {start: 1, limit: 20, status: '1'}).then(data => {
      this.setState({
        carList: data.list
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
        return data.nickname ? data.nickname + '(' + data.loginName + ')' : '';
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
    const {carList, visible, realTime, usdtRealTime, ogcRealTime, countIn} = this.state;
    const {getFieldDecorator} = this.props.form;
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
                      },
                    batchOperation: (selectedRowKeys, selectedRows) => {
                      if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                      }else {
                        let arr = [];
                        for(let i = 0; i < selectedRows.length; i++) {
                          arr.push({
                            userId: selectedRows[i].userId,
                            countTotal: parseFloat(selectedRows[i].amount - selectedRows[i].frozenAmount).toFixed(8),
                            symbol: selectedRows[i].currency
                          });
                        }
                        this.setState({
                          visible: true,
                          userList: arr
                        });
                      }
                    }
                  }
              })
          }
        <Modal
            width={600}
            title="闪兑"
            visible={visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            okText="确定"
            cancelText="取消"
        >
          <Form {...formItemLayout} onSubmit={this.handleOk}>
            <Form.Item label="交易对">
              {getFieldDecorator('carProductCode', {
                rules: [
                  {
                    message: ' '
                  }
                ]
              })(<Select
                  style={{ width: '100%' }}
                  placeholder="请选择"
                  onChange={this.handleChange2}
              >
                {
                  Array.isArray(carList) && carList.map(item => (
                      <Option key={`${item.id}|${item.symbolOut}|${item.symbolIn}`}>{item.symbolOut}-{item.symbolIn}</Option>
                  ))
                }
              </Select>)}
            </Form.Item>
            <Form {...formItemLayout} onSubmit={this.handleOk}>
              <p style={{paddingLeft: '40px'}}>实时汇率：{realTime}</p>
              <p style={{paddingLeft: '40px'}}>币种行情：{usdtRealTime} | {ogcRealTime}</p>
            </Form>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default BTCDiviAddress;
