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
import {moneyFormat, getCoinList, dateTimeFormat, showWarnMsg} from 'common/js/util';

let setSymbol = 'BTC';

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
  componentDidMount() {
    let clearParams = document.getElementById('clearParams');
    let symInputList = document.querySelectorAll('.ant-select-search__field');
    let symPloList = document.querySelectorAll('.ant-select-selection__placeholder');
    setTimeout(() => {
      symInputList.forEach((item, index) => {
        if(item.id === 'symbol') {
          item.value = 'BTC';
          console.log(item);
          symPloList[index].style.display = 'none';
        }
      });
    }, 100);
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
            render(v, data) {
              return moneyFormat(v, '', data.symbol);
            }
        }];
        return this.props.buildList({
            fields,
            rowKey: 'id',
            pageCode: '802505',
            searchParams: {
                symbol: setSymbol
            }
        });
    }
}

export default BTCDiviAddress;
