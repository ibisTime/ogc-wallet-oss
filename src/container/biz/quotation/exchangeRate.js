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
} from '@redux/biz/quotation/exchangeRate';
import {listWrapper} from 'common/js/build-list';
import {dateTimeFormat} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.quotationExchangeRate,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class ExchangeRate extends React.Component {
    render() {
        const fields = [{
            title: '币种',
            field: 'currency',
            search: true
        }, {
            title: '汇率',
            field: 'rate'
        }, {
            field: 'updateDatetime',
            title: '更新时间',
            type: 'datetime'
        }, {
            field: 'remark',
            title: '备注'
        }];
        return this.props.buildList({
            fields,
            rowKey: 'id',
            pageCode: '802035'
        });
    }
}

export default ExchangeRate;
