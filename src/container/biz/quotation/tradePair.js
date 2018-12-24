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
} from '@redux/biz/quotation/tradePair';
import {listWrapper} from 'common/js/build-list';
import {dateTimeFormat} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.quotationTradePair,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class TradePair extends React.Component {
    render() {
        const fields = [{
            title: '交易所',
            field: 'exchangeEname'
        }, {
            title: '基础币种',
            field: 'symbol',
            search: true
        }, {
            title: '计价币种',
            field: 'toSymbol',
            search: true
        }, {
            title: '价格',
            field: 'price'
        }];
        return this.props.buildList({
            fields,
            rowKey: 'id',
            pageCode: '650100'
        });
    }
}

export default TradePair;
