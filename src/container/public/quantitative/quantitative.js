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
} from '@redux/public/quantitative';
import {listWrapper} from 'common/js/build-list';
import {
  showSucMsg,
  showWarnMsg
} from 'common/js/util';

@listWrapper(
  state => ({
    ...state.publicQuantitative,
    parentCode: state.menu.subMenuCode
  }),
  {
    setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class Quantitative extends React.Component {
  render() {
    const fields = [{
      field: 'remark',
      title: '说明'
    }];
    return this.props.buildList({
      fields,
      rowKey: 'id',
      pageCode: '630045',
      searchParams: {
        type: 'pop_protocol'
      }
    });
  }
}

export default Quantitative;
