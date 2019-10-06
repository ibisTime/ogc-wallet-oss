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
} from '@redux/guessUpsDowns/quotationHistory';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg, dateTimeFormat, moneyFormat} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.GuessUpsDownsQuotationHistory,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class QuotationHistory extends React.Component {
    render() {
        const fields = [{
            field: 'createDatetime1',
            title: '入池时间',
            render: (v, data) => {
                return dateTimeFormat(data.createDatetime);
            }
        }, {
            field: 'remark',
            title: '业务类型'
        }, {
            field: 'symbol',
            title: '币种',
            type: 'select',
            pageCode: '802005',
            params: {
                status: '0'
            },
            keyName: 'symbol',
            valueName: '{{symbol.DATA}}-{{cname.DATA}}',
            searchName: 'symbol',
            render: (v, data) => v,
            search: true
        }, {
            field: 'createDatetime',
            title: '时间',
            type: 'date',
            rangedate: ['createDatetimeStart', 'createDatetimeEnd'],
            noVisible: true,
            search: true
        }, {
            field: 'count',
            title: '数额',
            render: (v, data) => {
                return moneyFormat(v, '', data.symbol);
            }
        }];
        return this.props.buildList({
            fields,
            pageCode: 610670,
            rowKey: 'id',
            noSelect: true,
            searchParams: {
                direction: '1',
                nodePlan: '1'
            }
        });
    }
}

export default QuotationHistory;