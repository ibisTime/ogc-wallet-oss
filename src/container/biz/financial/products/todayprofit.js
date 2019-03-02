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
} from '@redux/biz/financial/investFlow';
import {listWrapper} from 'common/js/build-list';
import {
    moneyFormat,
    showWarnMsg,
    showSucMsg,
    dateTimeFormat,
    getQueryString,
    getUserId
} from 'common/js/util';
import fetch from 'common/js/fetch';

@listWrapper(
    state => ({
        ...state.bizInvestFlow,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class InvestFlow extends React.Component {
    constructor(props) {
        super(props);
        this.id = getQueryString('userId', this.props.location.search);
        this.productCode = getQueryString('code', this.props.location.search);
        this.symbol = getQueryString('symbol', this.props.location.search);
    }

    render() {
        const fields = [{
            title: '产品编号',
            field: 'productCode'
        }, {
            title: '收益',
            field: 'totalAmount',
            render: function (v, data) {
                return moneyFormat(v.toString(), '', data.totalAmount);
            }
        }, {
            title: '类型',
            field: 'type',
            type: 'select',
            key: 'product_type',
            search: true
        }, {
            title: '收益时间',
            field: 'benefitDate',
            type: 'date',
            rangedate: ['benefitDateStart', 'benefitDateEnd'],
            render: dateTimeFormat,
            search: true
        }, {
            title: '创建时间',
            type: 'datetime',
            field: 'createDatetime'
        }];
        return this.props.buildList({
            fields,
            pageCode: '625556',
            searchParams: {
                productCode: this.productCode
            },
            buttons: [
                {
                    code: 'add',
                    name: '新增',
                    handler: (keys, items) => {
                            this.props.history.push(`/bizFinancial/yesterdayprofit/add`);
                    }
                }, {
                    code: 'addedit',
                    name: '修改',
                    handler: (keys, items) => {
                        if (!keys.length) {
                            showWarnMsg('请选择记录');
                        } else if (keys.length > 1) {
                            showWarnMsg('请选择一条记录');
                        } else {
                            this.props.history.push(`/bizFinancial/todaydayprofit/addedit?v=1&id=${items[0].id}&symbol=${this.symbol}&productCode=${items[0].productCode}`);
                        }
                    }
                }, {
                    code: 'detail',
                    name: '详情',
                    handler: (keys, items) => {
                        if (!keys.length) {
                            showWarnMsg('请选择记录');
                        } else if (keys.length > 1) {
                            showWarnMsg('请选择一条记录');
                        } else {
                            this.props.history.push(`/bizFinancial/yesterdayprofit/detail?&v=1&id=${items[0].id}`);
                        }
                    }
                }, {
                    code: 'goBack',
                    name: '返回',
                    check: false,
                    handler: () => {
                        this.props.history.go(-1);
                    }
                }]
        });
    }
}

export default InvestFlow;
