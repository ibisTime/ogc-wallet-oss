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
import {showWarnMsg, dateTimeFormat, moneyFormat, getCoinList} from 'common/js/util';

function fixed8(val) {
    if(val) {
        return (Math.floor(+val * 1e8) / 1e8).toFixed(8);
    }else {
        return '';
    }
}

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
            field: 'fromPlat',
            title: '来源'
        }, {
            field: 'symbol01',
            title: '交易对',
            render(v, d) {
                return d && `${d.symbol}/${d.toSymbol}`;
            }
        }, {
            field: 'symbol',
            title: '交易币种',
            type: 'select',
            key: 'guess_coin',
            search: true,
            noVisible: true
        }, {
            field: 'period',
            title: 'k线时间'
        }, {
            field: 'ksgd',
            title: '开，收，高，低',
            render(v, d) {
                return d && `开：${fixed8(d.open)}，收：${fixed8(d.close)}，高：${fixed8(d.high)}，低：${fixed8(d.low)}`;
            }
        }, {
            field: 'modifyFlag',
            title: '是否修改',
            type: 'select',
            data: [{
                key: '1',
                value: '修改'
            }, {
                key: '0',
                value: '未修改'
            }],
            keyName: 'key',
            valueName: 'value',
            search: true
        }, {
            field: 'klineDatetime',
            title: '产生时间',
            type: 'datetime'
        }, {
            field: 'grabDatetime',
            title: '抓取时间',
            type: 'datetime'
        }];
        return this.props.buildList({
            fields,
            pageCode: 620030,
            rowKey: 'id',
            buttons: [{
                code: 'detail',
                name: '详情',
                handler: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/guessUpsDowns/quotation/detail?code=${selectedRows[0].id}&v=1`);
                    }
                }
            }]
        });
    }
}

export default QuotationHistory;