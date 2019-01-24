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
} from '@redux/BTC-finance/GJAddress/GJAddress';
import {listWrapper} from 'common/js/build-list';
import {
    moneyFormat,
    getCoinList,
    dateTimeFormat,
    showWarnMsg,
    showSucMsg
} from 'common/js/util';
import fetch from 'common/js/fetch';
let setSymbol = 'BTC';
@listWrapper(
    state => ({
        ...state.BTCFinanceGJAddress,
        parentCode: state.menu.subMenuCode
    }),
    {
        setTableData, clearSearchParam, doFetching, setBtnList,
        cancelFetching, setPagination, setSearchParam, setSearchData
    }
)
class GJAddress extends React.Component {
    componentDidMount() {
      let clearParams = document.getElementById('clearParams');
      let symInputList = document.querySelectorAll('.ant-select-search__field');
      let symPloList = document.querySelectorAll('.ant-select-selection__placeholder');
      setTimeout(() => {
        symInputList.forEach((item, index) => {
          if(item.id === 'symbol') {
            item.value = setSymbol + '-比特币';
            symPloList[index].style.display = 'none';
          }
        });
      }, 500);
      clearParams.addEventListener('click', () => {
        setSymbol = 'BTC';
      });
    }
    render() {
        const fields = [{
          field: 'symbol',
          title: '币种类型',
          type: 'select',
          pageCode: '802005',
          params: {
            status: '0'
          },
          keyName: 'symbol',
          valueName: '{{symbol.DATA}}-{{cname.DATA}}',
          searchName: 'symbol',
          render: (v) => v,
          search: true,
          onChange(v) {
            setTimeout(() => {
              let clearSpan = document.querySelector('.ant-select-selection__clear');
              clearSpan.addEventListener('click', () => {
                setSymbol = 'BTC';
              });
            }, 0);
            setSymbol = v;
          }
        }, {
            field: 'address',
            title: '地址',
            search: true
        }, {
            field: 'status',
            title: '状态',
            type: 'select',
            data: [{
                'key': '0',
                'value': '启用'
            }, {
                'key': '1',
                'value': '弃用'
            }],
            keyName: 'key',
            valueName: 'value'
        }, {
            title: '创建日期',
            field: 'createDatetime',
            type: 'datetime'
        // }, {
        //     title: '使用次数',
        //     field: 'useCount'
        }];
        return this.props.buildList({
            fields,
            rowKey: 'id',
            pageCode: '802525',
            searchParams: {
              type: 'W',
              symbol: setSymbol
            }
        });
    }
}

export default GJAddress;
