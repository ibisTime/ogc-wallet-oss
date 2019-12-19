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
} from '@redux/superNode/revenueBreakdown';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg, dateTimeFormat, moneyFormat, getQueryString} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.SuperNodeRevenueBreakdown,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class RevenueBreakdown extends React.Component {
    code = getQueryString('code');
    nodePlanBatch = getQueryString('nodePlanBatch');
    divideBatch = getQueryString('divideBatch');
    orderNo = getQueryString('orderNo');
    render() {
        const fields = [{
            field: 'divideBatch',
            title: '期数+分红批次',
            render: () => {
                return `第${this.nodePlanBatch}期节点计划，第${this.divideBatch}次分红`;
            }
        }, {
            field: 'orderNo',
            title: '节点',
            render: () => {
                return `第${this.orderNo}号节点`;
            }
        }, {
            field: 'userName',
            title: '用户'
        }, {
            field: 'symbol',
            title: '币种'
        }, {
            field: 'type',
            title: '类型',
            type: 'select',
            key: 'snode_income_type',
            search: true
        }, {
            field: 'income',
            title: '收益数量',
            render(v, d) {
                return v && moneyFormat(v, '', d.symbol);
            }
        }, {
            field: 'tax',
            title: '税金',
            render(v, d) {
                return v && moneyFormat(v, '', d.symbol);
            }
        }, {
            field: 'status',
            title: '结算状态',
            type: 'select',
            key: 'snode_income_status'
        }, {
            field: 'createDatetime',
            title: '生产时间',
            type: 'datetime'
        }, {
            field: 'settleTime',
            title: '结算时间',
            type: 'datetime'
        }];
        return this.props.buildList({
            fields,
            pageCode: 610680,
            rowKey: 'id',
            searchParams: {
                refCode: this.code
            },
            buttons: [{
                code: 'goBack',
                name: '返回',
                handler: () => {
                    this.props.history.go(-1);
                }
            }, {
                code: 'export',
                name: '导出'
            }]
        });
    }
}

export default RevenueBreakdown;