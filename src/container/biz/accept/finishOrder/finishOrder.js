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
} from '@redux/accept/finishOrder/finishOrder';
import {listWrapper} from 'common/js/build-list';
import {
    moneyFormat,
    getCoinList
} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.acceptFinishOrder,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class FinishOrder extends React.Component {
    render() {
        const fields = [{
            field: 'code',
            title: '编号',
            search: true
        }, {
            title: '下单人',
            field: 'nickname',
            render: (v, data) => {
                return data.user ? data.user.nickname : '';
            },
            type: 'select',
            pageCode: '805120',
            keyName: 'userId',
            valueName: '{{nickname.DATA}}-{{mobile.DATA}}-{{email.DATA}}',
            searchName: 'keyword',
            search: true
        }, {
            title: '手机号',
            field: 'userMobile',
            render: (v, data) => {
                return data.user ? data.user.mobile : '';
            }
        }, {
            field: 'tradeCoin',
            title: '币种',
            type: 'select',
            data: getCoinList(),
            keyName: 'key',
            valueName: 'value',
            search: true
        }, {
            title: '单价',
            field: 'tradePrice'
        }, {
            title: '数量',
            field: 'count',
            render: (v, data) => {
                return moneyFormat(v, '', data.tradeCoin);
            }
        }, {
            title: '总金额',
            field: 'tradeAmount'
        }, {
            title: '手续费',
            field: 'fee',
            render: (v, data) => {
                return moneyFormat(v, '', data.tradeCoin);
            }
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            key: 'accept_order_status',
            search: true
        }, {
            field: 'createDatetime',
            title: '下单时间',
            type: 'datetime'
        }, {
            title: '备注',
            field: 'remark'
        }];
        return this.props.buildList({
            fields,
            pageCode: 625285,
            searchParams: {
                status: '2'
            }
        });
    }
}

export default FinishOrder;
