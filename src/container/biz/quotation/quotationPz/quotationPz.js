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
} from '@redux/biz/quotation/quotationPz';
import {listWrapper} from 'common/js/build-list';
import {dateTimeFormat} from 'common/js/util';

@listWrapper(
  state => ({
      ...state.quotationQuotationPz,
      parentCode: state.menu.subMenuCode
  }),
  {
      setTableData, clearSearchParam, doFetching, setBtnList,
      cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class QuotationPz extends React.Component {
    render() {
        const fields = [{
            title: '币种',
            field: 'symbol'
        }, {
            title: '行情调整比例',
            field: 'marketAdjust'
        }, {
            title: '是否获取第三方行情',
            field: 'marketFlag',
            data: [{
                key: '1',
                value: '是'
            }, {
                key: '0',
                value: '否'
            }],
            type: 'select',
            keyName: 'key',
            valueName: 'value'
        }, {
            title: '第三方行情来源',
            field: 'marketSource',
            key: 'market_source',
            type: 'select',
            search: true
        }];
        return this.props.buildList({
            fields,
            rowKey: 'id',
            pageCode: '802005'
        });
    }
}

export default QuotationPz;
