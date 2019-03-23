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
import {dateTimeFormat, getCoinList} from 'common/js/util';

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
class Lawrate extends React.Component {
    render() {
        const fields = [{
            title: '法币',
            field: 'currency',
            type: 'select',
            keyName: 'key',
            valueName: 'value',
            data: [{
                'key': 'HKD',
                'value': 'HKD'
            }, {
                'key': 'USD',
                'value': 'USD'
            }],
            render: (v, data) => {
                return data ? data.currency : '';
            },
            search: true
        }, {
            title: '参照法币',
            field: 'referCurrency'
        }, {
            title: '汇率来源',
            field: 'origin'
        }, {
            title: '汇率',
            field: 'rate'
        }, {
            field: 'updateDatetime',
            title: '更新时间',
            type: 'datetime'
        }];
        return this.props.buildList({
            fields,
            rowKey: 'id',
            pageCode: '802035'
        });
    }
}

export default Lawrate;
