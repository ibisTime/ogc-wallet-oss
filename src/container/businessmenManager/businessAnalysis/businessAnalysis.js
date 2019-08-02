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
            title: '今日余额',
            field: 'balanceTodaySymbolIn',
            render: (v, d) => {
                return moneyFormat(v, '', 'ETH') + ' (合 ' + moneyFormat(d.balanceTodaySymbolOut, 2, 'ETH') + ' KRW)';
            }
        }, {
            title: '今日收币总量',
            field: 'amountInTodaySymbolIn',
            render: (v, d) => {
                return moneyFormat(v, '', 'ETH') + ' (合 ' + moneyFormat(d.amountInTodaySymbolOut, 2, 'ETH') + ' KRW)';
            }
        }, {
            title: '截止今日结算金额',
            field: 'settleAmountTotalSymbolIn',
            render: (v, d) => {
                return moneyFormat(v, '', 'ETH') + ' (合 ' + moneyFormat(d.settleAmountTotalSymbolOut, 2, 'ETH') + ' KRW)';
            }
        }, {
            title: '今日结算数量',
            field: 'amountSettleTodaySymbolIn',
            render: (v, d) => {
                return moneyFormat(v, '', 'ETH') + ' (合 ' + moneyFormat(d.amountSettleTodaySymbolOut, 2, 'ETH') + ' KRW)';
            }
        }, {
            title: '截止今日收币总量',
            field: 'amountTotalSymbolIn',
            render: (v, d) => {
                return moneyFormat(v, '', 'ETH') + ' (合 ' + moneyFormat(d.amountTotalSymbolOut, 2, 'ETH') + ' KRW)';
            }
        }, {
            title: '贡献收币手续费',
            field: 'feeSymbolIn',
            render: (v, d) => {
                return moneyFormat(v, '', 'ETH') + ' (合 ' + moneyFormat(d.feeSymbolOut, 2, 'ETH') + ' KRW)';
            }
        }, {
            title: '贡献结算手续费',
            field: 'settleFeeSymbolIn',
            render: (v, d) => {
                return moneyFormat(v, 2, 'ETH') + ' (合 ' + moneyFormat(d.settleFeeSymbolOut, 2, 'ETH') + ' KRW)';
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
