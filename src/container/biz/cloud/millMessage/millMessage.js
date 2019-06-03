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
} from '@redux/cloud/millMessage/millMessage';
import {listWrapper} from 'common/js/build-list';
import { showWarnMsg } from 'common/js/util';
import {Modal, message, Input} from 'antd';
import fetch from 'common/js/fetch';

const confirm = Modal.confirm;

@listWrapper(
    state => ({
        ...state.cloudMillMessage,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class MillMessage extends React.Component {
    state = {
        visible: false,
        code: '',
        xyCount: null,
        amountVisible: false,
        amountVal: ''
    };
    amountChagne = e => {
        if (/^[\d.]*$/.test(e.target.value)) {
            this.setState({ amountVal: e.target.value });
        }
    }
    render() {
        const { visible, amountVisible, amountVal } = this.state;
        const fields = [{
            field: 'name',
            title: '水滴名称'
        }, {
            field: 'symbol',
            title: '购买币种',
            search: true
        }, {
            field: 'amount',
            title: '每滴币个数'
        }, {
            field: 'daysLimit',
            title: '期限（天）'
        }, {
            field: 'dailyOutput',
            title: '日产能（%）',
            render(v) {
                return (v * 100).toFixed(2);
            }
        }, {
            field: 'stockTotal',
            title: '库存总量'
        }, {
            field: 'stockOut',
            title: '已售总量'
        }, {
            field: 'stockOutFake',
            title: '虚拟已售总量'
        }, {
            field: 'status',
            title: '状态',
            key: 'exchange_symbol_pair_statis',
            type: 'select',
            search: true
        }, {
            field: 'createTime',
            title: '创建时间',
            type: 'datetime'
        }];
        return (
          <div>
              {
                  this.props.buildList({
                      fields,
                      pageCode: 610004,
                      deleteCode: '610001',
                      btnEvent: {
                          showHide: (selectedRowKeys, selectedRows) => {
                              if (!selectedRowKeys.length) {
                                  showWarnMsg('请选择记录');
                              } else if (selectedRowKeys.length > 1) {
                                  showWarnMsg('请选择一条记录');
                              } else {
                                  let sName = selectedRows[0].status === '0' ? '显示' : '隐藏';
                                  confirm({
                                      title: `${sName}交易对`,
                                      content: `是否${sName}该交易对`,
                                      onOk: () => {
                                          let hasMsg = message.loading('');
                                          fetch('610007', {
                                              code: selectedRowKeys[0]
                                          }).then(() => {
                                              hasMsg();
                                              message.success('操作成功', 1, () => {
                                                  this.props.getPageData();
                                              });
                                          }, hasMsg);
                                      },
                                      okText: '确定',
                                      cancelText: '取消'
                                  });
                              }
                          },
                          editKc: (selectedRowKeys) => {
                              if (!selectedRowKeys.length) {
                                  showWarnMsg('请选择记录');
                              } else if (selectedRowKeys.length > 1) {
                                  showWarnMsg('请选择一条记录');
                              } else {
                                  this.setState({
                                      visible: true,
                                      code: selectedRowKeys[0]
                                  });
                              }
                          },
                          editDj: (selectedRowKeys, selectedRows) => {
                              if (!selectedRowKeys.length) {
                                  showWarnMsg('请选择记录');
                              } else if (selectedRowKeys.length > 1) {
                                  showWarnMsg('请选择一条记录');
                              } else {
                                  this.setState({
                                      amountVisible: true,
                                      code: selectedRowKeys[0],
                                      amountVal: selectedRows[0].amount
                                  });
                              }
                          }
                      }
                  })
              }
              <Modal
                title="虚拟已售数量"
                visible={visible}
                okText={'确定'}
                cancelText={'取消'}
                onOk={() => {
                    let hasMsg = message.loading('');
                    fetch('610011', {
                        code: this.state.code,
                        quantity: this.state.xyCount.state.value
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
                    this.setState({
                        visible: false
                    });
                }}
              >
                  <p><label>虚拟已售数量：</label><Input placeholder="请输入虚拟已售数量" ref={(target) => { this.state.xyCount = target; }} style={{ width: '60%' }}/></p>
              </Modal>
              <Modal
                title="每滴币个数"
                visible={amountVisible}
                okText={'确定'}
                cancelText={'取消'}
                onOk={() => {
                    if (!/^\d+(\.\d{1,8})?$/.test(amountVal)) {
                        showWarnMsg('个数最多为8位小数');
                        return;
                    }
                    let hasMsg = message.loading('');
                    fetch('610012', {
                        code: this.state.code,
                        amount: amountVal
                    }).then(() => {
                        hasMsg();
                        message.success('操作成功', 1, () => {
                            this.setState({
                                amountVisible: false
                            });
                            this.props.getPageData();
                        });
                    }, hasMsg);
                }}
                onCancel={() => {
                    this.setState({
                        amountVisible: false
                    });
                }}
              >
                  <p><label>每滴币个数：</label><Input placeholder="请输入每滴币个数" value={amountVal} onChange={this.amountChagne} style={{ width: '60%' }}/></p>
              </Modal>
          </div>
        );
    }
}

export default MillMessage;
