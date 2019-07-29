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
} from '@redux/trading/tradMessage/tradMessage';
import {listWrapper} from 'common/js/build-list';
import { showWarnMsg, moneyFormat } from 'common/js/util';
import {Modal, message} from 'antd';
import fetch from 'common/js/fetch';

const confirm = Modal.confirm;

@listWrapper(
  state => ({
    ...state.tradingTradMessage,
    parentCode: state.menu.subMenuCode
  }),
  {
    setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class TradMessage extends React.Component {
  render() {
    const fields = [{
        field: 'symbolOut',
        title: '兑出币种',
        search: true
    }, {
      field: 'symbolIn',
      title: '兑入币种',
      search: true
    }, {
      field: 'feeRate',
      title: '手续费率(%)'
    }, {
      field: 'min',
      title: '最小兑出数量(单次)',
      render: function (v, data) {
        return moneyFormat(v.toString(), '', data.symbolOut);
      }
    }, {
        field: 'max',
        title: '最大兑出数量(单次)',
        render: function (v, data) {
            if(v && +v > 0) {
                return moneyFormat(v.toString(), '', data.symbolOut);
            }else {
                return '无限制';
            }
        }
    }, {
        field: 'dailyLimit',
        title: '每日次数限制'
    }, {
      field: 'orderNo',
      title: '展示序号'
    }, {
      field: 'status',
      title: '状态',
      key: 'exchange_symbol_pair_statis',
      type: 'select',
      search: true
    }, {
      field: 'createTime',
      title: '创建时间',
      type: 'datetime'
    }];
    return this.props.buildList({
      rowKey: 'id',
      fields,
      pageCode: 802910,
      btnEvent: {
        showHide: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            let code = selectedRows[0].status === '0' ? '802902' : '802903';
            let sName = selectedRows[0].status === '0' ? '显示' : '隐藏';
              confirm({
              title: `${sName}交易对`,
              content: `是否${sName}该交易对`,
              onOk: () => {
                let hasMsg = message.loading('');
                fetch(code, {
                  id: selectedRowKeys[0]
                }).then(() => {
                  hasMsg();
                  message.success('操作成功', 1, () => {
                    this.props.getPageData();
                  });
                }, hasMsg);
              },
              okText: '确定',
              cancelText: '取消'
            });
          }
        }
      }
    });
  }
}

export default TradMessage;
