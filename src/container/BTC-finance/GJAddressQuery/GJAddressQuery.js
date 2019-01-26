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
} from '@redux/BTC-finance/GJAddressQuery/GJAddressQuery';
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
        ...state.BTCFinanceGJAddressQuery,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class GJAddressQuery extends React.Component {
    componentDidMount() {
      let clearParams = document.getElementById('clearParams');
      clearParams.addEventListener('click', () => {
        currency = '';
      });
    }
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
            field: 'amount',
            title: '交易数量',
            coin: 'BTC',
            coinAmount: true
        }, {
          field: 'fromAddress',
          title: '来方归集'
        }, {
          title: '矿工费',
          field: 'txFee',
          coin: 'BTC',
          coinAmount: true
        }, {
          field: 'confirmDatetime',
          title: '区块确认时间',
          type: 'datetime'
        }];
        return this.props.buildList({
            fields,
            pageCode: '802365',
            searchParams: {
                currency
            }
        });
    }
}

export default GJAddressQuery;
