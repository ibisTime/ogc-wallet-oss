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
} from '@redux/BTC-finance/offlineRecharge/offlineRechargeQuery';
import {listWrapper} from 'common/js/build-list';
import {
    moneyFormat,
    getCoinList,
    dateTimeFormat,
    showWarnMsg
} from 'common/js/util';

let currency = '';
@listWrapper(
    state => ({
        ...state.BTCFinanceOfflineRechargeQuery,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class OfflineRechargeQuery extends React.Component {
    componentDidMount() {
        let clearParams = document.getElementById('clearParams');
        clearParams.addEventListener('click', () => {
          currency = '';
        });
    }
    render() {
        const fields = [{
            field: 'code',
            title: '编号',
            search: true
        }, {
          field: 'currency',
          title: '币种类型',
          type: 'select',
          pageCode: '802005',
          params: {
            status: '0'
          },
          keyName: 'symbol',
          valueName: '{{symbol.DATA}}-{{cname.DATA}}',
          searchName: 'symbol',
          render: (v) => v,
          search: true,
          onChange: (v) => {
            setTimeout(() => {
              let clearSpan = document.querySelector('.ant-select-selection__clear');
              clearSpan.addEventListener('click', () => {
                currency = '';
              });
            }, 0);
            currency = v;
          }
        }, {
            field: 'accountName',
            title: '户名',
            render: (v, data) => {
                return data.payer ? data.payer.nickname : '';
            }
        }, {
            title: '充值用户',
            field: 'userId',
            type: 'select',
            pageCode: '805120',
            params: {
                updater: ''
            },
            keyName: 'userId',
            valueName: '{{nickname.DATA}}-{{mobile.DATA}}-{{email.DATA}}',
            searchName: 'keyword',
            search: true,
            noVisible: true
        }, {
            field: 'loginName',
            title: '手机号/邮箱',
            render: (v, data) => {
                return data.payer ? data.payer.loginName : '-';
            }
        }, {
            field: 'amount',
            title: '充值金额',
            render: (v, data) => {
                return moneyFormat(Number(v), '', data.currency);
            }
        }, {
            field: 'bizNote',
            title: '充值说明'
        }, {
            field: 'payDatetime',
            title: '到账时间',
            type: 'date',
            rangedate: ['payDateStart', 'payDateEnd'],
            render: dateTimeFormat,
            search: true
        }, {
            title: '状态',
            field: 'status',
            type: 'select',
            key: 'charge_status',
            search: true
        }];
        return this.props.buildList({
            fields,
            pageCode: '802345',
            searchParams: {
                currency,
                channelType: '1'
            },
            btnEvent: {
                detail: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/BTC-finance/offlineRecharge/detail?v=1&code=${selectedRowKeys[0]}`);
                    }
                }
            }
        });
    }
}

export default OfflineRechargeQuery;
