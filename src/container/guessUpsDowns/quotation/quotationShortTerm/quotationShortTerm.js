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
} from '@redux/guessUpsDowns/quotationShortTerm';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg, dateTimeFormat, moneyFormat} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.GuessUpsDownsQuotationShortTerm,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class QuotationShortTerm extends React.Component {
    render() {
        const fields = [{
            field: 'jyd',
            title: '交易对'
        }, {
            field: 'jyd',
            title: 'k线类型'
        }, {
            field: 'createDatetime',
            title: 'k线时间',
            type: 'datetime'
        }, {
            field: 'cjl',
            title: '成交量',
            render: (v, data) => {
                return moneyFormat(v, '', data.symbol);
            }
        }, {
            field: 'ksgd',
            title: '开，收，高，低'
        }, {
            field: 'symbol',
            title: '针对币种',
            type: 'select',
            pageCode: '802005',
            params: {
                status: '0'
            },
            keyName: 'symbol',
            valueName: '{{symbol.DATA}}-{{cname.DATA}}',
            searchName: 'symbol',
            render: (v, data) => v,
            noVisible: true,
            search: true
        }, {
            field: 'ly',
            title: '来源'
        }, {
            field: 'xg',
            title: '是否修改'
        }, {
            field: 'createDatetime1',
            title: '抓取时间',
            type: 'datetime'
        }, {
            field: 'createDatetime2',
            title: '修改时间',
            type: 'datetime'
        }];
        return this.props.buildList({
            fields,
            pageCode: 610670,
            rowKey: 'id',
            noSelect: true,
            searchParams: {
                direction: '0',
                nodePlan: '0'
            },
            buttons: [{
                code: 'detail',
                name: '详情',
                handler: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/guessUpsDowns/quotation/detail?code=${selectedRows[0].id}`);
                    }
                }
            }]
        });
    }
}

export default QuotationShortTerm;