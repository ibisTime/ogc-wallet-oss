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
          render: (v, data) => v,
          search: true
        }, {
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
            pageCode: '802505'
        });
    }
}

export default BTCDiviAddress;
