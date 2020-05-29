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
        xs: { span: 24 },
        sm: { span: 6 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
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
        levelVisible: false,
        seleUserId: '',
        levelList: []
    };
    isHandleOk = true;
    componentDidMount() {
        fetch('802013').then(data => {
            this.setState({
                symbolData: data
            });
        });
        fetch('625815').then(data => {
            const levelList = data.map(item => ({
                code: item.code,
                level: item.level,
                name: `L${item.level}-${item.name}`
            }));
            this.setState({
                levelList
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
    handleLevelOk = () => {
        if(this.isHandleOk) {
            this.isHandleOk = false;
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    const hasMsg = message.loading('');
                    const { level01 } = values;
                    fetch('625811', {
                        level: level01,
                        userId: this.state.seleUserId
                    }).then(() => {
                        this.isHandleOk = true;
                        hasMsg();
                        message.success('操作成功', 1.5);
                        this.props.getPageData();
                        this.props.form.resetFields();
                        this.setState({
                            levelVisible: false
                        });
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
    handleLevelCancel = () => {
        this.setState({
            levelVisible: false
        });
    };
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
                return data.nickname + '(' + data.loginName + ')';
            },
            noVisible: true
        }, {
            field: 'nickname',
            title: '昵称',
            render: (v, data) => {
                return `${v}(${data.loginName})`;
            }
        }, {
            field: 'level',
            title: '用户等级',
            type: 'select',
            listCode: '625815',
            keyName: 'level',
            valueName: 'L{{level.DATA}}-{{name.DATA}}',
            render(v, d) {
                return v && `L${v}`;
            }
        }, {
            field: 'inviteCode',
            title: '邀请码'
        }, {
            field: 'mobile',
            title: '手机号',
            noVisible: true,
            search: true
        }, {
            field: 'userReferee',
            title: '推荐人',
            type: 'select',
            pageCode: '805120',
            keyName: 'userId',
            valueName: '{{nickname.DATA}}-{{email.DATA}}-{{mobile.DATA}}',
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
            field: 'activeCode',
            title: '激活码'
        }, {
            field: 'userActive',
            title: '激活人',
            type: 'select',
            pageCode: '805120',
            keyName: 'userId',
            valueName: '{{nickname.DATA}}-{{email.DATA}}-{{mobile.DATA}}',
            searchName: 'keyword',
            search: true,
            render: (v, data) => {
                if (data.activeUser) {
                    let tmpl = data.activeUser.mobile ? data.activeUser.mobile : data.activeUser.email;
                    if (data.activeUser.kind === 'Q') {
                        let name = data.activeUser.realName ? data.activeUser.realName : data.activeUser.nickname;
                        return name + '(' + tmpl + ')';
                    }
                    return (data.activeUser.nickname ? data.activeUser.nickname : '暂无数据') + '(' + tmpl + ')';
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
        const {symbol, amountType, direction, userIdList, title, symbolData, levelList} = this.state;
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
                          },
                          editLevel: (selectedRowKeys, selectedRows) => {
                              if (!selectedRowKeys.length) {
                                  showWarnMsg('请选择记录');
                              } else if (selectedRowKeys.length > 1) {
                                  showWarnMsg('请选择一条记录');
                              } else {
                                  this.props.form.setFieldsValue({
                                      level01: selectedRows[0].level
                                  });
                                  this.setState({
                                      levelVisible: true,
                                      seleUserId: selectedRowKeys[0]
                                  });
                              }
                          },
                          import: () => {
                              this.props.history.push('/user/customer/importUser');
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
                  width={600}
                  title="修改用户等级"
                  visible={this.state.levelVisible}
                  onOk={this.handleLevelOk}
                  onCancel={this.handleLevelCancel}
                  okText="确定"
                  cancelText="取消"
              >
                  <Form {...formItemLayout} onSubmit={this.handleLevelOk}>
                      <Form.Item label="选择等级">
                          {getFieldDecorator('level01', {
                              rules: [
                                  {
                                      required: true,
                                      message: ' '
                                  }
                              ]
                          })(<Select
                              style={{ width: '100%' }}
                              placeholder="请选择"
                          >
                              {
                                  Array.isArray(levelList) && levelList.map(item => (
                                      <Option key={item.level}>{item.name}</Option>
                                  ))
                              }
                          </Select>)}
                      </Form.Item>
                  </Form>
              </Modal>
          </div>
        );
    }
}

export default Customer;
