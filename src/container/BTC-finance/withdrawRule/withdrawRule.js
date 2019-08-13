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
            field: 'symbol',
            title: '币种符号'
        }, {
            field: 'withdrawFeeType',
            title: '取现手续费类型',
            type: 'select',
            key: 'withdraw_fee_type'
        }, {
            field: 'withdrawFee',
            title: '取现手续费数量'
        }, {
            field: 'withdrawFeeTakeLocation',
            title: '手续费扣减位置',
            type: 'select',
            data: [
                {
                    key: '0',
                    value: '取现金额中'
                },
                {
                    key: '1',
                    value: '余额中'
                }
            ],
            keyName: 'key',
            valueName: 'value'
        }, {
            field: 'withdrawStep',
            title: '提币步长'
        }, {
            field: 'id',
            title: '编号',
            noVisible: true
        }, {
            field: 'withdrawMin',
            title: '取现最小金额'
        }, {
            field: 'withdrawMax',
            title: '取现最大金额'
        }, {
            field: 'withdrawLimit',
            title: '每人每日提币上线'
        }, {
            field: 'withdrawRule',
            title: '提币规则文本'
        }];
        return this.props.buildList({
            fields,
            rowKey: 'id',
            pageCode: '802016'
        });
    }
}

export default WithdrawRule;
