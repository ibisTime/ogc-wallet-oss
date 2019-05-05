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
            render(v) {
              return v ? moneyFormat(v, '', 'BTC') : '-';
            }
        }, {
          field: 'fromAddress',
          title: '来方归集'
        }, {
          title: '矿工费',
          field: 'txFee',
          render(v) {
            return v ? moneyFormat(v, '', 'BTC') : '-';
          }
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
            },
            btnEvent: {
                flowQuery: (selectedRowKeys, selectedRows) => {
                    if (!selectedRowKeys.length) {
                        showWarnMsg('请选择记录');
                    } else if (selectedRowKeys.length > 1) {
                        showWarnMsg('请选择一条记录');
                    } else if (selectedRows[0].symbol === 'BTC') {
                        // 测试：https://testnet.blockexplorer.com/address/
                        // 正式：https://blockexplorer.com/address/
                        window.open('https://testnet.blockexplorer.com/address/' + selectedRows[0].address, '_bank');
                    } else if (selectedRows[0].symbol === 'USDT') {
                        window.open('https://omniexplorer.info/address/' + selectedRows[0].address, '_bank');
                    }
                }
            }
        });
    }
}

export default GJAddressQuery;
