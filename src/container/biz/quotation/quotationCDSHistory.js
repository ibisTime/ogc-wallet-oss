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
} from '@redux/biz/quotation/quotationCDSHistory';
import {listWrapper} from 'common/js/build-list';
import {dateTimeFormat, getCoinList, formatDate} from 'common/js/util';

@listWrapper(
  state => ({
    ...state.quotationCSDHistory,
    parentCode: state.menu.subMenuCode
  }),
  {
    setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class quotationCDS extends React.Component {
  constructor(props) {
    super(props);
    this.buttons = [];
    this.buttons = [{
      code: 'goBack',
      name: '返回',
      check: false,
      handler: () => {
        this.props.history.push(`/quotation/quotationCDS`);
      }
    }];
  }
  componentDidMount() {
    let pHtml = document.createElement('p');
    pHtml.innerHTML = '行情更新间隔时间为30s';
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
      type: 'datetime'
    }];
    return this.props.buildList({
      fields,
      rowKey: 'id',
      pageCode: '650202',
      searchParams: {
        symbolList: ['ETH', 'JEJU', 'TOS', 'TOSP'],
        endDatetime: formatDate(new Date()) + ' 00:00'
      },
      buttons: this.buttons
    });
  }
}

export default quotationCDS;
