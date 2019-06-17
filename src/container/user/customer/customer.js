import React from 'react';
import { Modal, Select, message, Input } from 'antd';
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
import { listWrapper } from 'common/js/build-list';
import { dateTimeFormat, showWarnMsg, showSucMsg, isUndefined } from 'common/js/util';
import { activateUser, setQ } from 'api/user';
import fetch from 'common/js/fetch';

const { Option } = Select;

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
        levelVal: '',
        loginPwd: '',
        levelVisible: false,
        loginPwdVisible: false
    };
    levelChagne = levelVal => {
       this.setState({ levelVal });
    }
    render() {
        const { levelVisible, levelVal, userId, loginPwdVisible, loginPwd } = this.state;
        const fields = [{
            field: 'nickname',
            title: '昵称',
            search: true
        }, {
            field: 'loginName',
            title: '手机号/邮箱',
            search: true
        }, {
            field: 'kind',
            title: '类型',
            type: 'select',
            data: [{
                key: 'C',
                value: 'c端'
            }],
            keyName: 'key',
            valueName: 'value',
            search: true
        }, {
            field: 'userReferee',
            title: '推荐人',
            type: 'select',
            pageCode: '805120',
            keyName: 'userId',
            valueName: '{{nickname.DATA}}-{{mobile.DATA}}',
            searchName: 'keyword',
            search: true,
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
            field: 'inviteCode',
            title: '邀请码'
        }, {
            field: 'status',
            title: '状态',
            type: 'select',
            key: 'user_status',
            search: true
        }, {
            field: 'candyNodeLevel',
            title: '节点等级',
            type: 'select',
            key: 'candy_node_level'
        }, {
            field: 'isRealname',
            title: '是否实名',
            render: (v, data) => {
                return data.realName ? '是' : '否';
            }
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
            field: 'lastLogin',
            title: '最后登录时间',
            type: 'datetime'
        }, {
            field: 'remark',
            title: '备注'
        }];
        return (
            <div>
            {
                this.props.buildList({
                    fields,
                    rowKey: 'userId',
                    pageCode: '805120',
                    singleSelect: false,
                    searchParams: {
                    },
                    btnEvent: {
                        // 代注册
                        register: () => {
                            this.props.history.push(`/user/customer/register`);
                        },
                        // 激活用户
                        active: (selectedRowKeys, selectedRows) => {
                            if (!selectedRowKeys.length) {
                                showWarnMsg('请选择记录');
                            } else {
                                let userIdList = [];
                                for(let i = 0, len = selectedRows.length; i < len; i++) {
                                    if(selectedRows[i].status === '0') {
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
                                for(let i = 0, len = selectedRows.length; i < len; i++) {
                                    if(selectedRows[i].status === '2') {
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
                            } else if(selectedRows[0].nodeLevel) {
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
                            } else if(!selectedRows[0].nodeLevel) {
                                showWarnMsg('该用户还不是节点用户');
                            } else {
                                this.props.history.push(`/user/customer/userNode?userId=${selectedRowKeys[0]}&nodeLevel=1`);
                            }
                        },
                        editLevel: (selectedRowKeys, selectedRows) => {
                            if (!selectedRowKeys.length) {
                                showWarnMsg('请选择记录');
                            } else if (selectedRowKeys.length > 1) {
                                showWarnMsg('请选择一条记录');
                            } else {
                                this.setState({
                                    levelVisible: true,
                                    userId: selectedRows[0].userId,
                                    levelVal: selectedRows[0].candyNodeLevel
                                });
                            }
                        },
                        editLoginPwd: (selectedRowKeys, selectedRows) => {
                            if (!selectedRowKeys.length) {
                                showWarnMsg('请选择记录');
                            } else if (selectedRowKeys.length > 1) {
                                showWarnMsg('请选择一条记录');
                            } else {
                                this.setState({
                                    loginPwdVisible: true,
                                    userId: selectedRows[0].userId
                                });
                            }
                        }
                    }
                })
            }
            <Modal
              title="修改节点等级"
              visible={levelVisible}
              okText={'确定'}
              cancelText={'取消'}
              onOk={() => {
                  if (isUndefined(levelVal)) {
                      showWarnMsg('请选择节点等级');
                      return;
                  }
                  let hasMsg = message.loading('');
                  fetch('805074', {
                      userId: userId,
                      candyNodeLevel: levelVal
                  }).then(() => {
                      hasMsg();
                      message.success('操作成功', 1, () => {
                          this.setState({
                              levelVisible: false
                          });
                          this.props.getPageData();
                      });
                  }, hasMsg);
              }}
              onCancel={() => {
                  this.setState({
                      levelVisible: false
                  });
              }}
            >
                <div>
                    <label>节点等级：</label>
                    <Select placeholder="请选择节点等级" value={levelVal} onChange={this.levelChagne} style={{ width: '60%' }}>
                    {
                        this.props.searchData.candyNodeLevel
                            ? this.props.searchData.candyNodeLevel.map(v => (
                                <Option value={v.dkey} key={v.dkey}>{v.dvalue}</Option>
                            )) : null
                    }
                    </Select>
                </div>
            </Modal>

            <Modal
              title="修改登录密码"
              visible={loginPwdVisible}
              okText={'确定'}
              cancelText={'取消'}
              onOk={() => {
                  if (isUndefined(loginPwd)) {
                      showWarnMsg('请输入登录密码');
                      return;
                  }
                  let hasMsg = message.loading('');
                  fetch('805072', {
                      userId: userId,
                      loginPwd: this.state.loginPwd.state.value
                  }).then(() => {
                      hasMsg();
                      message.success('操作成功', 1, () => {
                          this.setState({
                            loginPwdVisible: false
                          });
                          this.props.getPageData();
                      });
                  }, hasMsg);
              }}
              onCancel={() => {
                  this.setState({
                    loginPwdVisible: false
                  });
              }}
            >
                <div>
                    <label>登录密码：</label>
                    <Input type="password" placeholder="请输入密码" ref={(target) => { this.loginPwd = target; }} style={{ width: '60%' }}/>
                </div>
            </Modal>

            </div>
        );
    }
}

export default Customer;
