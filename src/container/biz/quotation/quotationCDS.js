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
} from '@redux/biz/quotation/quotationCDS';
import {listWrapper} from 'common/js/build-list';
import {dateTimeFormat} from 'common/js/util';

@listWrapper(
  state => ({
    ...state.quotationQuotationCDS,
    parentCode: state.menu.subMenuCode
  }),
  {
    setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class quotationCDS extends React.Component {
  render() {
    const fields = [{
      title: '币种',
      field: 'symbol'
    }, {
      title: '计价币种',
      field: 'referCurrency'
    }, {
      title: '最新价',
      field: 'lastPrice'
    }, {
      title: '来源',
      field: 'origin'
    }, {
      title: '更新时间',
      field: 'updateDatetime',
      type: 'datetime'
    }];
    return this.props.buildList({
      fields,
      rowKey: 'id',
      pageCode: '650202',
      searchParams: {
        type: '0'
      }
    });
  }
}

export default quotationCDS;
