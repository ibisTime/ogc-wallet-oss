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
} from '@redux/user/customer/customer-ledgerQuery';
import {listWrapper} from 'common/js/build-list';
import {getQueryString, moneyFormat, moneyFormatSubtract, getCoinList, showWarnMsg} from 'common/js/util';
import {SYS_USER} from 'common/js/config';
import { getDictList } from 'api/dict';

@listWrapper(
    state => ({
        ...state.userCustomerLedgerQuery,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class CustomerLedgerQuery extends React.Component {
    constructor(props) {
        super(props);
        this.accountNumber = getQueryString('code', this.props.location.search) || '';
        this.isPlat = !!getQueryString('isPlat', this.props.location.search);
        this.bizType = getQueryString('bizType', this.props.location.search);
        this.symbol = getQueryString('symbol', this.props.location.search) || '';
        this.history = getQueryString('history', this.props.location.search);
        if(this.symbol) {
            if(this.symbol === 'JEJU_CONSUME') {
                this.bizType = this.bizType + '_tosp';
            }else {
                this.bizType = this.bizType + '_' + this.symbol.toLowerCase();
            }
        }
        this.buttons = [];
        this.buttons = [{
            code: 'export',
            name: '导出',
            check: false
        }, {
            code: 'goBack',
            name: '返回',
            check: false,
            handler: () => {
                this.props.history.go(-1);
            }
        }];
    }

    render() {
        const fields = [{
            field: 'loginName',
            title: '户名',
            render: (v, data) => {
                if (data.accountType === 'P') {
                    return '平台账户';
                } else {
                    return data.user ? data.user.loginName : '';
                }
        }
        }, {
            field: 'channelType',
            title: '渠道',
            type: 'select',
            key: 'channel_type',
            search: true
        }, {
            field: 'currency',
            title: '币种',
            type: 'select',
            data: getCoinList(),
            keyName: 'key',
            valueName: 'value',
            search: !this.isPlat,
            render: (v) => {
                return v;
            }
        }, {
            field: 'bizType',
            title: '业务类型',
            type: 'select',
            key: this.isPlat ? this.bizType : 'jour_biz_type_user',
            search: true
        }, {
            field: 'transAmountString',
            title: '变动金额',
            render: (v, data) => {
                if(data.currency === 'JEJU_CONSUME') {
                    return moneyFormat(v, '', 'ETH');
                }else {
                    return moneyFormat(v, '', data.currency);
                }
            }
        }, {
            field: 'preAmountString',
            title: '变动前金额',
            render: (v, data) => {
                if(data.currency === 'JEJU_CONSUME') {
                    return moneyFormat(v, '', 'ETH');
                }else {
                    return moneyFormat(v, '', data.currency);
                }
            }
        }, {
            field: 'postAmountString',
            title: '变动后金额',
            render: (v, data) => {
                if(data.currency === 'JEJU_CONSUME') {
                    return moneyFormat(v, '', 'ETH');
                }else {
                    return moneyFormat(v, '', data.currency);
                }
            }
        }, {
            field: 'createDatetime',
            title: '创建时间',
            type: 'datetime'
        }, {
            field: 'bizNote',
            title: '备注'
        }];
        return this.props.buildList({
            fields,
            pageCode: this.history === '1' ? 802324 : 802320,
            searchParams: {
                accountNumber: this.accountNumber
            },
            buttons: this.buttons
        });
    }
}

export default CustomerLedgerQuery;
