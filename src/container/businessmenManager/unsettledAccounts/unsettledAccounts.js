import React from 'react';
import {Modal, message} from 'antd';
import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/businessmenManager/unsettledAccounts/unsettledAccounts';
import {listWrapper} from 'common/js/build-list';
import {
    showSucMsg,
    showWarnMsg,
    moneyFormat,
    moneyFormatTosp
} from 'common/js/util';
const merchantCode = '';

@listWrapper(
    state => ({
        ...state.unsettledAccounts,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class unsettledAccounts extends React.Component {
    render() {
        const fields = [{
            title: '商户',
            field: 'merchantInfo',
            render(v, d) {
                return d.merchantInfo && d.merchantInfo.name + '-' + d.merchantInfo.mobile;
            },
            search: true
        }, {
            title: '支付时间',
            field: 'payDatetime',
            type: 'datetime'
        }, {
            title: '支付用户',
            field: 'payUserInfo',
            render(v, d) {
                return d.payUserInfo && d.payUserInfo.nickname + '-' + d.payUserInfo.mobile;
            }
        }, {
            title: '方式',
            type: 'select',
            field: 'payChannel',
            key: 'xxzf_pay_channel',
            search: true
        }, {
            title: 'TOSP数额',
            field: 'payAmount',
            render: (v) => {
                return moneyFormat(v, '', 'ETH');
            }
        }, {
            title: '手续费',
            field: 'fee',
            render: (v) => {
                return moneyFormat(v, '', 'ETH');
            }
        }, {
            title: '实到TOSP',
            field: 'realAmount',
            render: (v) => {
                return moneyFormat(v, '', 'ETH');
            }
        }, {
            title: '支付时行情（USD）',
            field: 'valueUsdPay'
        }, {
            title: '折合（USD）',
            field: 'payUsdAmount',
            render: (v) => {
                return moneyFormat(v, '', 'ETH');
            }
        }, {
            title: '折合（KRW）',
            field: 'settleAmount',
            render: (v) => {
                return moneyFormat(v, '', 'ETH');
            }
        }];
        return this.props.buildList({
            fields,
            pageCode: '610535',
            btnEvent: {
            }
        });
    }
}

export default unsettledAccounts;
