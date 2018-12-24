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
} from '@redux/statistics/OTCTransactions/OTCTransactions';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg, moneyFormat, getCoinList} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.statisticsOTCTransactions,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class OTCTransactions extends React.Component {
    render() {
        const fields = [{
            field: 'categoryName',
            title: '途径'
        }, {
            field: 'peopleCount',
            title: '人数'
        }, {
            field: 'tradeCount',
            title: '次数'
        }, {
            field: 'totalCount',
            title: 'FMVP币数量'
        }];
        return this.props.buildList({
            fields,
            pageCode: '805911'
        });
    }
}

export default OTCTransactions;
