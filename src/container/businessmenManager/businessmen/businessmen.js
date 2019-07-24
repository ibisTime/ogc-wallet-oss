import React from 'react';
import {Modal, message} from 'antd';
import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/businessmenManager/businessmen/businessmen';
import {listWrapper} from 'common/js/build-list';
import {
    showSucMsg,
    showWarnMsg
} from 'common/js/util';
import fetch from 'common/js/fetch';

const confirm = Modal.confirm;

@listWrapper(
    state => ({
        ...state.businessmen,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class businessmen extends React.Component {
    render() {
        const fields = [{
            title: '负责人姓名',
            field: 'name',
            search: true
        }, {
            title: '手机号',
            field: 'mobile'
        }, {
            title: '店铺名',
            field: 'shopName'
        }, {
            title: '状态',
            type: 'select',
            field: 'status',
            key: 'user_status',
            search: true
        }, {
            title: '加入时间',
            type: 'datetime',
            field: 'createDatetime'
        }];
        return this.props.buildList({
            fields,
            pageCode: '610515',
            btnEvent: {
                showHide: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        let sName = selectedRows[0].status === '0' ? '注销' : '恢复';
                        confirm({
                            title: `${sName}店铺`,
                            content: `是否${sName}该店铺`,
                            onOk: () => {
                                let hasMsg = message.loading('');
                                fetch('610502', {
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
                resetLoginPassword: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        confirm({
                            title: `重置登录密码`,
                            content: `是否重置登录密码`,
                            onOk: () => {
                                let hasMsg = message.loading('');
                                fetch('610503', {
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
                resetTradePassword: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        confirm({
                            title: `重置提币密码`,
                            content: `是否重置提币密码`,
                            onOk: () => {
                                let hasMsg = message.loading('');
                                fetch('610504', {
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
                // 账户查询
                accountQuery: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/businessmenManager/businessmen/accountQuery?userId=${selectedRowKeys[0]}`);
                    }
                }
            }
        });
    }
}

export default businessmen;
