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
} from '@redux/BTC-finance/withdrawRule/withdrawRule';
import { listWrapper } from 'common/js/build-list';

@listWrapper(
    state => ({
        ...state.BTCFinanceWithdrawRule,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class WithdrawRule extends React.Component {
    render() {
        const fields = [{
            field: 'id',
            title: '编号',
            noVisible: true
        }, {
            field: 'symbol',
            title: '币种符号'
        }, {
            field: 'withdrawMin',
            title: '取现最小金额'
        }, {
            field: 'withdrawFeeType',
            title: '取现手续费类型',
            type: 'select',
            key: 'withdraw_fee_type'
        }, {
            field: 'withdrawFee',
            title: '取现手续费数量'
        }];
        return this.props.buildList({
            fields,
            rowKey: 'id',
            pageCode: '802016'
        });
    }
}

export default WithdrawRule;
