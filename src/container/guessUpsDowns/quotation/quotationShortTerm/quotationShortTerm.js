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
            field: 'createDatetime',
            title: '分红时间',
            type: 'datetime'
        }, {
            field: 'orderNo',
            title: '节点',
            type: 'select',
            data: [{
                key: '1',
                value: '1号节点'
            }, {
                key: '2',
                value: '2号节点'
            }, {
                key: '3',
                value: '3号节点'
            }, {
                key: '4',
                value: '4号节点'
            }, {
                key: '5',
                value: '5号节点'
            }, {
                key: '6',
                value: '6号节点'
            }, {
                key: '7',
                value: '7号节点'
            }, {
                key: '8',
                value: '8号节点'
            }, {
                key: '9',
                value: '9号节点'
            }, {
                key: '10',
                value: '10号节点'
            }],
            keyName: 'key',
            valueName: 'value',
            render: (v, data) => {
                return v + '号节点';
            },
            search: true
        }, {
            field: 'nickname',
            title: '用户'
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
                direction: '0',
                nodePlan: '0'
            }
        });
    }
}

export default QuotationShortTerm;