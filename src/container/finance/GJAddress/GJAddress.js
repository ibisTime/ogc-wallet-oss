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
} from '@redux/finance/GJAddress/GJAddress';
import {listWrapper} from 'common/js/build-list';
import {
    moneyFormat,
    getCoinList,
    dateTimeFormat,
    showWarnMsg,
    showSucMsg
} from 'common/js/util';
import fetch from 'common/js/fetch';

@listWrapper(
    state => ({
        ...state.financeGJAddress,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class GJAddress extends React.Component {
    render() {
        const fields = [{
            field: 'address',
            title: '地址',
            search: true
        }, {
            field: 'status',
            title: '状态',
            type: 'select',
            data: [{
                'key': '0',
                'value': '启用'
            }, {
                'key': '1',
                'value': '弃用'
            }],
            keyName: 'key',
            valueName: 'value'
        }, {
            title: '创建日期',
            field: 'createDatetime',
            type: 'datetime'
        // }, {
        //     title: '使用次数',
        //     field: 'useCount'
        }];
        return this.props.buildList({
            fields,
            rowKey: 'id',
            pageCode: '802525',
            btnEvent: {
                dele: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].status === '1') {
                        showWarnMsg('已经是无效地址，无需重复弃用');
                    } else {
                        Modal.confirm({
                            okText: '确认',
                            cancelText: '取消',
                            content: `确认弃用地址？`,
                            onOk: () => {
                                this.props.doFetching();
                                fetch(802521, {
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

export default GJAddress;
