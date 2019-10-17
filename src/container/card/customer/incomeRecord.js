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
} from '@redux/superNode/incomeRecord';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg, dateTimeFormat, moneyFormat, getQueryString, formatMoney} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.SuperNodeIncomeRecord,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class IncomeRecord extends React.Component {
    constructor(props) {
        super(props);
        this.userId = getQueryString('userId', this.props.location.search);
    }

    render() {
        const fields = [{
            field: 'nodePlanName',
            title: '期数'
        }, {
            field: 'type',
            title: '类型',
            type: 'select',
            key: 'snode_income_type'
        }, {
            field: 'income',
            title: '收益数量',
            render: (v, data) => {
                return moneyFormat(v, '', data.symbol);
            }
        }, {
            field: 'tax',
            title: '税金',
            render: (v, data) => {
                return moneyFormat(v, '', 'PSC') + ' PSC';
            }
        }, {
            field: 'batch',
            title: '期数',
            type: 'select',
            pageCode: '610601',
            keyName: 'batch',
            valueName: '{{batch.DATA}}',
            searchName: 'batch',
            search: true,
            noVisible: true
        }, {
            field: 'symbol',
            title: '币种'
        }, {
            field: 'usdtPrice',
            title: '分红价值',
            render: (v, data) => {
                return formatMoney(v, '', '10000000') + ' USDT';
            }
        }, {
            field: 'status',
            title: '结算状态',
            type: 'select',
            key: 'snode_income_status',
            search: true
        }, {
            field: 'createDatetime',
            title: '生成时间',
            type: 'datetime'
        }, {
            field: 'settleTime',
            title: '计算时间',
            type: 'datetime'
        }];
        return (
            <div className="superNode-listPage-wrapper">
                {
                    this.props.buildList({
                        fields,
                        pageCode: 610680,
                        searchParams: {
                            userId: this.userId
                        },
                        buttons: [{
                            code: 'goBack',
                            name: '返回',
                            handler: (selectedRowKeys, selectedRows) => {
                                this.props.history.go(-1);
                            }
                        }]
                    })
                }
            </div>
        );
    }
}

export default IncomeRecord;
