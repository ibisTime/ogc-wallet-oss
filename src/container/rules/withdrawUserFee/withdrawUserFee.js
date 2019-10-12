import React from 'react';
import {
    cancelFetching,
    clearSearchParam,
    doFetching,
    setBtnList,
    setPagination,
    setSearchData,
    setSearchParam,
    setTableData
} from '@redux/BTC-finance/withdrawRule/withdrawRule';
import {listWrapper} from 'common/js/build-list';

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
class withdrawUserFee extends React.Component {
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
        }, {
            field: 'withdrawWarn',
            title: '散取地址报警阀值'
        }];
        return this.props.buildList({
            fields,
            rowKey: 'id',
            pageCode: '802016'
        });
    }
}

export default withdrawUserFee;
