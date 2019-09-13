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
} from '@redux/accept/saleOrder/saleOrder';
import {listWrapper} from 'common/js/build-list';
import {
    showWarnMsg,
    moneyFormat,
    getCoinList
} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.acceptSaleOrder,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class SaleOrder extends React.Component {
    render() {
        const fields = [{
            title: '下单人(手机号/邮箱)',
            field: 'sellUser',
          render(v, data) {
            if(data.user) {
              return data.user.loginName + `(${data.user.realName ? data.user.realName : '-'})`;
            }
            return '-';
          },
            type: 'select',
            pageCode: '805120',
            keyName: 'userId',
            valueName: '{{nickname.DATA}}-{{mobile.DATA}}-{{email.DATA}}',
            searchName: 'keyword',
            search: true
        }, {
          field: 'receiveBank',
          title: '付款方式'
        }, {
          field: 'receiveCardNo',
          title: '卡号'
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
              data: [{
                key: '0',
                value: '待收款'
              }, {
                key: '1',
                value: '已收款'
              }],
              keyName: 'key',
              valueName: 'value',
            search: true
        }, {
            field: 'createDatetime',
            title: '下单时间',
            type: 'datetime'
        }, {
          title: '附言',
          field: 'postscript'
        }, {
            title: '备注',
            field: 'remark'
        }];
        return this.props.buildList({
            fields,
            pageCode: 625285,
            searchParams: {
                type: '1',
                statusList: ['0', '1']
            },
            btnEvent: {
                // 购买
                buy: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].status !== '0') {
                        showWarnMsg('不是待支付的订单');
                    } else {
                        this.props.history.push(`/accept/saleOrder/addedit?v=1&isBuy=1&code=${selectedRowKeys[0]}`);
                    }
                }
            }
        });
    }
}

export default SaleOrder;
