import React from 'react';
import {Modal} from 'antd';
import moment from 'moment';
import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/biz/financial/todayprofit';
import {listWrapper} from 'common/js/build-list';
import {
    moneyFormat,
    showWarnMsg,
    showSucMsg,
    dateTimeFormat,
    getQueryString,
    getUserId,
    getTime
} from 'common/js/util';
import fetch from 'common/js/fetch';

@listWrapper(
    state => ({
        ...state.biztodayprofit,
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
            search: true,
            data: [{
                key: '0',
                value: '人工输入'
            }, {
                key: '1',
                value: '程序生成'
            }],
            keyName: 'key',
            valueName: 'value'
            // key: 'product_day_benefit_type'
        }, {
            title: '收益时间',
            field: 'benefitDate',
            type: 'date',
            rangedate: ['benefitDateStart', 'benefitDateEnd'],
            search: true
        }, {
            title: '创建时间',
            type: 'datetime',
            field: 'createDatetime'
        }, {
            title: '当前时间',
            render: function (v, data) {
                let todaytime = moment().format('YYYY-MM-DD HH:mm:ss');
               return moment().format('YYYY-MM-DD HH:mm:ss');
            }
        }];
        return this.props.buildList({
            fields,
            pageCode: '625556',
            searchParams: {
                productCode: this.productCode
            },
            buttons: [{
                    code: 'back',
                    name: '返回',
                    handler: () => {
                        this.props.history.go(-1);
                    }
                }]
        });
    }
}

export default InvestFlow;
