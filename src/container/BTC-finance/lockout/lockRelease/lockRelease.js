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
} from '@redux/BTC-finance/lockout/lockRelease';
import {listWrapper} from 'common/js/build-list';
import {
    moneyFormat,
    getCoinList,
    dateTimeFormat,
    showWarnMsg,
    showSucMsg,
    getCoinType,
    getQueryString
} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.BTCFinanceLockRelease,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class LockRelease extends React.Component {
    userId = getQueryString('userId', this.props.location.search);
    currency = getQueryString('currency', this.props.location.search);
    render() {
        const fields = [{
            title: '针对用户',
            field: 'userName',
            render() {
                return sessionStorage.getItem('USER_NAME') || '-';
            }
        }, {
            title: '币种',
            field: 'currency',
            render: () => {
                return this.currency;
            }
        }, {
            title: '解锁数量',
            field: 'amount'
        }, {
            title: '操作人',
            field: 'applyUserName'
        }, {
            title: '操作时间',
            field: 'applyDatetime',
            type: 'datetime'
        }, {
            title: '说明',
            field: 'applyNote'
        }];
        return this.props.buildList({
            fields,
            pageCode: '806045',
            searchParams: {
                type: '2',
                userId: this.userId,
                currency: this.currency
            },
            buttons: [{
                code: 'goBack',
                name: '返回',
                handler: () => {
                    this.props.history.go(-1);
                }
            }, {
                code: 'detail',
                name: '详情'
            }, {
                code: 'export',
                name: '导出'
            }]
        });
    }
}

export default LockRelease;
