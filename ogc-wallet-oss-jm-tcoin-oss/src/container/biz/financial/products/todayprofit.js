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
} from '@redux/biz/financial/investFlow';
import {listWrapper} from 'common/js/build-list';
import {
    moneyFormat,
    showWarnMsg,
    showSucMsg,
    moneyParse,
    dateTimeFormat,
    getQueryString,
    getUserId,
    getTime
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

    goFlow(productCode) {
        this.props.history.push(`/bizFinancial/yesterdayprofit/add?&productCode=${productCode}`);
    }

    render() {
        const fields = [{
            title: '产品名称',
            field: 'productName'
        }, {
            title: '收益',
            field: 'totalAmount',
            render: (v, data) => {
                console.log(data.symbol);
                return moneyFormat(v.toString(), '', this.symbol);
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
            // }, {
            //     title: '当前时间',
            //     render: function (v, data) {
            //         let todaytime = moment().format('YYYY-MM-DD HH:mm:ss');
            //        return moment().format('YYYY-MM-DD HH:mm:ss');
            //     }
        }];
        return this.props.buildList({
            fields,
            pageCode: '625556',
            searchParams: {
                productCode: this.productCode
            },
            buttons: [
                {
                    code: 'edit',
                    name: '新增',
                    handler: (keys, items) => {
                        this.props.history.push(`/bizFinancial/yesterdayprofit/add?&v=1&symbol=${this.symbol}&productCode=${this.productCode}&id=${keys[0]}`);
                    }
                }, {
                    code: 'addedit',
                    name: '修改',
                    handler: (keys, items) => {
                        // let todaytime = moment().format('YYYY-MM-DD 00:00:00');
                        let todaytime = moment().format('YYYY-MM-DD 00:00:00');
                        let todaytimes = new Date(todaytime).getTime();
                        if (!keys.length) {
                            showWarnMsg('请选择记录');
                            return;
                        }if (keys.length > 1) {
                            showWarnMsg('请选择一条记录');
                            return;
                        }
                        let times = new Date(items[0].benefitDate).getTime();
                        if (times !== todaytimes) {
                            showWarnMsg('只可以修改今日记录');
                        } else {
                            this.props.history.push(`/bizFinancial/todaydayprofit/addedit?v=1&id=${items[0].id}&symbol=${this.symbol}&productCode=${items[0].productCode}`);
                        }
                    }
                },
                {
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
