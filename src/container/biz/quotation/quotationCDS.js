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
import {dateTimeFormat, getCoinList} from 'common/js/util';

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
  componentDidMount() {
    let pHtml = document.createElement('p');
    pHtml.innerHTML = '行情更新间隔时间为10s';
    pHtml.style.margin = '0';
    let dHtml = document.querySelector('.tools-wrapper');
    dHtml.insertBefore(pHtml, dHtml.childNodes[0]);
  }
  render() {
    const fields = [{
      title: '币种',
      field: 'symbol',
      type: 'select',
      data: getCoinList(),
      keyName: 'key',
      valueName: 'value',
      search: true
    }, {
      title: '类型',
      field: 'type',
      type: 'select',
      data: [
        {
          key: '0',
          value: '买入'
        },
        {
          key: '1',
          value: '卖出'
        }
      ],
      keyName: 'key',
      valueName: 'value',
      search: true
    }, {
      title: '计价币种',
      field: 'CNY',
      render() {
        return 'CNY';
      }
    }, {
      title: '最新价',
      field: 'price'
    }, {
      title: '创建时间',
      field: 'createDatetime',
      type: 'date'
    }, {
      title: '更新时间',
      field: 'updateDatetime',
      type: 'datetime'
    }];
    return this.props.buildList({
      fields,
      rowKey: 'id',
      pageCode: '650202'
    });
  }
}

export default quotationCDS;
