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
  showWarnMsg,
  showSucMsg
} from 'common/js/util';
import fetch from 'common/js/fetch';

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
      render: (v) => v
    }, {
      field: 'address',
      title: '地址'
    }, {
      field: 'balance',
      title: '余额',
      render: (v) => moneyFormat(v, '', 'BTC')
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
        symbol: 'BTC'
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
            // 测试：https://testnet.blockexplorer.com/address/
            // 正式：https://blockexplorer.com/address/
            window.open('https://testnet.blockexplorer.com/address/' + selectedRows[0].address, '_bank');
          }
        }
      }
    });
  }
}

export default SupplyAddress;
