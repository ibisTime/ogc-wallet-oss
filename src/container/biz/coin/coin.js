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
} from '@redux/biz/coin/coin';
import {listWrapper} from 'common/js/build-list';
import {
    moneyFormat,
    showWarnMsg,
    showSucMsg
} from 'common/js/util';
import {downCoin, upCoin} from 'api/coin';

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
class Coin extends React.Component {
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
            title: '归集阀值',
            field: 'collectStart',
            render: (v, data) => {
                return moneyFormat(v, '', data.symbol);
            }
        }, {
        //     title: '取现手续费',
        //     field: 'withdrawFee',
        //     render: (v, data) => {
        //         return moneyFormat(v, '', data.symbol);
        //     }
        // }, {
            title: '状态',
            field: 'status',
            type: 'select',
            key: 'coin_status',
            search: true
        }, {
            title: '序号',
            field: 'orderNo'
        }, {
            title: '更新时间',
            field: 'updateDatetime',
            type: 'datetime'
        }, {
            field: 'remark',
            title: '备注'
        }];
        return this.props.buildList({
            fields,
            rowKey: 'id',
            pageCode: '802005',
            btnEvent: {
                edit: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    // } else if (selectedRows[0].status !== '1') {
                    //     showWarnMsg('当前记录不可修改');
                    } else {
                        this.props.history.push(`/biz/coin/addedit?code=${selectedRowKeys[0]}`);
                    }
                },
                up: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].status === '0') {
                        showWarnMsg(`${selectedRows[0].symbol}已发布`);
                    } else {
                        Modal.confirm({
                            okText: '确认',
                            cancelText: '取消',
                            content: `确定要发布${selectedRows[0].symbol}？`,
                            onOk: () => {
                                this.props.doFetching();
                                return upCoin({
                                    id: selectedRowKeys[0]
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
                    } else if (selectedRows[0].status !== '0') {
                        showWarnMsg(`${selectedRows[0].symbol}不是可撤下状态`);
                    } else {
                        Modal.confirm({
                            okText: '确认',
                            cancelText: '取消',
                            content: `确定要撤下${selectedRows[0].symbol}？`,
                            onOk: () => {
                                this.props.doFetching();
                                return downCoin({
                                    id: selectedRowKeys[0]
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

export default Coin;
