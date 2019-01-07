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
} from '@redux/biz/financial/repaymentPlan';
import {listWrapper} from 'common/js/build-list';
import {
    moneyFormat,
    showWarnMsg,
    showSucMsg,
    getQueryString
} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.bizRepaymentPlan,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class RepaymentPlan extends React.Component {
    constructor(props) {
        super(props);
        this.productCode = getQueryString('productCode', this.props.location.search);
        this.symbol = getQueryString('symbol', this.props.location.search);
        this.status = getQueryString('status', this.props.location.search);
    }
    render() {
        const fields = [{
            title: '应还本金',
            field: 'principalTotal',
            render: function (v, data) {
                return v ? moneyFormat(v.toString(), '', this.symbol) : '-';
            }
        }, {
            title: '应还利息',
            field: 'interestTotal',
            render: function (v, data) {
                return v ? moneyFormat(v.toString(), '', this.symbol) : '-';
            }
        }, {
            title: '应还本息',
            field: 'amountTotal',
            render: function (v, data) {
                return v ? moneyFormat(v.toString(), '', this.symbol) : '-';
            }
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            key: 'repay_plan_status',
            search: true
        }, {
            title: '已还本金',
            field: 'principalYet',
            render: function (v, data) {
                return v ? moneyFormat(v.toString(), '', this.symbol) : '-';
            }
        }, {
            title: '已还利息',
            field: 'interestYet',
            render: function (v, data) {
                return v ? moneyFormat(v.toString(), '', this.symbol) : '-';
            }
        }, {
            title: '已还本息',
            field: 'amountYet',
            render: function (v, data) {
                return v ? moneyFormat(v.toString(), '', this.symbol) : '-';
            }
        }, {
            title: '还款时间',
            field: 'repayDatetime',
            type: 'datetime'
        }];
        return this.props.buildList({
            fields,
            pageCode: '625540',
            searchParams: {
                productCode: this.productCode
            },
            btnEvent: {
                edit: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                        // } else if (selectedRows[0].status !== '1') {
                        //     showWarnMsg('当前记录不可修改');
                    } else {
                        this.props.history.push(`/biz/applicationList?code=${selectedRowKeys[0]}`);
                    }
                }
            }
        });
    }
}

export default RepaymentPlan;