import React from 'react';
import {Modal, message, Select, Input, Form} from 'antd';
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
const formItemLayout = {
    labelCol: {
        xs: { span: 4 },
        sm: { span: 4 }
    },
    wrapperCol: {
        xs: { span: 18 },
        sm: { span: 18 }
    }
};

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
    isRefereesFirst = true;
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
        symbolData: [],
        registrationVisible: false,
        changeRefereesVisible: false,
        changeRefereesCode: '',
        refereesData: [],
        changeLoginPwdVisible: false,
        changeLoginPwdCode: '',
        changeTradingPwdVisible: false,
        changeTradingPwdCode: ''
    };
    changeRefereesFilterOption = (input) => {
        if(this.isRefereesFirst) {
            this.isRefereesFirst = false;
            fetch(805120, {
                start: 1,
                limit: 10,
                kind: 'C',
                keyword: input
            }).then(data => {
                let refereesData = [];
                data.list.forEach(item => {
                    refereesData.push({
                        userId: item.userId,
                        nickname: item.nickname,
                        mobile: item.mobile
                    });
                });
                this.setState({
                    refereesData
                }, () => {
                    this.isRefereesFirst = true;
                });
            });
        }
        return false;
    };
    componentDidMount() {
        fetch('802013').then(data => {
            this.setState({
                symbolData: data
            });
        });
        this.changeRefereesFilterOption();
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
    formFn = (code, params, visible) => {
        const hasMsg = message.loading('');
        fetch(code, params).then(() => {
            hasMsg();
            this.props.form.resetFields();
            message.success('操作成功', 1.5);
            this.props.getPageData();
            this.setState({
                [visible]: false
            });
        }, hasMsg).catch(hasMsg);
    };
    registrationHandleOk = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { mobile01, loginPwd01, inviteCode01, nickname01 } = values;
                this.formFn(805042, {
                    mobile: mobile01,
                    loginPwd: loginPwd01,
                    inviteCode: inviteCode01,
                    nickname: nickname01
                }, 'registrationVisible');
            }
        });
    };
    registrationHandleCancel = () => {
        this.setState({
            registrationVisible: false
        });
    };
    changeRefereesHandleOk = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { userReferee01 } = values;
                this.formFn(805071, {
                    userReferee: userReferee01,
                    userId: this.state.changeRefereesCode
                }, 'changeRefereesVisible');
            }
        });
    };
    changeRefereesHandleCancel = () => {
        this.setState({
            changeRefereesVisible: false
        });
    };
    changeLoginPwdHandleOk = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { loginPwd01 } = values;
                this.formFn(805072, {
                    loginPwd: loginPwd01,
                    userId: this.state.changeLoginPwdCode
                }, 'changeLoginPwdVisible');
            }
        });
    };
    changeLoginPwdHandleCancel = () => {
        this.setState({
            changeLoginPwdVisible: false
        });
    };
    changeTradingPwdHandleOk = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { tradePwd01 } = values;
                this.formFn(805073, {
                    tradePwd: tradePwd01,
                    userId: this.state.changeTradingPwdCode
                }, 'changeTradingPwdVisible');
            }
        });
    };
    changeTradingPwdHandleCancel = () => {
        this.setState({
            changeTradingPwdVisible: false
        });
    };
    render() {
        const fields = [{
            field: 'nickname',
            title: '昵称',
            search: true
        }, {
            field: 'mobile',
            title: '手机号',
            search: true
        }, {
            field: 'email',
            title: '邮箱',
            search: true
        }, {
            field: 'inviteCode',
            title: '邀请码'
        }, {
            field: 'userReferee',
            title: '推荐人',
            type: 'select',
            pageCode: '805120',
            keyName: 'userId',
            valueName: '{{nickname.DATA}}-{{mobile.DATA}}',
            searchName: 'keyword',
            search: true,
            params: {
                kind: 'C'
            },
            render: (v, data) => {
                if (data.refereeUser) {
                    let tmpl = data.refereeUser.mobile ? data.refereeUser.mobile : data.refereeUser.email;
                    if (data.refereeUser.kind === 'Q') {
                        let name = data.refereeUser.realName ? data.refereeUser.realName : data.refereeUser.nickname;
                        return name + '(' + tmpl + ')';
                    }
                    return data.refereeUser.nickname + '(' + tmpl + ')';
                }
                return '';
            },
            required: true
        }, {
            field: 'nodeLevel',
            title: '节点等级',
            type: 'select',
            data: [{
                key: '0',
                value: '共营节点（高级）'
            }, {
                key: '1',
                value: '社区节点（中级）'
            }, {
                key: '2',
                value: '区域节点（初级）'
            }],
            keyName: 'key',
            valueName: 'value',
            search: true,
            render: (v, data) => {
                let level;
                if (v === '0') {
                    level = '共营节点（高级）';
                } else if (v === '1') {
                    level = '社区节点（中级）';
                } else if (v === '2') {
                    level = '区域节点（初级）';
                } else {
                    level = '普通用户';
                }
                return level;
            }
        },
            {
                field: 'status',
                title: '状态',
                type: 'select',
                key: 'user_status',
                search: true
            }, {
                field: 'isRealname',
                title: '是否实名',
                render: (v, data) => {
                    return data.realName ? '是' : '否';
                }
            }, {
                field: 'machineOrderNum',
                title: '存活水滴数'
            }, {
                field: 'machineOrder',
                title: '存活水滴数',
                search: true,
                type: 'interval',
                intervalParams: {
                    start: this.machineStart,
                    end: this.machineEnd,
                    reset: this.machineReset
                },
                startEnd: ['machineOrderNumStart', 'machineOrderNumEnd'],
                noVisible: true
            }, {
                field: 'realName',
                title: '真实姓名',
                render: (v, data) => {
                    return data.realName ? data.realName : '-';
                }
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
                field: 'registerType',
                title: '注册方式',
                type: 'select',
                key: 'user_register_type',
                search: true
            }, {
                field: 'lastLogin',
                title: '最后登录时间',
                type: 'datetime'
            }, {
                field: 'remark',
                title: '备注'
            }];
        const {symbol, amountType, direction, userIdList, title, symbolData, refereesData} = this.state;
        const {getFieldDecorator} = this.props.form;
        return (
          <div>
              {
                  this.props.buildList({
                      fields,
                      rowKey: 'userId',
                      pageCode: '805120',
                      singleSelect: false,
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
                          // 代注册
                          registration: () => {
                              this.setState({
                                  registrationVisible: true
                              });
                          },
                          // 修改登录密码
                          changeLoginPwd: (selectedRowKeys) => {
                              if (!selectedRowKeys.length) {
                                  showWarnMsg('请选择记录');
                              } else if (selectedRowKeys.length > 1) {
                                  showWarnMsg('请选择一条记录');
                              } else {
                                  this.setState({
                                      changeLoginPwdVisible: true,
                                      changeLoginPwdCode: selectedRowKeys[0]
                                  });
                              }
                          },
                          // 修改交易密码
                          changeTradingPwd: (selectedRowKeys) => {
                              if (!selectedRowKeys.length) {
                                  showWarnMsg('请选择记录');
                              } else if (selectedRowKeys.length > 1) {
                                  showWarnMsg('请选择一条记录');
                              } else {
                                  this.setState({
                                      changeTradingPwdVisible: true,
                                      changeTradingPwdCode: selectedRowKeys[0]
                                  });
                              }
                          },
                          // 修改推荐人
                          changeReferees: (selectedRowKeys) => {
                              if (!selectedRowKeys.length) {
                                  showWarnMsg('请选择记录');
                              } else if (selectedRowKeys.length > 1) {
                                  showWarnMsg('请选择一条记录');
                              } else {
                                  this.setState({
                                      changeRefereesVisible: true,
                                      changeRefereesCode: selectedRowKeys[0]
                                  });
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
              <Modal
                  title='代注册'
                  width={600}
                  visible={this.state.registrationVisible}
                  onOk={this.registrationHandleOk}
                  onCancel={this.registrationHandleCancel}
                  okText="确定"
                  cancelText="取消"
              >
                  <Form {...formItemLayout} onSubmit={this.registrationHandleOk}>
                      <Form.Item label="手机号">
                          {getFieldDecorator('mobile01', {
                              rules: [
                                  {
                                      required: this.state.registrationVisible,
                                      message: ' '
                                  }
                              ]
                          })(<Input placeholder="请输入手机号"/>)}
                      </Form.Item>
                      <Form.Item label="登录密码">
                          {getFieldDecorator('loginPwd01', {
                              rules: [
                                  {
                                      required: this.state.registrationVisible,
                                      message: ' '
                                  }
                              ]
                          })(<Input placeholder="请输入登录密码"/>)}
                      </Form.Item>
                      <Form.Item label="邀请码">
                          {getFieldDecorator('inviteCode01', {
                              rules: [
                                  {
                                      required: this.state.registrationVisible,
                                      message: ' '
                                  }
                              ]
                          })(<Input placeholder="请输入邀请码"/>)}
                      </Form.Item>
                      <Form.Item label="昵称">
                          {getFieldDecorator('nickname01')(<Input placeholder="请输入昵称"/>)}
                      </Form.Item>
                  </Form>
              </Modal>
              <Modal
                  title='修改推荐人'
                  width={600}
                  visible={this.state.changeRefereesVisible}
                  onOk={this.changeRefereesHandleOk}
                  onCancel={this.changeRefereesHandleCancel}
                  okText="确定"
                  cancelText="取消"
              >
                  <Form {...formItemLayout} onSubmit={this.changeRefereesHandleOk}>
                      <Form.Item label="推荐人">
                          {getFieldDecorator('userReferee01', {
                              rules: [
                                  {
                                      required: this.state.changeRefereesVisible,
                                      message: ' '
                                  }
                              ]
                          })(<Select
                              placeholder="请选择用户"
                              showSearch
                              onSearch={this.changeRefereesFilterOption}
                          >
                              {
                                  refereesData.map(item => (
                                      <Option key={item.userId}>{item.nickname}-{item.mobile}</Option>
                                  ))
                              }
                          </Select>)}
                      </Form.Item>
                  </Form>
              </Modal>
              <Modal
                  title='修改登录密码'
                  width={600}
                  visible={this.state.changeLoginPwdVisible}
                  onOk={this.changeLoginPwdHandleOk}
                  onCancel={this.changeLoginPwdHandleCancel}
                  okText="确定"
                  cancelText="取消"
              >
                  <Form {...formItemLayout} onSubmit={this.changeLoginPwdHandleOk}>
                      <Form.Item label="登录密码">
                          {getFieldDecorator('loginPwd01', {
                              rules: [
                                  {
                                      required: this.state.changeLoginPwdVisible,
                                      message: ' '
                                  }
                              ]
                          })(<Input placeholder="请输入登录密码"/>)}
                      </Form.Item>
                  </Form>
              </Modal>
              <Modal
                  title='修改交易密码'
                  width={600}
                  visible={this.state.changeTradingPwdVisible}
                  onOk={this.changeTradingPwdHandleOk}
                  onCancel={this.changeTradingPwdHandleCancel}
                  okText="确定"
                  cancelText="取消"
              >
                  <Form {...formItemLayout} onSubmit={this.changeTradingPwdHandleOk}>
                      <Form.Item label="交易密码">
                          {getFieldDecorator('tradePwd01', {
                              rules: [
                                  {
                                      required: this.state.changeTradingPwdVisible,
                                      message: ' '
                                  }
                              ]
                          })(<Input placeholder="请输入交易密码"/>)}
                      </Form.Item>
                  </Form>
              </Modal>
          </div>
        );
    }
}

export default Customer;
