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
} from '@redux/finance/offlineRecharge/offlineRechargeQuery';
import {listWrapper} from 'common/js/build-list';
import {
    moneyFormat,
    getCoinList,
    dateTimeFormat,
    showWarnMsg
} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.financeOfflineRechargeQuery,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class OfflineRechargeQuery extends React.Component {
    render() {
        const fields = [{
            field: 'code',
            title: '编号',
            search: true
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
            field: 'mobile',
            title: '手机号',
            render: (v, data) => {
                return data.payer ? data.payer.mobile : '';
            }
        }, {
            field: 'email',
            title: '邮箱',
            render: (v, data) => {
                return data.payer ? data.payer.email : '';
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
            field: 'applyDatetime',
            title: '申请时间',
            type: 'date',
            rangedate: ['applyDateStart', 'applyDateEnd'],
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
                currency: 'ETH',
                channelType: '1'
            },
            btnEvent: {
                detail: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/finance/offlineRecharge/addedit?v=1&isQueryDetail=1&code=${selectedRowKeys[0]}`);
                    }
                }
            }
        });
    }
}

export default OfflineRechargeQuery;
