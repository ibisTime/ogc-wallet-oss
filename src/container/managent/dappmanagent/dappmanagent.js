import React from 'react';
import {Modal} from 'antd';
import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/managent/dappmanagent';
import {listWrapper} from 'common/js/build-list';
import {
    showSucMsg,
    showWarnMsg,
    getUserName
} from 'common/js/util';
import fetch from 'common/js/fetch';

@listWrapper(
    state => ({
        ...state.DappManagent,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class DappManagent extends React.Component {
    render() {
        const fields = [{
            field: 'category',
            type: 'select',
            search: true,
            key: 'dapp_category',
            title: '应用分类'
        }, {
            field: 'name',
            title: '应用名称',
            search: true
        }, {
            field: 'company',
            title: '应用所属厂商',
            search: true
        }, {
            field: 'desc',
            title: '应用详情描述'
        }, {
            field: 'isTop',
            title: '是否置顶',
            type: 'select',
            data: [{
                'key': '0',
                'value': '是'
            }, {
                'key': '1',
                'value': '否'
            }],
            keyName: 'key',
            valueName: 'value'
        }, {
            field: 'action',
            title: '类型',
            key: 'dopen_app_action',
            type: 'select'
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            data: [{
                'key': '0',
                'value': '隐藏'
            }, {
                'key': '1',
                'value': '显示'
            }],
            keyName: 'key',
            valueName: 'value',
            search: true
        }, {
            field: 'createDatetime',
            title: '创建时间',
            type: 'datetime'
        } ];
        return this.props.buildList({
            fields,
            rowKey: 'id',
            pageCode: '625455',
            deleteCode: '625451',
            btnEvent: {
                gl: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/managent/dapptrategy?code=${selectedRowKeys[0]}&id=${selectedRows[0].id}`);
                    }
                },
                edit: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/managent/dappmanagent/addedit?code=${selectedRowKeys[0]}&id=${selectedRows[0].id}&action=${selectedRows[0].action}`);
                    }
                },
                up: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].status === '1') {
                        showWarnMsg('不是可以选择的状态');
                    } else {
                        Modal.confirm({
                            okText: '确认',
                            cancelText: '取消',
                            content: `确定显示该应用？`,
                            onOk: () => {
                                this.props.doFetching();
                                return fetch(625453, {
                                    id: selectedRows[0].id,
                                    updater: getUserName()
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
                down: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].status !== '1') {
                        showWarnMsg('不是可以选择的状态');
                    } else {
                        Modal.confirm({
                            okText: '确认',
                            cancelText: '取消',
                            content: `确定不显示该应用？`,
                            onOk: () => {
                                this.props.doFetching();
                                return fetch(625453, {
                                    id: selectedRows[0].id,
                                    updater: getUserName()
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
                // 置顶
                zd: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].status === '1') {
                        showWarnMsg('不是可以选择的状态');
                    } else {
                        Modal.confirm({
                            okText: '确认',
                            cancelText: '取消',
                            content: `确定显示该应用？`,
                            onOk: () => {
                                this.props.doFetching();
                                return fetch(625453, {
                                    id: selectedRows[0].id,
                                    updater: getUserName()
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
                nozd: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].status !== '1') {
                        showWarnMsg('不是可以选择的状态');
                    } else {
                        Modal.confirm({
                            okText: '确认',
                            cancelText: '取消',
                            content: `确定不显示该应用？`,
                            onOk: () => {
                                this.props.doFetching();
                                return fetch(625453, {
                                    id: selectedRows[0].id,
                                    updater: getUserName()
                                }).then(() => {
                                    this.props.getPageData();
                                    showSucMsg('操作成功');
                                }).catch(() => {
                                    this.props.cancelFetching();
                                });
                            }
                        });
                    }
                }
            }
        });
    }
}

export default DappManagent;
