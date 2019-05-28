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
        xyCount: null
    };
    render() {
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
                return v * 100;
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
                          }
                      }
                  })
              }
              <Modal
                title="虚拟已售数量"
                visible={this.state.visible}
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
          </div>
        );
    }
}

export default MillMessage;
