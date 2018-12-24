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
} from '@redux/trade/finishOrder/finishOrder';
import {listWrapper} from 'common/js/build-list';
import {
    moneyFormat,
    getCoinList
} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.tradeFinishOrder,
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
            title: '买家',
            field: 'buyUser',
            render: (v, data) => {
                if (data.buyUserInfo) {
                    return data.buyUserInfo.loginName + '(' + data.buyUserInfo.nickname + ')';
                }
            },
            type: 'select',
            pageCode: '805120',
            keyName: 'userId',
            valueName: '{{nickname.DATA}}-{{mobile.DATA}}-{{email.DATA}}',
            searchName: 'keyword',
            search: true
        }, {
            title: '卖家',
            field: 'sellUser',
            render: (v, data) => {
                if (data.sellUserInfo) {
                    return data.sellUserInfo.loginName + '(' + data.sellUserInfo.nickname + ')';
                }
            },
            type: 'select',
            pageCode: '805120',
            keyName: 'userId',
            valueName: '{{nickname.DATA}}-{{mobile.DATA}}-{{email.DATA}}',
            searchName: 'keyword',
            search: true
        }, {
            field: 'tradeCoin',
            title: '币种',
            type: 'select',
            data: getCoinList(),
            keyName: 'key',
            valueName: 'value',
            search: true
        }, {
            title: '交易价格',
            field: 'tradePrice'
        }, {
            title: '交易数量',
            field: 'countString',
            render: (v, data) => {
                return moneyFormat(v, '', data.tradeCoin) + data.tradeCoin;
            }
        }, {
            title: '交易金额',
            field: 'tradeAmount'
        }, {
            title: '手续费',
            field: 'feeString',
            render: (v, data) => {
                return moneyFormat(v, '', data.tradeCoin) + data.tradeCoin;
            }
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            data: [{
                'key': '0',
                'value': '待支付'
            }, {
                'key': '1',
                'value': '已支付'
            }, {
                'key': '3',
                'value': '仲裁中'
            }],
            keyName: 'key',
            valueName: 'value'
        }, {
            title: '状态',
            field: 'statusList',
            type: 'select',
            data: [{
                'key': '0',
                'value': '待支付'
            }, {
                'key': '1',
                'value': '已支付'
            }, {
                'key': '3',
                'value': '仲裁中'
            }],
            keyName: 'key',
            valueName: 'value',
            noVisible: true,
            search: true
        }, {
            field: 'updateDatetime',
            title: '更新时间',
            type: 'datetime'
        }, {
            title: '备注',
            field: 'remark'
        }];
        return this.props.buildList({
            fields,
            pageCode: 625250,
            searchParams: {
                statusList: ['2', '3']
            },
            beforeSearch: (data) => {
                if(data.status) {
                    var statusList = [];
                    statusList.push(data.status);
                    data.statusList = statusList;
                }
                return data;
            }
        });
    }
}

export default FinishOrder;
