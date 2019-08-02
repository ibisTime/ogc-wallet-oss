import React from 'react';
import {Modal, message, Select} from 'antd';
import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/managent/alerts';
import {listWrapper} from 'common/js/build-list';
import {
    showSucMsg,
    showWarnMsg,
    getUserName
} from 'common/js/util';
import fetch from 'common/js/fetch';

const {Option} = Select;

@listWrapper(
    state => ({
        ...state.Alerts,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class Alerts extends React.Component {
    state = {
      ...this.state,
        isTop: '',
        selectedCode: '',
        visible: false
    };
    changeSymbol = (v) => {
        this.setState({
            isTop: v
        });
    };
    render() {
        const fields = [{
            field: 'content',
            title: '标题',
            render(v) {
                if(v) {
                    const f = v.indexOf('】');
                    const l = v.indexOf('【');
                    if(f !== -1 && l !== -1) {
                        return v.substring(l + 1, f - 1);
                    }else {
                        if(v.length > 15) {
                            return v.substring(0, 15) + '...';
                        }else {
                            return v;
                        }
                    }
                }
            }
        }, {
            title: '来源',
            field: 'source',
            type: 'select',
            key: 'flash_source',
            search: true
        }, {
            field: 'isTop',
            title: '是否置顶',
            type: 'select',
            search: true,
            data: [{
                key: '1',
                value: '是'
            }, {
                key: '0',
                value: '否'
            }],
            keyName: 'key',
            valueName: 'value'
        }, {
            field: 'status',
            title: '状态',
            type: 'select',
            search: true,
            key: 'flash_status'
        }, {
            field: 'updaterName',
            title: '最近修改人'
        }, {
            field: 'updateDatetime',
            title: '最近修改时间',
            type: 'datetime'
        }, {
            field: 'showDatetime',
            title: '发布时间',
            type: 'datetime',
            rangedate: ['showDatetimeStart', 'showDatetimeEnd'],
            search: true
        }];
        return <div>
            {
                this.props.buildList({
                    fields,
                    rowKey: 'id',
                    pageCode: '628095',
                    searchParams: {
                        type: '0'
                    },
                    btnEvent: {
                        up: (selectedRowKeys, selectedRows) => {
                            if (!selectedRowKeys.length) {
                                showWarnMsg('请选择记录');
                            } else if (selectedRowKeys.length > 1) {
                                showWarnMsg('请选择一条记录');
                            } else if (selectedRows[0].status === '1') {
                                showWarnMsg('已经是上架的状态');
                            } else {
                                this.setState({
                                    visible: true,
                                    selectedCode: selectedRows[0].id
                                });
                            }
                        },
                        down: (selectedRowKeys, selectedRows) => {
                            if (!selectedRowKeys.length) {
                                showWarnMsg('请选择记录');
                            } else if (selectedRowKeys.length > 1) {
                                showWarnMsg('请选择一条记录');
                            } else if (selectedRows[0].status !== '1') {
                                showWarnMsg('该状态不能进行该操作');
                            } else {
                                Modal.confirm({
                                    okText: '确认',
                                    cancelText: '取消',
                                    content: `确定下架？`,
                                    onOk: () => {
                                        this.props.doFetching();
                                        return fetch(628093, {
                                            id: selectedRows[0].id
                                        }).then(() => {
                                            this.props.getPageData();
                                            showSucMsg('操作成功');
                                        }).catch(() => {
                                            this.props.cancelFetching();
                                        });
                                    }
                                });
                            }
                        },
                        edit: (selectedRowKeys, selectedRows) => {
                            if (!selectedRowKeys.length) {
                                showWarnMsg('请选择记录');
                            } else if (selectedRowKeys.length > 1) {
                                showWarnMsg('请选择一条记录');
                            } else if (selectedRows[0].status === '1') {
                                showWarnMsg('该状态不能进行修改操作');
                            } else {
                                this.props.history.push(`/managent/alerts/addedit?code=${selectedRows[0].id}`);
                            }
                        }
                    }
                })
            }
            <Modal
              title={`上架`}
              visible={this.state.visible}
              okText={'确定'}
              cancelText={'取消'}
              onOk={() => {
                  if (!this.state.isTop && this.state.isTop !== 0) {
                      message.warning('请选择', 1.5);
                      return;
                  }
                  this.props.doFetching();
                  return fetch(628092, {
                      id: this.state.selectedCode,
                      isTop: this.state.isTop,
                      type: '0'
                  }).then(() => {
                      this.props.getPageData();
                      showSucMsg('操作成功');
                      this.setState({
                          visible: false
                      });
                  }).catch(() => {
                      this.props.cancelFetching();
                      this.setState({
                          visible: false
                      });
                  });
              }}
              onCancel={() => {
                  this.setState({
                      isTop: '',
                      visible: false
                  });
              }}
            >
                <div style={{marginBottom: '20px'}}>
                    <label style={{width: '100px', display: 'inline-block', textAlign: 'right'}}>是否置顶：</label>
                    <Select style={{width: '60%'}} placeholder="请选择" value={this.state.isTop} onChange={this.changeSymbol}>
                        <Option value={1}>是</Option>
                        <Option value={0}>否</Option>
                    </Select>
                </div>
            </Modal>
        </div>;
    }
}

export default Alerts;
