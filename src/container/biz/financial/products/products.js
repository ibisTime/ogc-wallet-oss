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
} from '@redux/biz/financial/products';
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
        ...state.bizProducts,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class Products extends React.Component {
    render() {
        const fields = [{
            title: '名称（中文简体）',
            field: 'nameZhCn',
            search: true
        }, {
            title: '币种',
            field: 'symbol',
            type: 'select',
            pageCode: '802005',
            params: {
                status: '0'
            },
            keyName: 'symbol',
            valueName: '{{symbol.DATA}}-{{cname.DATA}}',
            searchName: 'symbol',
            search: true,
            render: (v, data) => v
        }, {
            title: '类型',
            field: 'type',
            type: 'select',
            key: 'product_type',
            search: true
        }, {
            title: '产品期限（天）',
            field: 'limitDays'
        }, {
            title: '预期年化收益率(%)',
            field: 'expectYield',
            render: function(v, data) {
                return v * 100;
            }
        }, {
            title: '总募集金额',
            field: 'amount',
            render: function(v, data) {
                return moneyFormat(v.toString(), '', data.symbol);
            }
        }, {
            title: '可售金额',
            field: 'avilAmount',
            render: function(v, data) {
                return moneyFormat(v.toString(), '', data.symbol);
            }
        }, {
            title: '募集成功金额',
            field: 'successAmount',
            render: function(v, data) {
                return moneyFormat(v.toString(), '', data.symbol);
            }
        }, {
            title: '总份数',
            field: 'totalFen'
        }, {
            title: '限购份数',
            field: 'limitFen'
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            data: [{
                key: '0',
                value: '草稿'
            }, {
                key: '1',
                value: '待审核'
            }, {
                key: '3',
                value: '审核不通过'
            }],
            keyName: 'key',
            valueName: 'value',
            search: true
        }, {
            title: '更新时间',
            field: 'updateDatetime',
            type: 'datetime'
        }, {
            title: '备注',
            field: 'remark'
        }];
        return this.props.buildList({
            fields,
            pageCode: '625510',
            searchParams: {
                statusList: ['0', '1', '3']
            },
            btnEvent: {
                edit: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].status !== '0' && selectedRows[0].status !== '3') {
                        showWarnMsg('不是可修改状态');
                    } else {
                        this.props.history.push(`/bizFinancial/products/addedit?code=${selectedRowKeys[0]}&isEdit=1&coin=${selectedRows[0].symbol}`);
                    }
                },
                detail: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/bizFinancial/products/detail?code=${selectedRowKeys[0]}&v=1`);
                    }
                },
                check: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].status !== '1') {
                        showWarnMsg('不是待确认状态');
                    } else {
                        this.props.history.push(`/bizFinancial/products/detail?v=1&code=${selectedRowKeys[0]}&isCheck=1`);
                    }
                }
            }
        });
    }
}

export default Products;