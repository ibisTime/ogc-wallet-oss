import React from 'react';
import {Modal, message, Select, Input} from 'antd';
import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/user/customer/customer';
import {listWrapper} from 'common/js/build-list';
import {dateTimeFormat, showWarnMsg, showSucMsg} from 'common/js/util';
import {activateUser, setQ, cancelNode} from 'api/user';
import fetch from 'common/js/fetch';

const {Option} = Select;

@listWrapper(
  state => ({
      ...state.userCustomer,
      parentCode: state.menu.subMenuCode
  }),
  {
      setTableData, clearSearchParam, doFetching, setBtnList,
      cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class Customer extends React.Component {
    state = {
        ...this.state,
        visible: false,
        symbol: null,
        amountType: '',
        direction: '',
        refAmount: '',
        userIdList: '',
        accountNumber: '',
        title: '',
        machineOrderNumStart: sessionStorage.getItem('machineOrderNumStart') || '',
        machineOrderNumEnd: sessionStorage.getItem('machineOrderNumEnd') || '',
        symbolData: []
    };
    componentDidMount() {
        fetch('802013').then(data => {
            this.setState({
                symbolData: data
            });
        });
    }
    machineStart = (target) => {
        this.setState({
            machineOrderNumStart: target.target.value
        });
        sessionStorage.setItem('machineOrderNumStart', target.target.value);
    };
    machineEnd = (target) => {
        this.setState({
            machineOrderNumEnd: target.target.value
        });
        sessionStorage.setItem('machineOrderNumEnd', target.target.value);
    };
    machineReset = () => {
        this.setState({
            machineOrderNumStart: '',
            machineOrderNumEnd: ''
        });
    };
    changeSymbol = (value) => {
        this.setState({
            symbol: value
        });
    };
    render() {
        const fields = [{
            field: 'nickname',
            title: '昵称',
            search: true,
            render: (v, data) => {
                return `${v}(${data.email})`;
            }
        }, {
            field: 'inviteCode',
            title: '邀请码'
        }, {
            field: 'userReferee',
            title: '推荐人',
            type: 'select',
            pageCode: '805120',
            keyName: 'userId',
            valueName: '{{nickname.DATA}}-{{email.DATA}}',
            searchName: 'keyword',
            search: true,
            render: (v, data) => {
                if (data.refereeUser) {
                    let tmpl = data.refereeUser.mobile ? data.refereeUser.mobile : data.refereeUser.email;
                    if (data.refereeUser.kind === 'Q') {
                        let name = data.refereeUser.realName ? data.refereeUser.realName : data.refereeUser.nickname;
                        return name + '(' + tmpl + ')';
                    }
                    return (data.refereeUser.nickname ? data.refereeUser.nickname : '暂无数据') + '(' + tmpl + ')';
                }
                return '';
            },
            required: true
        }, {
                field: 'status',
                title: '状态',
                type: 'select',
                key: 'user_status',
                search: true
            }, {
                //     field: 'tradeRate',
                //     title: '广告费率'
                // }, {
                field: 'createDatetime',
                title: '注册时间',
                type: 'date',
                rangedate: ['createDatetimeStart', 'createDatetimeEnd'],
                render: dateTimeFormat,
                search: true
            }, {
                field: 'lastLogin',
                title: '最后登录时间',
                type: 'datetime'
            }, {
                field: 'remark',
                title: '备注'
            }];
        const {symbol, amountType, direction, userIdList, title, symbolData} = this.state;
        return (
          <div>
              {
                  this.props.buildList({
                      fields,
                      rowKey: 'userId',
                      pageCode: '805120',
                      singleSelect: false,
                      searchParam: {
                          limit: 20
                      },
                      btnEvent: {
                          active: (selectedRowKeys, selectedRows) => {
                              if (!selectedRowKeys.length) {
                                  showWarnMsg('请选择记录');
                              } else {
                                  let userIdList = [];
                                  for (let i = 0, len = selectedRows.length; i < len; i++) {
                                      if (selectedRows[i].status === '0') {
                                          showWarnMsg(selectedRows[i].nickname + '用户已是正常状态');
                                          userIdList = [];
                                          return;
                                      }
                                      userIdList.push(selectedRows[i].userId);
                                  }
                                  if (userIdList.length > 0) {
                                      Modal.confirm({
                                          okText: '确认',
                                          cancelText: '取消',
                                          content: `确定允许用户登录？`,
                                          onOk: () => {
                                              this.props.doFetching();
                                              return activateUser(userIdList).then(() => {
                                                  this.props.getPageData();
                                                  showSucMsg('操作成功');
                                              }).catch(() => {
                                                  this.props.cancelFetching();
                                              });
                                          }
                                      });
                                  }
                              }
                          },
                          rock: (selectedRowKeys, selectedRows) => {
                              if (!selectedRowKeys.length) {
                                  showWarnMsg('请选择记录');
                              } else {
                                  let userIdList = [];
                                  for (let i = 0, len = selectedRows.length; i < len; i++) {
                                      if (selectedRows[i].status === '2') {
                                          showWarnMsg(selectedRows[i].nickname + '用户已禁止登录');
                                          userIdList = [];
                                          return;
                                      }
                                      userIdList.push(selectedRows[i].userId);
                                  }
                                  if (userIdList.length > 0) {
                                      Modal.confirm({
                                          okText: '确认',
                                          cancelText: '取消',
                                          content: `确定禁止用户登录？`,
                                          onOk: () => {
                                              this.props.doFetching();
                                              return activateUser(userIdList).then(() => {
                                                  this.props.getPageData();
                                                  showSucMsg('操作成功');
                                              }).catch(() => {
                                                  this.props.cancelFetching();
                                              });
                                          }
                                      });
                                  }
                              }
                          },
                          // 修改广告费率
                          editAdvertisementFee: (selectedRowKeys, selectedRows) => {
                              if (!selectedRowKeys.length) {
                                  showWarnMsg('请选择记录');
                              } else if (selectedRowKeys.length > 1) {
                                  showWarnMsg('请选择一条记录');
                              } else {
                                  this.props.history.push(`/user/customer/editAdvertisementFee?code=${selectedRowKeys[0]}`);
                              }
                          },
                          // 账户查询
                          accountQuery: (selectedRowKeys, selectedRows) => {
                              if (!selectedRowKeys.length) {
                                  showWarnMsg('请选择记录');
                              } else if (selectedRowKeys.length > 1) {
                                  showWarnMsg('请选择一条记录');
                              } else {
                                  this.props.history.push(`/user/customer/accountQuery?userId=${selectedRowKeys[0]}`);
                              }
                          },
                          // 新增节点用户
                          addNode: (selectedRowKeys, selectedRows) => {
                              if (!selectedRowKeys.length) {
                                  showWarnMsg('请选择记录');
                              } else if (selectedRowKeys.length > 1) {
                                  showWarnMsg('请选择一条记录');
                              } else if (selectedRows[0].nodeLevel) {
                                  showWarnMsg('该用户已是节点用户');
                              } else {
                                  this.props.history.push(`/user/customer/userNode?userId=${selectedRowKeys[0]}`);
                              }
                          },
                          // 修改节点用户
                          editNode: (selectedRowKeys, selectedRows) => {
                              if (!selectedRowKeys.length) {
                                  showWarnMsg('请选择记录');
                              } else if (selectedRowKeys.length > 1) {
                                  showWarnMsg('请选择一条记录');
                              } else if (!selectedRows[0].nodeLevel) {
                                  showWarnMsg('该用户还不是节点用户');
                              } else {
                                  this.props.history.push(`/user/customer/userNode?userId=${selectedRowKeys[0]}&nodeLevel=1`);
                              }
                          },
                          // 取消节点用户
                          cancelNode: (selectedRowKeys, selectedRows) => {
                              if (!selectedRowKeys.length) {
                                  showWarnMsg('请选择记录');
                              } else if (selectedRowKeys.length > 1) {
                                  showWarnMsg('请选择一条记录');
                              } else if (!selectedRows[0].nodeLevel) {
                                  showWarnMsg('该用户不是节点用户，无需取消');
                              } else {
                                  Modal.confirm({
                                      okText: '确认',
                                      cancelText: '取消',
                                      content: `确定取消此用户的节点身份？`,
                                      onOk: () => {
                                          this.props.doFetching();
                                          return cancelNode(selectedRows[0].userId).then(() => {
                                              this.props.getPageData();
                                              showSucMsg('操作成功');
                                          }).catch(() => {
                                              this.props.cancelFetching();
                                          });
                                      }
                                  });
                              }
                          },
                          // 空投
                          ktOption: (selectedRowKeys, selectedRows) => {
                              if (!selectedRowKeys.length) {
                                  showWarnMsg('请选择记录');
                              } else {
                                  let list = selectedRows.map(item => item.userId);
                                  this.setState({
                                      title: '空投',
                                      visible: true,
                                      amountType: '0',
                                      direction: '1',
                                      userIdList: list
                                  });
                              }
                          },
                          // 减钱
                          jqOption: (selectedRowKeys, selectedRows) => {
                              if (!selectedRowKeys.length) {
                                  showWarnMsg('请选择记录');
                              } else {
                                  let list = selectedRows.map(item => item.userId);
                                  this.setState({
                                      title: '减钱',
                                      visible: true,
                                      amountType: '0',
                                      direction: '0',
                                      userIdList: list
                                  });
                              }
                          },
                          // 锁仓
                          scOption: (selectedRowKeys, selectedRows) => {
                              if (!selectedRowKeys.length) {
                                  showWarnMsg('请选择记录');
                              } else {
                                  let list = selectedRows.map(item => item.userId);
                                  this.setState({
                                      title: '锁仓',
                                      visible: true,
                                      amountType: '1',
                                      direction: '1',
                                      userIdList: list
                                  });
                              }
                          },
                          // 释放
                          sfOption: (selectedRowKeys, selectedRows) => {
                              if (!selectedRowKeys.length) {
                                  showWarnMsg('请选择记录');
                              } else {
                                  let list = selectedRows.map(item => item.userId);
                                  this.setState({
                                      title: '释放',
                                      visible: true,
                                      amountType: '1',
                                      direction: '0',
                                      userIdList: list
                                  });
                              }
                          },
                          // 实名设置
                          editIdentify: (selectedRowKeys, selectedRows) => {
                              if (!selectedRowKeys.length) {
                                  showWarnMsg('请选择记录');
                              } else if (selectedRowKeys.length > 1) {
                                  showWarnMsg('请选择一条记录');
                              } else {
                                  this.props.history.push(`/user/customer/identify?userId=${selectedRowKeys[0]}`);
                              }
                          },
                          // 修改推荐人
                          editUserReferee: (selectedRowKeys, selectedRows) => {
                              if (!selectedRowKeys.length) {
                                  showWarnMsg('请选择记录');
                              } else if (selectedRowKeys.length > 1) {
                                  showWarnMsg('请选择一条记录');
                              } else {
                                  this.props.history.push(`/user/customer/referee?userId=${selectedRowKeys[0]}`);
                              }
                          }
                      },
                      beforeSearch: (params) => {
                          const {machineOrderNumStart, machineOrderNumEnd} = this.state;
                          if (machineOrderNumStart) {
                              params.machineOrderNumStart = machineOrderNumStart;
                              sessionStorage.setItem('machineOrderNumStart', machineOrderNumStart);
                          }
                          if (machineOrderNumEnd) {
                              params.machineOrderNumEnd = machineOrderNumEnd;
                              sessionStorage.setItem('machineOrderNumEnd', machineOrderNumEnd);
                          }
                          return params;
                      }
                  })
              }
              <Modal
                title={`账户操作(${title})`}
                visible={this.state.visible}
                okText={'确定'}
                cancelText={'取消'}
                onOk={() => {
                    let amount = this.refAmount.state && this.refAmount.state.value;
                    if (!amount || !symbol) {
                        message.warning('请填写完整', 1.5);
                        return;
                    }
                    let hasMsg = message.loading('');
                    fetch('802310', {
                        symbol,
                        amountType: amountType,
                        amount,
                        direction,
                        userIdList
                    }).then(() => {
                        hasMsg();
                        message.success('操作成功', 1, () => {
                            this.setState({
                                visible: false,
                                symbol: null
                            });
                            this.refAmount.state.value = '';
                            this.props.getPageData();
                        });
                    }, hasMsg);
                }}
                onCancel={() => {
                    if (this.refAmount.state) {
                        this.refAmount.state.value = '';
                    }
                    this.setState({
                        visible: false,
                        symbol: null
                    });
                }}
              >
                  <div style={{marginBottom: '20px'}}>
                      <label style={{width: '100px', display: 'inline-block', textAlign: 'right'}}>币种：</label>
                      <Select style={{width: '60%'}} placeholder="请选择币种" value={symbol} onChange={this.changeSymbol}>
                          {
                              symbolData.map(item => (
                                <Option value={item.symbol} key={item.id}>{item.symbol}</Option>
                              ))
                          }
                      </Select>
                  </div>
                  <div>
                      <label style={{width: '100px', display: 'inline-block', textAlign: 'right'}}>数量：</label>
                      <Input
                        placeholder="请输入数量"
                        type="number"
                        ref={(target) => {
                            this.refAmount = target;
                        }}
                        style={{width: '60%'}}
                      />
                  </div>
              </Modal>
          </div>
        );
    }
}

export default Customer;
