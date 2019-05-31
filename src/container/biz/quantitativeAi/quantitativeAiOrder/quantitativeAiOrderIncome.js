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
} from '@redux/quantitativeAi/quantitativeAiOrder/quantitativeAiOrderIncome';
import {listWrapper} from 'common/js/build-list';
import { showWarnMsg, getQueryString, moneyFormat } from 'common/js/util';

@listWrapper(
    state => ({
        ...state.quantitativeAiOrderIncome,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class QuantitativeAiOrderIncome extends React.Component {
    constructor(props) {
        super(props);
        this.orderCode = getQueryString('orderCode', props.location.search);
    }
    render() {
        if(!this.orderCode) {
            return null;
        }
        const fields = [{
            field: 'refCode',
            title: '关联编号'
        }, {
            field: 'userId',
            title: '用户',
            render(v, d) {
                return d.user && d.user.nickname + '-' + d.user.loginName;
            }
        }, {
            field: 'income',
            title: '收益',
            render: function (v, data) {
                return moneyFormat(v.toString(), '', data.symbolBuy);
            }
        }, {
            field: 'type',
            title: '收益类型',
            key: 'gplh_income_type',
            type: 'select',
            search: true
        }, {
            field: 'incomeTime',
            title: '收益时间',
            type: 'datetime'
        }];
        return this.props.buildList({
            fields,
            rowKey: 'machineOrderCode',
            pageCode: 610325,
            searchParams: {
                refCode: this.orderCode
            },
            buttons: [{
                code: 'bank',
                name: '返回',
                handler: () => {
                    window.history.go(-1);
                }
            }]
        });
    }
}

export default QuantitativeAiOrderIncome;
