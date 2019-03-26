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
} from '@redux/accept/cancelOrder/cancelOrder';
import {listWrapper} from 'common/js/build-list';
import {
  showWarnMsg,
  moneyFormat,
  getCoinList
} from 'common/js/util';

@listWrapper(
  state => ({
    ...state.acceptCancelOrder,
    parentCode: state.menu.subMenuCode
  }),
  {
    setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class CancelOrder extends React.Component {
  render() {
    const fields = [{
      title: '下单人(手机号/邮箱)',
      field: 'userId',
      render(v, data) {
        if(data.user) {
          return data.user.loginName + `(${data.user.realName ? data.user.realName : '-'})`;
        }
        return '-';
      },
      type: 'select',
      pageCode: '805120',
      keyName: 'userId',
      valueName: '{{nickname.DATA}}-{{mobile.DATA}}-{{email.DATA}}',
      searchName: 'keyword',
      search: true
    }, {
      title: '类型',
      field: 'type',
      type: 'select',
      data: [{
        key: '0',
        value: '购买'
      }, {
        key: '1',
        value: '出售'
      }],
      keyName: 'key',
      valueName: 'value',
      search: true
    }, {
      field: 'tradeCoin',
      title: '币种',
      type: 'select',
      data: getCoinList(),
      keyName: 'key',
      valueName: 'value',
      search: true
    }, {
      title: '单价',
      field: 'tradePrice'
    }, {
      title: '数量',
      field: 'count',
      render: (v, data) => {
        return moneyFormat(v, '', data.tradeCoin);
      }
    }, {
      title: '总金额',
      field: 'tradeAmount'
    }, {
      title: '手续费',
      field: 'fee',
      render: (v, data) => {
        return moneyFormat(v, '', data.tradeCoin);
      }
    }, {
      title: '状态',
      field: 'status',
      type: 'select',
      data: [{
        key: '3',
        value: '用户取消'
      }, {
        key: '4',
        value: '平台取消'
      }, {
        key: '5',
        value: '超时'
      }],
      keyName: 'key',
      valueName: 'value',
      search: true
    }, {
      field: 'createDatetime',
      title: '下单时间',
      type: 'datetime'
    }, {
      title: '附言',
      field: 'postscript'
    }, {
      title: '备注',
      field: 'remark'
    }];
    return this.props.buildList({
      fields,
      pageCode: 625285,
      searchParams: {
        statusList: ['3', '4', '5']
      }
    });
  }
}

export default CancelOrder;
