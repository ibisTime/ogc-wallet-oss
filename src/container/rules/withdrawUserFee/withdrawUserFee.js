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
} from '@redux/rules/withdrawUserFee/withdrawUserFee';
import {listWrapper} from 'common/js/build-list';
import {dateTimeFormat} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.rulesWithdrawUserFee,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class WithdrawUserFee extends React.Component {
    render() {
        const fields = [{
            field: 'remark',
            title: '说明'
        }, {
            field: 'cvalue',
            title: '数值'
        }];
        return this.props.buildList({
            fields,
            rowKey: 'id',
            pageCode: '630045',
            searchParams: {
                type: 'withdraw_rule'
            }
        });
    }
}

export default WithdrawUserFee;
