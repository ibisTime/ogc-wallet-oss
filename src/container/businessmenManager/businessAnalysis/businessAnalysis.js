import React from 'react';
import {Modal, message} from 'antd';
import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/businessmenManager/businessAnalysis/businessAnalysis';
import {listWrapper} from 'common/js/build-list';
import {
    showSucMsg,
    showWarnMsg,
    moneyFormat
} from 'common/js/util';
import fetch from 'common/js/fetch';

const confirm = Modal.confirm;

@listWrapper(
    state => ({
        ...state.businessAnalysis,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class businessAnalysis extends React.Component {
    render() {
        const fields = [{
            title: '商户',
            field: 'merchantNameAndMobile',
            search: true
        }, {
            title: '今日收币总量（TOSP）',
            field: 'amountInTodaySymbolIn',
            render: (v) => {
                return moneyFormat(v, '', 'ETH');
            }
        }, {
            title: '截止今日收币总量（TOSP）',
            field: 'amountTotalSymbolIn',
            render: (v) => {
                return moneyFormat(v, '', 'ETH');
            }
        }, {
            title: '今日余额（TOSP）',
            field: 'balanceTodaySymbolIn',
            render: (v) => {
                return moneyFormat(v, '', 'ETH');
            }
        }, {
            title: '今日结算数量（TOSP）',
            field: 'amountSettleTodaySymbolIn',
            render: (v) => {
                return moneyFormat(v, '', 'ETH');
            }
        }, {
            title: '截止今日结算金额（TOSP）',
            field: 'settleAmountTotalSymbolIn',
            render: (v) => {
                return moneyFormat(v, '', 'ETH');
            }
        }, {
            title: '贡献收币手续费（TOSP）',
            field: 'feeSymbolIn',
            render: (v) => {
                return moneyFormat(v, '', 'ETH');
            }
        }, {
            title: '今日收币总量（KRW）',
            field: 'amountInTodaySymbolOut',
            render: (v) => {
                return moneyFormat(v, 2, 'ETH');
            }
        }, {
            title: '截止今日收币总量（KRW）',
            field: 'amountTotalSymbolOut',
            render: (v) => {
                return moneyFormat(v, 2, 'ETH');
            }
        }, {
            title: '今日余额（KRW）',
            field: 'balanceTodaySymbolOut',
            render: (v) => {
                return moneyFormat(v, 2, 'ETH');
            }
        }, {
            title: '今日结算数量（KRW）',
            field: 'amountSettleTodaySymbolOut',
            render: (v) => {
                return moneyFormat(v, 2, 'ETH');
            }
        }, {
            title: '截止今日结算金额（KRW）',
            field: 'settleAmountTotalSymbolOut',
            render: (v) => {
                return moneyFormat(v, 2, 'ETH');
            }
        }, {
            title: '结算手续费（KRW）',
            field: 'settleFeeSymbolOut',
            render: (v) => {
                return moneyFormat(v, 2, 'ETH');
            }
        }, {
            title: '日期',
            field: 'date',
            type: 'date',
            search: true
        }];
        return this.props.buildList({
            fields,
            pageCode: '610565',
            btnEvent: {
            }
        });
    }
}

export default businessAnalysis;
