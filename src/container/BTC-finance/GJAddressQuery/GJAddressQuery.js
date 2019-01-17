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
    constructor(props) {
        super(props);
        this.state = {
          currency: ''
        };
    }
    componentDidMount() {
      let clearParams = document.getElementById('clearParams');
      clearParams.addEventListener('click', () => {
        this.setState({
          currency: ''
        });
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
            this.setState({
              currency: v
            });
          }
        }, {
            field: 'amount',
            title: '交易数量',
            coin: 'BTC',
            coinAmount: true
        }, {
        //     field: 'fromAddress',
        //     title: '来方归集'
        // }, {
            title: '去方归集地址',
            field: 'toAddress'
        }, {
            title: '交易HASH',
            field: 'txHash'
        }, {
            field: 'status',
            title: '状态',
            type: 'select',
            key: 'collect_status',
            search: true
        }, {
            field: 'createDatetime',
            title: '归集时间',
            type: 'datetime'
        }];
        return this.props.buildList({
            fields,
            pageCode: '802365',
            searchParams: {
                currency: this.state.currency
            }
        });
    }
}

export default GJAddressQuery;
