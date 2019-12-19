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
} from '@redux/ecology/integrationEcology/transferAccountsQuery/transferAccountsQuery';
import {listWrapper} from 'common/js/build-list';
import {showWarnMsg, dateTimeFormat, moneyFormat} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.IntegrationEcologyTransferAccountsQuery,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class TransferAccountsQuery extends React.Component {
    render() {
        const fields = [{

            field: 'dappname',
            title: '应用名称',
            render: (v, data) => {
                return data.openDapp.name;
            }
        }, {
            field: 'dappId',
            title: '应用',
            type: 'select',
            pageCode: '625455',
            keyName: 'id',
            valueName: '{{name.DATA}}',
            searchName: 'name',
            noVisible: true,
            search: true
        }, {
            field: 'nickname',
            title: '姓名',
            render: (v, data) => {
                return data.user.nickname + '(' + (data.user.mobile ? data.user.mobile : data.user.email) + ')';
            }
        }, {
            field: 'userId',
            title: '账号',
            type: 'select',
            pageCode: '805120',
            keyName: 'userId',
            valueName: '{{nickname.DATA}}-{{mobile.DATA}}',
            searchName: 'keyword',
            search: true,
            noVisible: true
        }, {
            field: 'dkey',
            title: '方向',
            render: (v, data) => {
                return data && String(data.amount).indexOf('-') > -1 ? 'DAPP转到钱包' : '钱包转到DAPP';
            }
        }, {
            field: 'amount',
            title: '转账数量',
            render: (v, data) => {
                return moneyFormat(v, '', data.account.currency);
            }
        }, {
            field: 'fee',
            title: '手续费',
            render: (v, data) => {
                return moneyFormat(v, '', data.account.currency);
            }
        }, {
            field: 'currency',
            title: '币池',
            render: (v, data) => {
                return data.account.currency;
            }
        }, {
            field: 'createDatetime',
            title: '到账时间',
            type: 'datetime'
        }, {
            field: 'transferNoThird',
            title: '三方交易号'
        }, {
            field: 'transferNo',
            title: '我方流水号'
        }, {
            field: 'remark',
            title: '业务说明'
        }];
        return this.props.buildList({
            fields,
            pageCode: 625023,
            rowKey: 'id'
        });
    }
}

export default TransferAccountsQuery;
