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
} from '@redux/otcmanage/survivalorder';
import {listWrapper} from 'common/js/build-list';
import {
    moneyFormat,
    showWarnMsg,
    showSucMsg,
    getUserName
} from 'common/js/util';
@listWrapper(
    state => ({
        ...state.OtcSurvivaLorDer,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class SurvivalOrder extends React.Component {
    render() {
        const fields = [{
            field: 'code',
            title: '编号',
            search: true
        }, {
            title: '买家',
            field: 'buyUser',
            render: (v, data) => {
                return data.buyUserInfo ? data.buyUserInfo.nickname : '';
            },
            type: 'select',
            pageCode: '805120',
            keyName: 'userId',
            valueName: '{{nickname.DATA}}-{{mobile.DATA}}-{{email.DATA}}',
            searchName: 'keyword',
            search: true
        }, {
            title: '卖家',
            field: 'sellUser',
            render: (v, data) => {
                return data.sellUserInfo ? data.sellUserInfo.nickname : '';
            },
            type: 'select',
            pageCode: '805120',
            keyName: 'userId',
            valueName: '{{nickname.DATA}}-{{mobile.DATA}}-{{email.DATA}}',
            searchName: 'keyword',
            search: true
        }, {
            title: '交易对',
            type: 'tradeCoin',
            render: (v, data) => {
                return data ? data.tradeCoin + '-' + data.tradeCurrency : '';
            }
        }, {
            title: '交易价格',
            field: 'tradePrice'
        }, {
            title: '交易数量',
            field: 'countString',
            render: (v, data) => {
                return moneyFormat(v, '', data.tradeCoin) + '-' + data.tradeCoin;
            }
        }, {
            title: '交易金额',
            field: 'tradeAmount',
            render: (v, data) => {
                return data.tradeAmount + '-' + data.tradeCurrency;
            }
        }, {
            title: '广告费',
            field: 'feeString',
            render: (v, data) => {
                return moneyFormat(v, '', data.tradeCoin) + '-' + data.tradeCoin;
            }
        }, {
            title: '状态',
            field: 'status',
            key: 'trade_order_status',
            type: 'select',
            search: true
        }, {
            field: 'updateDatetime',
            title: '下单时间',
            type: 'datetime'
        }];
        return this.props.buildList({
            fields,
            rowKey: 'id',
            pageCode: '625250',
            searchParams: {
                statusList: ['0', '1', '2']
            },
            btnEvent: {
                detail: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/otcmanage/survivalorder/addedit?v=1&code=${selectedRows[0].code}`);
                    }
                }
            }
        });
    }
}

export default SurvivalOrder;
