import React from 'react';
import {Modal, Select, Input} from 'antd';
import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/house/houseUser/houseUser';
import {listWrapper} from 'common/js/build-list';
import {dateTimeFormat, showWarnMsg, showSucMsg} from 'common/js/util';
import {activateUser, setQ, millCancelNode} from 'api/user';
import fetch from 'common/js/fetch';

const levelData = {
    '1': 'L1节点',
    '2': 'L2节点',
    '3': 'L3节点',
    '4': 'L4节点',
    '5': 'L5节点',
    '6': 'L6节点'
};

@listWrapper(
  state => ({
      ...state.houseUser,
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
    render() {
        const fields = [{
            title: '账号',
            render(v, d) {
                return d.user.nickname + '-' + d.user.loginName;
            }
        }, {
            field: 'nodeLevel',
            title: '节点等级',
            type: 'select',
            key: 'user_node_level_fpp',
            search: true,
            render(v, d) {
                if(+d.way === 0) {
                    return levelData[d.nodeLevelAuto.toString()];
                }else {
                    return (d.nodeLevelManual || d.nodeLevelManual === 0) && levelData[d.nodeLevelManual.toString()];
                }
            }
        }, {
            field: 'way',
            title: '节点设置方式',
            key: 'user_node_level_way',
            type: 'select'
        }, {
            field: 'inviteCode',
            title: '邀请码',
            render(v, d) {
                return d.user && d.user.inviteCode;
            }
        }, {
            field: 'userId',
            title: '用户',
            type: 'select',
            pageCode: '805120',
            keyName: 'userId',
            valueName: '{{nickname.DATA}}-{{mobile.DATA}}',
            search: true,
            searchName: 'keyword',
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
            noVisible: true
        }, {
                field: 'status',
                title: '状态',
                type: 'select',
                key: 'user_status',
                render(v, d) {
                    return d.user.status === '0' ? '正常' : (d.user.status === '1' ? '程序锁定' : '人工锁定');
                }
            }, {
                field: 'createDatetime',
                title: '注册时间',
                type: 'date',
                rangedate: ['createDatetimeStart', 'createDatetimeEnd'],
                render: (v, d) => {
                    return d.user && dateTimeFormat(d.user.createDatetime);
                }
            }, {
                field: 'lastLogin',
                title: '最后登录时间',
                type: 'datetime',
                render(v, d) {
                    return d.user && dateTimeFormat(d.user.lastLogin);
                }
            }];
        return (
          <div>
              {
                  this.props.buildList({
                      fields,
                      rowKey: 'id',
                      pageCode: '805353',
                      searchParam: {
                          limit: 20
                      },
                      btnEvent: {
                          // 新增节点用户
                          addNode: () => {
                              this.props.history.push(`/house/houseUser/userNode`);
                          },
                          // 修改节点用户
                          editNode: (selectedRowKeys, selectedRows) => {
                              if (!selectedRowKeys.length) {
                                  showWarnMsg('请选择记录');
                              } else {
                                  this.props.history.push(`/house/houseUser/userNode?userId=${selectedRows[0].userId}&nodeLevel=1&id=${selectedRowKeys[0]}`);
                              }
                          },
                          // 取消节点用户
                          cancelNode: (selectedRowKeys, selectedRows) => {
                              if (!selectedRowKeys.length) {
                                  showWarnMsg('请选择记录');
                              } else if(selectedRows[0].way === '0') {
                                  showWarnMsg('该状态下不能进行该操作');
                              } else {
                                  Modal.confirm({
                                      okText: '确认',
                                      cancelText: '取消',
                                      content: `确定取消此用户的节点身份？`,
                                      onOk: () => {
                                          this.props.doFetching();
                                          return millCancelNode(selectedRows[0].id).then(() => {
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
          </div>
        );
    }
}

export default Customer;
