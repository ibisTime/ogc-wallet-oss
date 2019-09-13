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
} from '@redux/biz/quotation/quotationETH';
import {listWrapper} from 'common/js/build-list';
import {dateTimeFormat} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.quotationQuotationETH,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class QuotationETH extends React.Component {
    componentDidMount() {
        let pHtml = document.createElement('p');
        pHtml.innerHTML = '行情更新间隔时间为30s';
        pHtml.style.margin = '0';
        let dHtml = document.querySelector('.tools-wrapper');
        dHtml.insertBefore(pHtml, dHtml.childNodes[0]);
    }
    render() {
        const fields = [{
            title: '币种',
            field: 'symbol'
        }, {
            title: '计价币种',
            field: 'referCurrency'
        }, {
            title: '最新价',
            field: 'lastPrice'
        }, {
            title: '来源',
            field: 'origin'
        }, {
            title: '更新时间',
            field: 'updateDatetime',
            type: 'datetime'
        }];
        return this.props.buildList({
            fields,
            rowKey: 'id',
            pageCode: '650101',
            searchParams: {
                symbol: 'USDT'
            }
        });
    }
}

export default QuotationETH;
