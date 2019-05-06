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
import fetch from 'common/js/fetch';
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
    state = {
        jyd: []
    };
    componentWillMount() {
        fetch(625229).then(data => {
            data.forEach((item, index) => {
                this.state.jyd.push({
                    kname: index,
                    kvalue: item
                });
            });
        });
    }
    render() {
        const fields = [{
            field: 'code',
            title: '编号',
            search: true
        }, {
            title: '被告',
            field: 'beigao',
            render: (v, data) => {
                if (data.accused.userId !== data.buyUserInfo.userId) {
                    // 卖家
                    return data.accused.nickname + '-卖家';
                }else {
                    return data.accused.nickname + '-买家';
                }
            }
        }, {
            title: '原告',
            field: 'yuangao',
            render: (v, data) => {
                if (data.plaintiff.userId !== data.buyUserInfo.userId) {
                    // 卖家
                    return data.plaintiff.nickname + '-卖家';
                }else {
                    return data.plaintiff.nickname + '-买家';
                }
            }
        }, {
            title: '交易对',
            field: 'tradeCurrency',
            type: 'select',
            data: this.state.jyd,
            keyName: 'kname',
            valueName: 'kvalue',
            render: (v, data) => {
                return data ? data.tradeCoin + '-' + data.tradeCurrency : '';
            }
        }, {
            field: 'tradeAmount',
            title: '涉案金额',
            render: (v, d) => {
                return d.tradeAmount + '-' + d.tradeCurrency;
            }
        }, {
            title: '申请原因',
            field: 'arbitrateReason'
        }, {
            field: 'arbitrateCreateDatetime',
            title: '申请时间',
            type: 'datetime'
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            key: 'trade_order_status'
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
            },
            beforeSearch: (params) => {
                if(params.tradeCurrency) {
                    let tradeCoin = params.tradeCurrency.split('-')[0];
                    let tradeCurrency = params.tradeCurrency.split('-')[1];
                    params.tradeCoin = tradeCoin;
                    params.tradeCurrency = tradeCurrency;
                }
                return params;
            }
        });
    }
}

export default ArbitrationOrder;
