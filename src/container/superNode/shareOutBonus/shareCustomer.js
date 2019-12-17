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
} from '@redux/superNode/shareCustomer';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg, dateTimeFormat, moneyFormat, getQueryString} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.SuperNodeShareCustomer,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class ShareCustomer extends React.Component {
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
            field: 'userWeights',
            title: '个人权重'
        }, {
            field: 'symbol',
            title: '币种'
        }, {
            field: 'userDivideAmount',
            title: '收益总额',
            render: (v, d) => {
                return v && moneyFormat(v, '', d.symbol);
            }
        }, {
            field: 'createDatetime',
            title: '生产时间',
            type: 'datetime'
        }];
        return this.props.buildList({
            fields,
            pageCode: 610695,
            rowKey: 'id',
            searchParams: {
                snodeDivideCode: this.code
            },
            buttons: [{
                code: 'goBack',
                name: '返回',
                handler: () => {
                    this.props.history.go(-1);
                }
            }, {
                code: 'symx',
                name: '收益明细',
                handler: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/superNode/revenueBreakdown?code=${selectedRows[0].userId}&nodePlanBatch=${this.nodePlanBatch}&divideBatch=${this.divideBatch}&orderNo=${this.orderNo}`);
                    }
                }
            }]
        });
    }
}

export default ShareCustomer;