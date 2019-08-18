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
} from '@redux/businessmenManager/settled/settled';
import {listWrapper} from 'common/js/build-list';
import {
    showSucMsg,
    showWarnMsg,
    moneyFormat
} from 'common/js/util';
import fetch from 'common/js/fetch';

const confirm = Modal.confirm;

@listWrapper(
    state => ({
        ...state.settled,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class settled extends React.Component {
    render() {
        const fields = [{
            title: '商户',
            field: 'merchantInfo',
            render(v, d) {
                return d.merchantInfo && d.merchantInfo.name + '-' + d.merchantInfo.loginName;
            },
            search: true
        }, {
            title: '支付时间',
            field: 'payDatetime',
            type: 'datetime'
        }, {
            title: '支付用户',
            field: 'payUserNameAndMobile',
            keyName: 'payUserInfo',
            valueName: '{{nickname.DATA}}-{{loginName.DATA}}',
            searchName: 'payUserInfo',
            render(v, d) {
                return d.payUserInfo && d.payUserInfo.nickname + '-' + d.payUserInfo.loginName;
            },
            search: true
        }, {
            title: '币种',
            field: 'paySymbol'
        }, {
            title: '支付总额',
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
            title: '实到数额',
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
                return moneyFormat(v, 2, 'ETH');
            }
        }, {
            title: '折合（KRW）',
            field: 'settleAmount',
            render: (v) => {
                return moneyFormat(v, 2, 'ETH');
            }
        }];
        return this.props.buildList({
            fields,
            pageCode: '610545',
            btnEvent: {
            }
        });
    }
}

export default settled;
