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
} from '@redux/otcmanage/historicalorder';
import {listWrapper} from 'common/js/build-list';
import {
    moneyFormat,
    showWarnMsg,
    showSucMsg,
    getUserName
} from 'common/js/util';
@listWrapper(
    state => ({
        ...state.OtcManageHistoricalorder,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class Historicalorder extends React.Component {
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
            title: '交易对',
            type: 'tradeCoin',
            render: (v, data) => {
                return data ? data.tradeCoin + '-' + data.tradeCurrency : '';
            },
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
            title: '广告费',
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
            valueName: 'value',
            search: true
        }, {
            field: 'updateDatetime',
            title: '完成时间',
            type: 'datetime'
        }];
        return this.props.buildList({
            fields,
            rowKey: 'id',
            pageCode: '625250',
            searchParams: {
                statusList: ['3', '4', '6', '7']
            },
            btnEvent: {
                orderdetail: (selectedRowKeys, selectedRows) => {
                    this.props.history.push(`/otcmanage/historicalorder/orderdetail`);
                }
            }
        });
    }
}

export default Historicalorder;
