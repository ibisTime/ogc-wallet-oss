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
} from '@redux/trade/arbitrationOrder/arbitrationOrder';
import {listWrapper} from 'common/js/build-list';
import {
    moneyFormat,
    getCoinList,
    showWarnMsg
} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.tradeArbitrationOrder,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class ArbitrationOrder extends React.Component {
    render() {
        const fields = [{
            field: 'code',
            title: '编号',
            search: true
        }, {
            title: '被告',
            field: 'sellUser',
            render: (v, data) => {
                return data ? data.sellUser + '-卖家' : '';
            }
        }, {
            title: '原告',
            field: 'buyUser',
            render: (v, data) => {
                return data ? data.buyUser + '-买家' : '';
            }
        }, {
            title: '交易对',
            type: 'select',
            render: (v, data) => {
                return data ? data.tradeCoin + '-' + data.tradeCurrency : '';
            },
            search: true
        }, {
            field: 'tradePrice',
            title: '涉案金额'
        }, {
            title: '申请原因',
            field: 'arbitrateReason'
        }, {
            field: 'arbitrateCreateDatetime',
            title: '申请时间',
            type: 'datetime'
        }];
        return this.props.buildList({
            fields,
            pageCode: '625265',
            searchParams: {
                status: '5'
            },
            // setstrutlist: ['5'],
            btnEvent: {
                orderdetail: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                        //     if (selectedRows[0].status !== '0') {
                        //         showWarnMsg('只有待处理的订单才可以进行处理');
                    } else {
                        this.props.history.push(`/trade/arbitrationOrder/resolve?code=${selectedRowKeys[0]}`);
                    }
                }
            }
        });
    }
}

export default ArbitrationOrder;
