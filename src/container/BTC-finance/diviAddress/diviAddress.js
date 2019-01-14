import React from 'react';
import {Modal} from 'antd';
import {
    setTableData,
    setPagination,
    setBtnList,
    setSearchParam,
    clearSearchParam,
    doFetching,
    cancelFetching,
    setSearchData
} from '@redux/BTC-finance/diviAddress/diviAddress';
import {listWrapper} from 'common/js/build-list';
import {
    moneyFormat,
    getCoinList,
    dateTimeFormat,
    showWarnMsg
} from 'common/js/util';

@listWrapper(
    state => ({
        ...state.BTCFinanceDiviAddress,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class BTCDiviAddress extends React.Component {
    render() {
        const fields = [{
            field: 'address',
            title: '地址',
            search: true
        }, {
            title: '拥有者',
            field: 'userId',
            render: function(v, data) {
                if (data.userInfo) {
                    return data.userInfo.nickname;
                }
            },
            type: 'select',
            pageCode: '805120',
            keyName: 'userId',
            valueName: '{{nickname.DATA}}-{{mobile.DATA}}-{{email.DATA}}',
            searchName: 'keyword',
            search: true
        }, {
            field: 'balance',
            title: '当前余额',
            coin: 'BTC',
            coinAmount: true
        }];
        return this.props.buildList({
            fields,
            rowKey: 'id',
            pageCode: '802565',
            btnEvent: {
                diviLedger: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else {
                        this.props.history.push(`/BTC-finance/diviAddress/ledger?address=${selectedRowKeys[0]}`);
                    }
                }
            }
        });
    }
}

export default BTCDiviAddress;
