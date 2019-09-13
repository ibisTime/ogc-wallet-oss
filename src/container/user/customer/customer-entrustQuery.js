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
} from '@redux/user/customer/customer-entrustQuery';
import {listWrapper} from 'common/js/build-list';
import {getQueryString, moneyFormat, moneyFormatSubtract, getCoinList, showWarnMsg} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.userCustomerEntrustQuery,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class CustomerEntrustQuery extends React.Component {
    constructor(props) {
        super(props);
        this.userId = getQueryString('userId', this.props.location.search) || '';
        this.buttons = [];
        this.buttons = [{
            code: 'goBack',
            name: '返回',
            check: false,
            handler: () => {
                this.props.history.push(`/user/customer`);
            }
        }];
    }

    render() {
        const fields = [{
            field: 'symbol',
            title: '交易币种',
            search: true
        }, {
            field: 'toSymbol',
            title: '计价币种',
            search: true
        }, {
            field: 'type',
            title: '类型',
            type: 'select',
            data: [{
                key: '0',
                value: '市价'
            }, {
                key: '1',
                value: '限价'
            }],
            keyName: 'key',
            valueName: 'value',
            search: true
        }, {
            field: 'direction',
            title: '买卖方向',
            type: 'select',
            data: [{
                key: '0',
                value: '买入'
            }, {
                key: '1',
                value: '卖出'
            }],
            keyName: 'key',
            valueName: 'value',
            search: true
        }, {
            field: 'price',
            title: '价格',
            render: (v, data) => {
                return moneyFormat(v, '', data.toSymbol);
            }
        }, {
            field: 'totalCount',
            title: '委托数量',
            render: (v, data) => {
                return moneyFormat(v, '', data.symbol);
            }
        }, {
            field: 'tradedCount',
            title: '成交数量',
            render: (v, data) => {
                return moneyFormat(v, '', data.symbol);
            }
        }, {
            field: 'avgPrice',
            title: '成交均价'
        }, {
            field: 'tradedFee',
            title: '手续费'
        }, {
            field: 'status',
            title: '状态',
            type: 'select',
            key: 'simu_order_status',
            search: true
        }, {
            field: 'createDatetime',
            title: '委托时间',
            type: 'datetime'
        }];
        return this.props.buildList({
            fields,
            pageCode: '650059',
            searchParams: {
                userId: this.userId
            },
            buttons: this.buttons
        });
    }
}

export default CustomerEntrustQuery;
