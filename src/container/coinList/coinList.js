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
} from '@redux/coinList/coinList';
import {listWrapper} from 'common/js/build-list';
import {formatDate, showWarnMsg, getUserName, showSucMsg} from 'common/js/util';
import { Modal } from 'antd';
import fetch from 'common/js/fetch';

@listWrapper(
    state => ({
        ...state.bizCoin,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class coinList extends React.Component {
    render() {
        const fields = [{
            title: '符号',
            field: 'symbol',
            search: true
        }, {
            title: '英文名称',
            field: 'ename'
        }, {
            title: '中文名称',
            field: 'cname'
        }, {
            title: '类型',
            field: 'type',
            type: 'select',
            key: 'coin_type',
            search: true
        }, {
            title: '单位',
            field: 'unit'
        }, {
            title: '取现手续费',
            field: 'withdrawFee'
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            key: 'coin_status',
            search: true
        }, {
            title: '序号',
            field: 'orderNo'
        }];
        return this.props.buildList({
            fields,
            rowKey: 'id',
            pageCode: '802013',
            btnEvent: {
                edit: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/quotation/coinList/edit?symbol=${selectedRows[0].symbol}`);
                    }
                },
                detail: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/quotation/coinList/edit?v=1&symbol=${selectedRows[0].symbol}`);
                    }
                },
                resetSend: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        // updater remark
                        Modal.confirm({
                            okText: '确认',
                            cancelText: '取消',
                            content: '重新发布币种？',
                            onOk: () => {
                                this.props.doFetching();
                                fetch(802003, {id: selectedRows[0].id, updater: getUserName(), remark: '币种发布'}).then(data => {
                                    showSucMsg('操作成功');
                                    this.props.getPageData();
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
                    } else {
                        Modal.confirm({
                            okText: '确认',
                            cancelText: '取消',
                            content: '确定撤下币种？',
                            onOk: () => {
                                this.props.doFetching();
                                fetch(802004, {id: selectedRows[0].id, updater: getUserName(), remark: '币种发布'}).then(data => {
                                    showSucMsg('操作成功');
                                    this.props.getPageData();
                                });
                            }
                        });
                    }
                }
            }
        });
    }
}

export default coinList;
