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
} from '@redux/BTC-finance/supplyAddress/supplyAddress';
import {listWrapper} from 'common/js/build-list';
import {
  moneyFormat,
  getCoinList,
  dateTimeFormat,
  getCoinType,
  showWarnMsg,
  showSucMsg
} from 'common/js/util';
import fetch from 'common/js/fetch';
let currency = 'ETH';

@listWrapper(
  state => ({
    ...state.BTCFinanceSupplyAddress,
    parentCode: state.menu.subMenuCode
  }),
  {
    setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class SupplyAddress extends React.Component {
  componentDidMount() {
    let clearParams = document.getElementById('clearParams');
    let symInputList = document.querySelectorAll('.ant-select-search__field');
    let symPloList = document.querySelectorAll('.ant-select-selection__placeholder');
      setTimeout(() => {
        symInputList.forEach((item, index) => {
          if (item.id === 'symbol') {
            item.value = currency + '-以太坊';
            symPloList[index].style.display = 'none';
          }
        });
      }, 4000);
      clearParams.addEventListener('click', () => {
        currency = 'ETH';
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
      render: (v, data) => v,
      search: true,
      onChange: (v) => {
        setTimeout(() => {
          let clearSpan = document.querySelector('.ant-select-selection__clear');
          clearSpan.addEventListener('click', () => {
            currency = 'ETH';
          });
        }, 0);
        currency = v;
      }
    }, {
      field: 'address',
      title: '地址'
    }, {
      field: 'balance',
      title: '余额',
      render: (v, data) => {
        console.log(data.symbol);
        // moneyFormat(v, '', 'BTC');
        return moneyFormat(v.toString(), '', data.symbol);
      }
    }, {
      field: 'status',
      title: '状态',
      type: 'select',
      key: 'maddress_status',
      search: true
    }, {
      title: '创建日期',
      field: 'createDatetime',
      type: 'datetime'
    }];
    return this.props.buildList({
      fields,
      rowKey: 'id',
      pageCode: '802605',
      searchParams: {
        symbol: currency
      },
      btnEvent: {
        add: (selectedRowKeys, selectedRows) => {
          let selectHtml = document.createElement('select');
          selectHtml.id = 'symSelect';
          selectHtml.style.height = '30px';
          selectHtml.style.width = '80%';
          selectHtml.style.borderRadius = '4px';
          selectHtml.style.borderColor = '#ccc';
          selectHtml.style.paddingLeft = '5px';
          selectHtml.style.backgroundColor = '#fff';
          fetch(802009).then((data) => {
            data.forEach((item, index) => {
              selectHtml.options[index] = new Option(item.symbol, item.symbol);
            });
          });
          setTimeout(() => {
            document.querySelector('.ant-modal-confirm-content').appendChild(selectHtml);
          }, 0);
          Modal.confirm({
            title: '请选择币种',
            okText: '确认',
            cancelText: '取消',
            content: '',
            onOk: () => {
              this.props.doFetching();
              let symbol = document.getElementById('symSelect').value;
              fetch(802600, {symbol}).then(() => {
                this.props.getPageData();
                showSucMsg('操作成功');
              }).catch(() => {
                this.props.cancelFetching();
              });
            }
          });
        },
        runQuery: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            let type = getCoinType(selectedRows[0].symbol);
            if(type === '1') {
                // 测试：https://testnet.blockexplorer.com/address/
                // 正式：https://btc.com/
                window.open('https://btc.com/' + selectedRows[0].address, '_bank');
            }else if(type === '4') {
                // 测试：https://shasta.tronscan.org/#/address/TVcaZYGf94J5K6WkPsfSDVUu5cWreZz1h9/token-balances
                // 正式：https://tronscan.org/#/address/TVcaZYGf94J5K6WkPsfSDVUu5cWreZz1h9/token-balances
                window.open('https://tronscan.org/#/address/' + selectedRows[0].address + '/token-balances', '_bank');
            }else if(type === '0' || type === '0T') {
                // 正式: https://rinkeby.etherscan.io/address/0x8a37b79e54d69e833d79cac3647c877ef72830e1
                // 测试: https://etherscan.io/address/0x8a37b79e54d69e833d79cac3647c877ef72830e1
                window.open('https://etherscan.io/address/' + selectedRows[0].address, '_bank');
            }else if(type === '3') {
                window.open('https://omniexplorer.info/address/' + selectedRows[0].address, '_bank');
            }
        }
        }
      }
    });
  }
}

export default SupplyAddress;
