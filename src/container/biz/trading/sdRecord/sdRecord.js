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
} from '@redux/trading/sdRecord/sdRecord';
import {listWrapper} from 'common/js/build-list';
import { showWarnMsg, moneyFormat } from 'common/js/util';

@listWrapper(
  state => ({
    ...state.tradingSdRecord,
    parentCode: state.menu.subMenuCode
  }),
  {
    setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class SdRecord extends React.Component {
  render() {
    const fields = [{
        field: 'nickname',
        title: '昵称',
        render(v, d) {
          return d.userInfo ? `${d.userInfo.nickname}${'-' + d.userInfo.loginName}` : '-';
        }
    }, {
      field: 'userId',
      title: '兑换用户',
      type: 'select',
      pageCode: '805120',
      keyName: 'userId',
      valueName: '{{nickname.DATA}}-{{mobile.DATA}}',
      searchName: 'keyword',
      search: true,
      render: (v, data) => {
          if (data.refereeUser) {
              let tmpl = data.refereeUser.mobile ? data.refereeUser.mobile : data.refereeUser.email;
              if (data.refereeUser.kind === 'Q') {
                  let name = data.refereeUser.realName ? data.refereeUser.realName : data.refereeUser.nickname;
                  return name + '(' + tmpl + ')';
              }
              return data.refereeUser.nickname + '(' + tmpl + ')';
          }
          return '';
      },
      noVisible: true
  }, {
      field: 'symbolIn',
      title: '兑入币种',
      search: true
    }, {
      field: 'symbolOut',
      title: '兑出币种',
      search: true
    }, {
      field: 'countOutTotal',
      title: '总兑出数量',
      render: function (v, data) {
        return moneyFormat(v.toString(), '', data.symbolOut);
      }
    }, {
      field: 'countOut',
      title: '实际兑出数量',
      render: function (v, data) {
        return moneyFormat(v.toString(), '', data.symbolOut);
      }
    }, {
      field: 'countIn',
      title: '兑入数量',
      render: function (v, data) {
        return moneyFormat(v.toString(), '', data.symbolIn);
      }
    }, {
      field: 'valueCnyOut',
      title: '兑出币种行情价格'
    }, {
      field: 'valueCnyIn',
      title: '兑入币种行情价格'
    }, {
      field: 'fee',
      title: '手续费',
      render: function (v, data) {
          return moneyFormat(v.toString(), '', data.symbolOut);
      }
    }, {
      field: 'feeRate',
      title: '手续费率(%)'
    }];
    return this.props.buildList({
      fields,
      pageCode: 802930,
      btnEvent: {
        detail: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            this.props.history.push(`/trading/sdRecord/detail?code=${selectedRowKeys[0]}`);
          }
        }
      }
    });
  }
}

export default SdRecord;
