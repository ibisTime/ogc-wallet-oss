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
} from '@redux/biz/financial/productsApprove';
import {listWrapper} from 'common/js/build-list';
import {
    moneyFormat,
    showWarnMsg,
    showSucMsg,
    getUserName
} from 'common/js/util';
import fetch from 'common/js/fetch';

@listWrapper(
    state => ({
        ...state.bizProductsApprove,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class ProductsApprove extends React.Component {
    render() {
        const fields = [{
            title: '中文名称',
            field: 'name',
            required: true
        }, {
            title: '英文名称',
            field: 'nameEn',
            required: true
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            data: [{
                key: '0',
                value: '下架'
            }, {
                key: '1',
                value: '上架'
            }],
            keyName: 'key',
            valueName: 'value',
            search: true
    }, {
            title: '展示次序',
            field: 'orderNo',
            required: true
        }];
        return this.props.buildList({
            fields,
            pageCode: '625331',
            singleSelect: false,
            btnEvent: {
                detail: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/system/otcTag/detail?id=${selectedRows[0].id}&v=1`);
                    }
                },
                edit: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/system/otcTag/addedit?id=${selectedRows[0].id}`);
                    }
                },
                up: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].status !== '0') {
                        showWarnMsg('不是可以上架的状态');
                    } else {
                        Modal.confirm({
                            okText: '确认',
                            cancelText: '取消',
                            content: `确定上架该标签？`,
                            onOk: () => {
                                this.props.doFetching();
                                return fetch(625322, {
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
                down: (keys, items) => {
                    if (!keys || !keys.length) {
                        showWarnMsg('请选择记录');
                    } else if (keys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (items[0].status !== '1') {
                        showWarnMsg('该标签已下架');
                    } else {
                        Modal.confirm({
                            okText: '确认',
                            cancelText: '取消',
                            content: `确定下架该标签？`,
                            onOk: () => {
                                this.props.doFetching();
                                return fetch(625323, {
                                    id: items[0].id,
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

export default ProductsApprove;
